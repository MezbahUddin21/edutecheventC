import {
  Controller, Get, Post, Put, Delete, Body, Param, Query,
  UseGuards, Request, HttpCode, HttpStatus,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { QueryEventsDto } from './dto/query-events.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OptionalJwtGuard } from '../auth/guards/optional-jwt.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(@Query() query: QueryEventsDto) {
    return this.eventsService.findAll(query);
  }

  @Get('featured')
  getFeatured() {
    return this.eventsService.getFeatured();
  }

  @Get('upcoming')
  getUpcoming(@Query('limit') limit?: string) {
    return this.eventsService.getUpcoming(limit ? parseInt(limit) : 8);
  }

  @Get('stats')
  getStats() {
    return this.eventsService.getStats();
  }

  @Get(':id')
  @UseGuards(OptionalJwtGuard)
  async findOne(@Param('id') id: string, @Request() req: any) {
    const event = await this.eventsService.findOne(id);
    let isRegistered = false;
    if (req.user) {
      isRegistered = await this.eventsService.isRegistered(id, req.user.id);
    }
    return Object.assign({}, event, { isRegistered });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateEventDto, @Request() req: any) {
    return this.eventsService.create(dto, req.user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: Partial<CreateEventDto>, @Request() req: any) {
    return this.eventsService.update(id, dto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string, @Request() req: any) {
    return this.eventsService.delete(id, req.user);
  }

  @Post(':id/register')
  @UseGuards(JwtAuthGuard)
  register(@Param('id') id: string, @Request() req: any) {
    return this.eventsService.register(id, req.user);
  }

  @Delete(':id/register')
  @UseGuards(JwtAuthGuard)
  unregister(@Param('id') id: string, @Request() req: any) {
    return this.eventsService.unregister(id, req.user);
  }
}
