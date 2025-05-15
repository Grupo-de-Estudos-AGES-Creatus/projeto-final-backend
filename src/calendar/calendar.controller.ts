import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateEvent, UpdateEvent } from './dto/calendar.dto';

@Controller('calendar')
export class CalendarController {
    constructor(private calendarService: CalendarService) {}

    @Get()
    async getAll() {
        return this.calendarService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return this.calendarService.getOne(id);
    }
    
    @Post()
    async create(@Body() event: CreateEvent) {
        return this.calendarService.create(event);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() event: UpdateEvent) {
        return this.calendarService.update(id, event);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.calendarService.delete(id);
    }
}
