import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarEventDto } from './dto/create-calendarEvent.dto';
import { UpdateCalendarEventDto } from './dto/update-calendarEvent.dto'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';

@Controller('calendar')
export class CalendarController {
    constructor(private calendarService: CalendarService) {}

    // Pega todos os eventos do calendário
    @Get()
    @ApiOperation({ summary: 'Get all callendar events' })
    @ApiResponse({ status: 200, description: 'List of calendar events.' })
    async getAll() {
        return await this.calendarService.getAll();
    }

    // Pega um evento do calendário pelo id
    @Get(':id')
    @ApiOperation({ summary: 'Get calendar event by id' })
    @ApiResponse({ status: 200, description: 'Calendar event found.' })
    @ApiResponse({ status: 404, description: 'Calendar event not found.' })
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.calendarService.getOne(id);
    }
    
    // Criar um evento do calendário
    @Post()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Create a new calendar event' })
    @ApiResponse({ status: 201, description: 'Calendar event created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiBody({ type: CreateCalendarEventDto })
    async create(@Body() calendarEvent: CreateCalendarEventDto) {
        return await this.calendarService.create(calendarEvent);
    }

    // Atualizar um evento do calendário
    @Patch(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Update calendar event by id' })
    @ApiResponse({ status: 200, description: 'Calendar event updated successfully.' })
    @ApiResponse({ status: 404, description: 'Calendar event not found.' })
    @ApiBody({ type: UpdateCalendarEventDto })
    async update(@Param('id', ParseIntPipe) id: number, @Body() calendarEvent: UpdateCalendarEventDto) {
        return await this.calendarService.update(id, calendarEvent);
    }

    // Deletar um evento do calendário
    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Delete calendar event by id' })
    @ApiResponse({ status: 200, description: 'Calendar event deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Calendar event not found.' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.calendarService.delete(id);
    }
}
