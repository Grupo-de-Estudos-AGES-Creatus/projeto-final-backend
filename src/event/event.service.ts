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

  async update(updateEventDto: UpdateEventDto) {
    const updateData: any = { ...updateEventDto };

    if (updateEventDto.start_date) {
      updateData.start_date = new Date(updateEventDto.start_date).toISOString();
    }
    if (updateEventDto.end_date) {
      updateData.end_date = new Date(updateEventDto.end_date).toISOString();
    }

    if (updateData.start_date > updateData.end_date) {
      return "start date can't be bigger than end date";
    }

    const upd = await this.prisma.event.update({ data: updateData, where: { id: updateEventDto.id } })
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
