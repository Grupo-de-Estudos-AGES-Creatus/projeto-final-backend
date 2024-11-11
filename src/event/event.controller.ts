import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { findUpcomingDto } from './dto/find-upcoming.dto';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'NORMAL')
  @Get()
  findAll() {
    return this.eventService.findAll();
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'NORMAL')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'NORMAL')
  @Get('upcoming/now')
  findUpcomingNow() {
    return this.eventService.findUpcomingEvents(new Date(Date.now()));
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'NORMAL')
  @Get('upcoming/date/:date')
  findUpcoming(@Param('date') date: string) {
    return this.eventService.findUpcomingEvents(new Date(date));
  }


  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Patch()
  update(@Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(updateEventDto);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Delete('/upcoming/now')
  removeOldNow() {
    return this.eventService.removeOld(new Date());
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Delete('/upcoming/date/:date')
  removeOld(@Param('date') date: string) {
    return this.eventService.removeOld(new Date(date));
  }
}
