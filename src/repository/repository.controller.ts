import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { CreateRepository } from './dto/create-repository.dto';
import { UpdateRepository } from './dto/update-repository.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('repository')
export class RepositoryController {
    constructor(private repositoryService: RepositoryService) {}
    
    // Pega todos os repositórios
    @Get()
    @ApiOperation({ summary: 'Get all repositories' })
    @ApiResponse({ status: 200, description: 'List of repositories.' })
    async getAll() {
        return await this.repositoryService.getAll();
    }

    // Pega um repositório pelo id
    @Get(':id')
    @ApiOperation({ summary: 'Get Repository by id' })
    @ApiResponse({ status: 200, description: 'Repository found.' })
    @ApiResponse({ status: 404, description: 'Repository not found.' })
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.repositoryService.getOne(id);
    }

    // Pega os repositórios de um usuário usando o id do usuário
    @Get('/user/:id')
    @ApiOperation({ summary: 'Get all repository by user id' })
    @ApiResponse({ status: 200, description: 'Repositories found.' })
    @ApiResponse({ status: 404, description: 'Repositories not found.' }) 
    async getAllByUser(@Param('id', ParseIntPipe) userId: number) {
        return await this.repositoryService.getAllByUser(userId);
    }

    // Pega os repositórios de uma sprint usando o id da sprint
    @Get('sprint/:id')
    @ApiOperation({ summary: 'Get all repository by sprint id' })
    @ApiResponse({ status: 200, description: 'Repositories found.' })
    @ApiResponse({ status: 404, description: 'Repositories not found.' }) 
    async getAllBySprint(@Param('id', ParseIntPipe) sprintId: number) {
        return await this.repositoryService.getAllBySprint(sprintId);
    }
    
    // Cria um repositório
    @Post()
    @ApiOperation({ summary: 'Create a new repository' })
    @ApiResponse({ status: 201, description: 'Repository created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiBody({ type: CreateRepository })
    async create(@Body() repository: CreateRepository) {
        return await this.repositoryService.create(repository);
    }

    // Atualiza um repositório
    @Patch(':id')
    @ApiOperation({ summary: 'Update Repository by id' })
    @ApiResponse({ status: 200, description: 'Repository updated successfully.' })
    @ApiResponse({ status: 404, description: 'Repository not found.' })
    @ApiBody({ type: UpdateRepository })
    async update(@Param('id', ParseIntPipe) id: number, @Body() repository: UpdateRepository) {
        return await this.repositoryService.update(id, repository);
    }

    // Deleta um repositório
    @Delete(':id')
    @ApiOperation({ summary: 'Delete Repository by id' })
    @ApiResponse({ status: 200, description: 'Repository deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Repository not found.' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.repositoryService.delete(id);
    }
}
