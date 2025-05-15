import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProject, UpdateProject } from './dto/project.dto';

@Injectable()
export class ProjectService {
    constructor(private prisma: PrismaService) {}
    
    // Retorna todos os projetos
    async getAll() {
        return this.prisma.projects.findMany();
    }

    // Retorna um projeto pelo id
    async getOne(id: number) {
        // Verifica se existe
        const find = await this.prisma.projects.findUnique({
            where: {
                id: id
            }
        })

        // Se não existir retorna um erro
        if (!find) throw new HttpException("Não existe um projeto com esse id!", HttpStatus.NOT_FOUND)

        // Retorna o projeto
        return this.prisma.projects.findUnique({
            where: {
                id: id
            }
        })
    }

    // Retorna os projetos de um usuário pelo id do usuário
    async getOneByUser(userId: number) {
        // Verifica se o usuário existe
        const findUser = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        // Se o usuário não existir retorna um erro
        if (!findUser) throw new HttpException("Não existe um usuário com esse id!", HttpStatus.NOT_FOUND)

        // Retorna os projetos do usuário
        return this.prisma.projects.findMany({
            where: {
                userId: userId
            }
        })
    }

    // Cria um projeto
    async create(project: CreateProject) {
        return this.prisma.projects.create({ 
            data: {
                ...project
            }    
        })
    }

    // Atualiza um projeto
    async update(id: number, project: UpdateProject) {
        // Verifica se existe
        const find = await this.prisma.projects.findUnique({
            where: {
                id: id
            }
        })

        // Se não existir retorna um erro
        if (!find) throw new HttpException("Não existe um projeto com esse id!", HttpStatus.NOT_FOUND)

        // Atualiza o projeto
        const update = await this.prisma.projects.update({
            where: {
                id: id
            },
            data: {
                ...project
            }
        })
        
        // Retorna o projeto atualizado
        return update;
    }

    // Deleta um projeto
    async delete(id: number) {
        // Verifica se existe
        const find = await this.prisma.projects.findUnique({
            where: {
                id: id
            }
        })

        // Se não existir retorna um erro
        if (!find) throw new HttpException("Não existe um projeto com esse id!", HttpStatus.NOT_FOUND)

        // Deleta o projeto
        const remove = await this.prisma.projects.delete({
            where: {
                id: id
            }
        })

        // Retorna uma mensagem
        return `Projeto deletado!`
    }


}
