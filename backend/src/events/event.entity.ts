import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { EventRegistration } from './event-registration.entity';

export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export enum EventType {
  IN_PERSON = 'in_person',
  ONLINE = 'online',
  HYBRID = 'hybrid',
}

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  shortDescription: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column({ type: 'enum', enum: EventStatus, default: EventStatus.DRAFT })
  @Index()
  status: EventStatus;

  @Column({ type: 'enum', enum: EventType, default: EventType.IN_PERSON })
  eventType: EventType;

  @Column({ type: 'timestamptz' })
  @Index()
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @Column({ nullable: true })
  venue: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  country: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column({ nullable: true })
  onlineUrl: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ nullable: true })
  maxAttendees: number;

  @Column({ default: 0 })
  currentAttendees: number;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ nullable: true })
  tags: string; // JSON string array

  @ManyToOne(() => User, (user) => user.organizedEvents, { eager: true })
  @JoinColumn({ name: 'organizer_id' })
  organizer: User;

  @ManyToOne(() => Category, (category) => category.events, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => EventRegistration, (reg) => reg.event)
  registrations: EventRegistration[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
