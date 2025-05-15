import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMaterial, UpdateMaterial } from './dto/material.dto';

@Injectable()
export class MaterialService {
    constructor(private prisma: PrismaService) {}
    

    async getAll() {
        return this.prisma.material.findMany();
    }

    async getOne(id: number) {
        const find = await this.prisma.material.findUnique({
            where: {
                id: id
            }
        })

        if (!find) throw new HttpException("Não existe um material com esse id!", HttpStatus.NOT_FOUND)

        return this.prisma.material.findUnique({
            where: {
                id: id
            }
        })
    }

    async create(material: CreateMaterial) {
        return this.prisma.material.create({ 
            data: {
                ...material
            }    
        })
    }

    async update(id: number, material: UpdateMaterial) {
        if (!material.text && !material.title) throw new HttpException("Precisa conter pelo menos uma informção!", HttpStatus.BAD_REQUEST); 
        
        const find = await this.prisma.material.findUnique({
            where: {
                id: id
            }
        })

        if (!find) throw new HttpException("Não existe um material com esse id!", HttpStatus.NOT_FOUND)

        const update = await this.prisma.material.update({
            where: {
                id: id
            },
            data: {
                ...material
            }
        })
        
        return update;
    }

    async delete(id: number) {

        const find = await this.prisma.material.findUnique({
            where: {
                id: id
            }
        })

        if (!find) throw new HttpException("Não existe um material com esse id!", HttpStatus.NOT_FOUND)

        const remove = await this.prisma.material.delete({
            where: {
                id: id
            }
        })

        return `Material deletado!`
    }


}
