import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEvent, UpdateEvent } from './dto/calendar.dto';

@Injectable()
export class CalendarService {
    constructor(private prisma: PrismaService) {}
    

    async getAll() {
        return this.prisma.event.findMany();
    }

    async getOne(id: number) {
        return this.prisma.event.findUnique({
            where: {
                id: id
            }
        })
    }

    async create(event: CreateEvent) {
        return this.prisma.event.create({ 
            data: {
                ...event
            }
        })
    }

    async update(id: number, event: UpdateEvent) {
        if (!event.title && !event.description && !event.startDate && !event.endDate) throw new HttpException("Precisa conter pelo menos uma informção!", HttpStatus.BAD_REQUEST)
        
        const find = await this.prisma.event.findUnique({
            where: {
                id: id
            }
        })

        if (!find) throw new HttpException("Não existe um evento com esse id!", HttpStatus.NOT_FOUND)

        const update = await this.prisma.event.update({
            where: {
                id: id
            },
            data: {
                ...event
            }
        })
        
        return update;
    }

    async delete(id: number) {

        const find = await this.prisma.event.findUnique({
            where: {
                id: id
            }
        })

        if (!find) throw new HttpException("Não existe um evento com esse id!", HttpStatus.NOT_FOUND)

        const remove = await this.prisma.event.delete({
            where: {
                id: id
            }
        })

        return `Evento deletado!`
    }


}
