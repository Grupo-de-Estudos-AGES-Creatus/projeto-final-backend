import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEvent, UpdateEvent } from './dto/calendar.dto';

@Injectable()
export class CalendarService {
    constructor(private prisma: PrismaService) {}
    
    // Retorna todos os eventos do calendário
    async getAll() {
        return this.prisma.event.findMany();
    }

    // Retorna um evento pelo id
    async getOne(id: number) {
        // Verifica se existe
        const find = await this.prisma.event.findUnique({
            where: {
                id: id
            }
        })

        // Se não existir retorna um erro
        if (!find) throw new HttpException("Não existe um evento com esse id!", HttpStatus.NOT_FOUND)

        // Retorna o evento
        return this.prisma.event.findUnique({
            where: {
                id: id
            }
        })
    }

    // Cria um evento
    async create(event: CreateEvent) {
        return this.prisma.event.create({ 
            data: {
                ...event,     
            }
        })
    }

    // Atualiza um evento
    async update(id: number, event: UpdateEvent) {
        // Verifica se pelo menos uma informação foi passada, se não for manda um erro
        if (!event.title && !event.description && !event.startDate && !event.endDate) throw new HttpException("Precisa conter pelo menos uma informção!", HttpStatus.BAD_REQUEST);
        
        // Verifica se existe
        const find = await this.prisma.event.findUnique({
            where: {
                id: id
            }
        })

        // Se não existir retorna um erro
        if (!find) throw new HttpException("Não existe um evento com esse id!", HttpStatus.NOT_FOUND)

        // Atualiza o evento
        const update = await this.prisma.event.update({
            where: {
                id: id
            },
            data: {
                ...event
            }
        })
        
        // Retorna o evento atualizado
        return update;
    }

    // Deleta um evento
    async delete(id: number) {

        // Verifica se existe
        const find = await this.prisma.event.findUnique({
            where: {
                id: id
            }
        })

        // Se não existir retorna um erro
        if (!find) throw new HttpException("Não existe um evento com esse id!", HttpStatus.NOT_FOUND)

        // Deleta o evento
        const remove = await this.prisma.event.delete({
            where: {
                id: id
            }
        })

        // Retorna uma mensagem
        return `Evento deletado!`
    }


}
