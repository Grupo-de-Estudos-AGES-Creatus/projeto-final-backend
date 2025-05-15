import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMaterial, UpdateMaterial } from './dto/material.dto';

@Injectable()
export class MaterialService {
    constructor(private prisma: PrismaService) {}
    
    // Retorna todos os materiais
    async getAll() {
        return this.prisma.material.findMany();
    }

    // Retorna um material pelo id
    async getOne(id: number) {
        // Verifica se existe
        const find = await this.prisma.material.findUnique({
            where: {
                id: id
            }
        })

        // Se não existir retorna um erro
        if (!find) throw new HttpException("Não existe um material com esse id!", HttpStatus.NOT_FOUND)

        // Retorna o material
        return this.prisma.material.findUnique({
            where: {
                id: id
            }
        })
    }

    // Cria um material
    async create(material: CreateMaterial) {
        return this.prisma.material.create({ 
            data: {
                ...material
            }    
        })
    }

    // Atualiza um material
    async update(id: number, material: UpdateMaterial) {
        // Verifica se pelo menos uma informação foi passada, se não for manda um erro
        if (!material.text && !material.title) throw new HttpException("Precisa conter pelo menos uma informção!", HttpStatus.BAD_REQUEST); 
        
        // Verifica se existe
        const find = await this.prisma.material.findUnique({
            where: {
                id: id
            }
        })

        // Se não existir retorna um erro
        if (!find) throw new HttpException("Não existe um material com esse id!", HttpStatus.NOT_FOUND)

        // Atualiza o material
        const update = await this.prisma.material.update({
            where: {
                id: id
            },
            data: {
                ...material
            }
        })
        
        // Retorna o material atualizado
        return update;
    }

    // Deleta um material
    async delete(id: number) {

        // Verifica se existe
        const find = await this.prisma.material.findUnique({
            where: {
                id: id
            }
        })

        // Se não existir retorna um erro
        if (!find) throw new HttpException("Não existe um material com esse id!", HttpStatus.NOT_FOUND)

        // Deleta o material
        const remove = await this.prisma.material.delete({
            where: {
                id: id
            }
        })

        // Retorna uma mensagem
        return `Material deletado!`
    }


}
