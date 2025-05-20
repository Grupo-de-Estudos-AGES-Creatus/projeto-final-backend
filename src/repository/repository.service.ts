import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRepository } from './dto/create-repository.dto';
import { UpdateRepository } from './dto/update-repository.dto'

@Injectable()
export class RepositoryService {
    constructor(private prisma: PrismaService) {}
    
    // Retorna todos os repositórios
    async getAll() {
        return await this.prisma.repository.findMany();
    }

    // Retorna um repositório pelo id
    async getOne(id: number) {
        // Verifica se existe
        const repository = await this.prisma.repository.findUnique({
            where: {
                id: id
            }
        })

        // Se não existir retorna um erro
        if (!repository) throw new HttpException("Não existe um repositório com esse id!", HttpStatus.NOT_FOUND)

        // Retorna o repositório
        return repository;
    }

    // Retorna os repositórios de um usuário pelo id do usuário
    async getAllByUser(userId: number) {
        // Verifica se o usuário existe
        const findUser = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        // Se o usuário não existir retorna um erro
        if (!findUser) throw new HttpException("Não existe um usuário com esse id!", HttpStatus.NOT_FOUND)

        // Retorna os repositórios do usuário
        return await this.prisma.repository.findMany({
            where: {
                userId: userId
            }
        })
    }

    async getAllBySprint(sprintId: number) {
        // Verifica se a sprint existe
        const findSprint = await this.prisma.sprint.findUnique({
            where: {
                id: sprintId
            }
        })

        // Se a sprint não existir retorna um erro
        if (!findSprint) throw new HttpException("Não existe uma sprint com esse id!", HttpStatus.NOT_FOUND)

        // Retorna os repositórios da sprint
        return await this.prisma.repository.findMany({
            where: {
                sprintId: sprintId
            }
        })
    }

    // Cria um repositório
    async create(project: CreateRepository) {
        return await this.prisma.repository.create({ 
            data: {
                ...project
            }    
        })
    }

    // Atualiza um repositório
    async update(id: number, project: UpdateRepository) {
        // Verifica se existe
        const find = await this.prisma.repository.findUnique({
            where: {
                id: id
            }
        })

        // Se não existir retorna um erro
        if (!find) throw new HttpException("Não existe um repositório com esse id!", HttpStatus.NOT_FOUND)

        // Atualiza o repositório
        const update = await this.prisma.repository.update({
            where: {
                id: id
            },
            data: {
                ...project
            }
        })
        
        // Retorna o repositório atualizado
        return update;
    }

    // Deleta um repositório
    async delete(id: number) {
        // Verifica se existe
        const find = await this.prisma.repository.findUnique({
            where: {
                id: id
            }
        })

        // Se não existir retorna um erro
        if (!find) throw new HttpException("Não existe um repositório com esse id!", HttpStatus.NOT_FOUND)

        // Deleta o repositório
        await this.prisma.repository.delete({
            where: {
                id: id
            }
        })

        // Retorna uma mensagem
        return `Repositório deletado!`
    }


}
