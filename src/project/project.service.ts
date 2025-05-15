import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProject, UpdateProject } from './dto/project.dto';

@Injectable()
export class ProjectService {
    constructor(private prisma: PrismaService) {}
    

    async getAll() {
        return this.prisma.projects.findMany();
    }

    async getOne(id: number) {
        const find = await this.prisma.projects.findUnique({
            where: {
                id: id
            }
        })

        if (!find) throw new HttpException("Não existe um projeto com esse id!", HttpStatus.NOT_FOUND)

        return this.prisma.projects.findUnique({
            where: {
                id: id
            }
        })
    }

    async create(project: CreateProject) {
        return this.prisma.projects.create({ 
            data: {
                ...project
            }    
        })
    }

    async update(id: number, project: UpdateProject) {
        
        const find = await this.prisma.projects.findUnique({
            where: {
                id: id
            }
        })

        if (!find) throw new HttpException("Não existe um projeto com esse id!", HttpStatus.NOT_FOUND)

        const update = await this.prisma.projects.update({
            where: {
                id: id
            },
            data: {
                ...project
            }
        })
        
        return update;
    }

    async delete(id: number) {

        const find = await this.prisma.projects.findUnique({
            where: {
                id: id
            }
        })

        if (!find) throw new HttpException("Não existe um projeto com esse id!", HttpStatus.NOT_FOUND)

        const remove = await this.prisma.projects.delete({
            where: {
                id: id
            }
        })

        return `Projeto deletado!`
    }


}
