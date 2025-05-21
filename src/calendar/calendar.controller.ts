import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateEvent } from './dto/calendar.dto';
import { UpdateEvent } from './dto/update-calendar.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('calendar')
export class CalendarController {
    constructor(private calendarService: CalendarService) {}

    // Pega todos os eventos do calendário
    @Get()
    @ApiOperation({ summary: 'Get all events' })
    @ApiResponse({ status: 200, description: 'List of events.' })
    @Get()
    async getAll() {
        return this.calendarService.getAll();
    }

    // Pega um evento pelo id
    @Get(':id')
    @ApiOperation({ summary: 'Get event by id' })
    @ApiResponse({ status: 200, description: 'Event found.' })
    @ApiResponse({ status: 404, description: 'Event not found.' })
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return this.calendarService.getOne(id);
    }
    
    // Criar um evento 
    @Post()
    @ApiOperation({ summary: 'Create a new event' })
    @ApiResponse({ status: 201, description: 'Event created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiBody({ type: CreateEvent })
    @Post()
    async create(@Body() event: CreateEvent) {
        return this.calendarService.create(event);
    }

    // Atualizar um evento
    @Patch(':id')
    @ApiOperation({ summary: 'Update event by id' })
    @ApiResponse({ status: 200, description: 'Event updated successfully.' })
    @ApiResponse({ status: 404, description: 'Event not found.' })
    @ApiBody({ type: UpdateEvent })
    async update(@Param('id', ParseIntPipe) id: number, @Body() event: UpdateEvent) {
        return this.calendarService.update(id, event);
    }

    // Deletar um evento
    @Delete(':id')
    @ApiOperation({ summary: 'Delete event by id' })
    @ApiResponse({ status: 200, description: 'Event deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Event not found.' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.calendarService.delete(id);
    }
}
