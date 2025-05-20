import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCalendarEventDto } from './dto/create-calendarEvent.dto';
import { UpdateCalendarEventDto } from './dto/update-calendarEvent.dto';

@Injectable()
export class CalendarService {
    constructor(private prisma: PrismaService) {}
    
    // Retorna todos os eventos do calendário
    async getAll() {
        return await this.prisma.calendarEvents.findMany();
    }

    // Retorna um evento do calendário pelo id
    async getOne(id: number) {
        // Verifica se existe
        const event = await this.prisma.calendarEvents.findUnique({
            where: {
                id: id
            }
        })

        // Se não existir retorna um erro
        if (!event) throw new HttpException("Não existe um evento com esse id!", HttpStatus.NOT_FOUND)

        // Retorna o evento do calendário
        return event;
    }

    // Cria um evento do calendário
    async create(event: CreateCalendarEventDto) {
        return await this.prisma.calendarEvents.create({ 
            data: {
                ...event,     
            }
        })
    }

    // Atualiza um evento do calendário
    async update(id: number, event: UpdateCalendarEventDto) {
        // Verifica se pelo menos uma informação foi passada, se não for retorna um erro
        if (!event.title && !event.description && !event.startDate && !event.endDate) throw new HttpException("Precisa conter pelo menos uma informção!", HttpStatus.BAD_REQUEST);
        
        // Verifica se existe
        const find = await this.prisma.calendarEvents.findUnique({
            where: {
                id: id
            }
        })

        // Se não existir retorna um erro
        if (!find) throw new HttpException("Não existe um evento com esse id!", HttpStatus.NOT_FOUND)

        // Atualiza o evento do calentário
        const update = await this.prisma.calendarEvents.update({
            where: {
                id: id
            },
            data: {
                ...event
            }
        })
        
        // Retorna o evento do calendário atualizado
        return update;
    }

    // Deleta um evento do calendário
    async delete(id: number) {

        // Verifica se existe
        const find = await this.prisma.calendarEvents.findUnique({
            where: {
                id: id
            }
        })

        // Se não existir retorna um erro
        if (!find) throw new HttpException("Não existe um evento com esse id!", HttpStatus.NOT_FOUND)

        // Deleta o evento do calendário
        await this.prisma.calendarEvents.delete({
            where: {
                id: id
            }
        })

        // Retorna uma mensagem
        return `Evento do calendário deletado!`
    }


}
