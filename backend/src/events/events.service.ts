import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Event, EventStatus } from './event.entity';
import { EventRegistration, RegistrationStatus } from './event-registration.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { QueryEventsDto } from './dto/query-events.dto';
import { User, UserRole } from '../users/user.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectRepository(EventRegistration)
    private readonly registrationRepo: Repository<EventRegistration>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findAll(query: QueryEventsDto): Promise<{ data: Event[]; meta: { total: number; page: number; limit: number; totalPages: number } }> {
    const cacheKey = `events:list:${JSON.stringify(query)}`;
    const cached = (await this.cacheManager.get(cacheKey)) as
      | { data: Event[]; meta: { total: number; page: number; limit: number; totalPages: number } }
      | undefined;
    if (cached) return cached;

    const {
      search, categoryId, status, eventType, city,
      startFrom, startTo, minPrice, maxPrice,
      page = 1, limit = 12, sortBy = 'startDate', sortOrder = 'ASC',
      featured,
    } = query;

    const qb = this.eventRepo
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.organizer', 'organizer')
      .leftJoinAndSelect('event.category', 'category')
      .select([
        'event', 'organizer.id', 'organizer.name', 'organizer.avatar',
        'category.id', 'category.name', 'category.icon', 'category.color',
      ]);

    if (search) {
      qb.andWhere(
        '(LOWER(event.title) LIKE :search OR LOWER(event.description) LIKE :search OR LOWER(event.city) LIKE :search)',
        { search: `%${search.toLowerCase()}%` },
      );
    }

    if (categoryId) qb.andWhere('event.category.id = :categoryId', { categoryId });
    if (status) qb.andWhere('event.status = :status', { status });
    else qb.andWhere('event.status = :status', { status: EventStatus.PUBLISHED });
    if (eventType) qb.andWhere('event.eventType = :eventType', { eventType });
    if (city) qb.andWhere('LOWER(event.city) LIKE :city', { city: `%${city.toLowerCase()}%` });
    if (startFrom) qb.andWhere('event.startDate >= :startFrom', { startFrom });
    if (startTo) qb.andWhere('event.startDate <= :startTo', { startTo });
    if (minPrice !== undefined) qb.andWhere('event.price >= :minPrice', { minPrice });
    if (maxPrice !== undefined) qb.andWhere('event.price <= :maxPrice', { maxPrice });
    if (featured === 'true') qb.andWhere('event.isFeatured = true');

    const validSortFields = ['startDate', 'createdAt', 'price', 'title'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'startDate';
    qb.orderBy(`event.${sortField}`, sortOrder === 'DESC' ? 'DESC' : 'ASC');

    const skip = (page - 1) * limit;
    qb.skip(skip).take(limit);

    const [events, total] = await qb.getManyAndCount();
    const result = {
      data: events,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };

    await this.cacheManager.set(cacheKey, result, 60 * 2); // 2 min cache
    return result;
  }

  async findOne(id: string): Promise<Event> {
    const cacheKey = `events:detail:${id}`;
    const cached = (await this.cacheManager.get(cacheKey)) as Event | undefined;
    if (cached) return cached;

    const event = await this.eventRepo.findOne({
      where: { id },
      relations: ['organizer', 'category'],
    });

    if (!event) throw new NotFoundException(`Event #${id} not found`);

    await this.cacheManager.set(cacheKey, event, 60 * 5);
    return event;
  }

  async getFeatured(): Promise<Event[]> {
    const cacheKey = 'events:featured';
    const cached = (await this.cacheManager.get(cacheKey)) as Event[] | undefined;
    if (cached) return cached;

    const events = await this.eventRepo.find({
      where: { isFeatured: true, status: EventStatus.PUBLISHED },
      relations: ['organizer', 'category'],
      order: { startDate: 'ASC' },
      take: 6,
    });

    await this.cacheManager.set(cacheKey, events, 60 * 10);
    return events;
  }

  async getUpcoming(limit = 8) {
    const now = new Date();
    const events = await this.eventRepo
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.organizer', 'organizer')
      .leftJoinAndSelect('event.category', 'category')
      .where('event.status = :status', { status: EventStatus.PUBLISHED })
      .andWhere('event.startDate > :now', { now })
      .orderBy('event.startDate', 'ASC')
      .take(limit)
      .getMany();

    return events;
  }

  async create(dto: CreateEventDto, organizer: User) {
    const event = this.eventRepo.create({
      ...dto,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      tags: dto.tags ? JSON.stringify(dto.tags) : null,
      organizer,
      category: { id: dto.categoryId } as any,
      status: EventStatus.PUBLISHED,
    });

    const saved = await this.eventRepo.save(event);
    await this.invalidateCache();
    return saved;
  }

  async update(id: string, dto: Partial<CreateEventDto>, user: User) {
    const event = await this.findOne(id);
    if (event.organizer.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You can only edit your own events');
    }

    const updates: any = { ...dto };
    if (dto.startDate) updates.startDate = new Date(dto.startDate);
    if (dto.endDate) updates.endDate = new Date(dto.endDate);
    if (dto.tags) updates.tags = JSON.stringify(dto.tags);
    if (dto.categoryId) { updates.category = { id: dto.categoryId }; delete updates.categoryId; }

    await this.eventRepo.update(id, updates);
    await this.cacheManager.del(`events:detail:${id}`);
    await this.invalidateCache();
    return this.eventRepo.findOne({ where: { id }, relations: ['organizer', 'category'] });
  }

  async delete(id: string, user: User) {
    const event = await this.findOne(id);
    if (event.organizer.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You can only delete your own events');
    }
    await this.eventRepo.delete(id);
    await this.cacheManager.del(`events:detail:${id}`);
    await this.invalidateCache();
    return { message: 'Event deleted successfully' };
  }

  async register(eventId: string, user: User) {
    const event = await this.findOne(eventId);

    if (event.maxAttendees && event.currentAttendees >= event.maxAttendees) {
      throw new BadRequestException('This event is fully booked');
    }

    const existing = await this.registrationRepo.findOne({
      where: { user: { id: user.id }, event: { id: eventId } },
    });
    if (existing) throw new BadRequestException('Already registered for this event');

    const registration = this.registrationRepo.create({
      user,
      event: { id: eventId } as any,
      status: RegistrationStatus.CONFIRMED,
    });

    await this.registrationRepo.save(registration);
    await this.eventRepo.increment({ id: eventId }, 'currentAttendees', 1);
    await this.cacheManager.del(`events:detail:${eventId}`);

    return { message: 'Successfully registered!', registration };
  }

  async unregister(eventId: string, user: User) {
    const registration = await this.registrationRepo.findOne({
      where: { user: { id: user.id }, event: { id: eventId } },
    });
    if (!registration) throw new NotFoundException('Registration not found');

    await this.registrationRepo.delete(registration.id);
    await this.eventRepo.decrement({ id: eventId }, 'currentAttendees', 1);
    await this.cacheManager.del(`events:detail:${eventId}`);

    return { message: 'Successfully unregistered' };
  }

  async getUserRegistrations(userId: string) {
    return this.registrationRepo.find({
      where: { user: { id: userId } },
      relations: ['event', 'event.category', 'event.organizer'],
      order: { registeredAt: 'DESC' },
    });
  }

  async isRegistered(eventId: string, userId: string): Promise<boolean> {
    const reg = await this.registrationRepo.findOne({
      where: { user: { id: userId }, event: { id: eventId } },
    });
    return !!reg;
  }

  private async invalidateCache() {
    // In production with Redis, use pattern-based deletion
    await this.cacheManager.del('events:featured');
  }

  async getStats() {
    const total = await this.eventRepo.count({ where: { status: EventStatus.PUBLISHED } });
    const upcoming = await this.eventRepo
      .createQueryBuilder('e')
      .where('e.startDate > :now', { now: new Date() })
      .andWhere('e.status = :status', { status: EventStatus.PUBLISHED })
      .getCount();
    return { total, upcoming };
  }
}
