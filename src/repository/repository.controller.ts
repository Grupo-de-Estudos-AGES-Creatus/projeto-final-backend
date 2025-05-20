import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { CreateRepository } from './dto/create-repository.dto';
import { UpdateRepository } from './dto/update-repository.dto';

@Controller('repository')
export class RepositoryController {
    constructor(private repositoryService: RepositoryService) {}
    
    // Pega todos os repositórios
    @Get()
    async getAll() {
        return await this.repositoryService.getAll();
    }

    // Pega um repositório pelo id
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.repositoryService.getOne(id);
    }

    // Pega os repositórios de um usuário usando o id do usuário
    @Get('/user/:id') 
    async getAllByUser(@Param('id', ParseIntPipe) userId: number) {
        return await this.repositoryService.getAllByUser(userId);
    }

    // Pega os repositórios de uma sprint usando o id da sprint
    @Get('sprint/:id')
    async getAllBySprint(@Param('id', ParseIntPipe) sprintId: number) {
        return await this.repositoryService.getAllBySprint(sprintId);
    }
    
    // Cria um repositório
    @Post()
    async create(@Body() repository: CreateRepository) {
        return await this.repositoryService.create(repository);
    }

    // Atualiza um repositório
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() repository: UpdateRepository) {
        return await this.repositoryService.update(id, repository);
    }

    // Deleta um repositório
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.repositoryService.delete(id);
    }
}
