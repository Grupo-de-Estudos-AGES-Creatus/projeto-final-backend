import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarEventDto } from './dto/create-calendarEvent.dto';
import { UpdateCalendarEventDto } from './dto/update-calendarEvent.dto'

@Controller('calendar')
export class CalendarController {
    constructor(private calendarService: CalendarService) {}

    // Pega todos os eventos do calendário
    @Get()
    async getAll() {
        return this.calendarService.getAll();
    }

    // Pega um evento do claendário pelo id
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return this.calendarService.getOne(id);
    }
    
    // Criar um evento do calendário
    @Post()
    async create(@Body() calendarEvent: CreateCalendarEventDto) {
        return this.calendarService.create(calendarEvent);
    }

    // Atualizar um evento do calendário
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() calendarEvent: UpdateCalendarEventDto) {
        return this.calendarService.update(id, calendarEvent);
    }

    // Deletar um evento do calendário
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.calendarService.delete(id);
    }
}
