import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarEventDto } from './dto/create-calendarEvent.dto';
import { UpdateCalendarEventDto } from './dto/update-calendarEvent.dto'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('calendar')
export class CalendarController {
    constructor(private calendarService: CalendarService) {}

    // Pega todos os eventos do calendário
    @Get()
    @ApiOperation({ summary: 'Get all events' })
    @ApiResponse({ status: 200, description: 'List of events.' })
    async getAll() {
        return await this.calendarService.getAll();
    }

    // Pega um evento do claendário pelo id
    @Get(':id')
    @ApiOperation({ summary: 'Get event by id' })
    @ApiResponse({ status: 200, description: 'Event found.' })
    @ApiResponse({ status: 404, description: 'Event not found.' })
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.calendarService.getOne(id);
    }
    
    // Criar um evento do calendário
    @Post()
    @ApiOperation({ summary: 'Create a new event' })
    @ApiResponse({ status: 201, description: 'Event created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiBody({ type: CreateCalendarEventDto })
    async create(@Body() calendarEvent: CreateCalendarEventDto) {
        return await this.calendarService.create(calendarEvent);
    }

    // Atualizar um evento do calendário
    @Patch(':id')
    @ApiOperation({ summary: 'Update event by id' })
    @ApiResponse({ status: 200, description: 'Event updated successfully.' })
    @ApiResponse({ status: 404, description: 'Event not found.' })
    @ApiBody({ type: UpdateCalendarEventDto })
    async update(@Param('id', ParseIntPipe) id: number, @Body() calendarEvent: UpdateCalendarEventDto) {
        return await this.calendarService.update(id, calendarEvent);
    }

    // Deletar um evento do calendário
    @Delete(':id')
    @ApiOperation({ summary: 'Delete event by id' })
    @ApiResponse({ status: 200, description: 'Event deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Event not found.' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.calendarService.delete(id);
    }
}
