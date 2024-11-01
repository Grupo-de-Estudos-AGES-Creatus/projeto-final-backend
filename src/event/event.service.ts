import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'prisma/prisma.service';
import { findUpcomingDto } from './dto/find-upcoming.dto';
import { Event } from './entities/event.entity';
import e from 'express';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createEventDto: CreateEventDto) {
    if (createEventDto.end_date < createEventDto.start_date) {
      return "Event end date is smaller than start date";
    }
    return this.prisma.event.create({ data: createEventDto });
  }

  async findAll() {
    return this.prisma.event.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  async findUpcomingEvents(date?: Date) {
    const curTime: Date = date ? date : new Date();
    return await this.prisma.event.findMany({ where: { end_date: { gte: curTime.toISOString() } } })
    /* const events: Event[] = await this.prisma.event.findMany({});
    const filtered: Event[] = events.filter((value: Event) => value.end_date >= curTime);
    return filtered; */
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const upd = await this.prisma.event.update({ data: updateEventDto, where: { id: id } })
    return upd;
  }

  async remove(id: number) {
    if (await this.prisma.event.delete({ where: { id: id } }))
      return true;
    else
      return false;
  }

  async removeOld(date: Date) {
    const curTime: Date = date ? date : new Date();
    if (await this.prisma.event.deleteMany({ where: { end_date: { lt: curTime.toISOString() } } })) {
      return true
    }
    return false
  }
}
