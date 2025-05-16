import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateEvent, UpdateEvent } from './dto/calendar.dto';

@Controller('calendar')
export class CalendarController {
    constructor(private calendarService: CalendarService) {}

    // Pega todos os eventos do calendário
    @Get()
    async getAll() {
        return this.calendarService.getAll();
    }

    // Pega um evento pelo id
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return this.calendarService.getOne(id);
    }
    
    // Criar um evento 
    @Post()
    async create(@Body() event: CreateEvent) {
        return this.calendarService.create(event);
    }

    // Atualizar um evento
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() event: UpdateEvent) {
        return this.calendarService.update(id, event);
    }

    // Deletar um evento
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.calendarService.delete(id);
    }
}
