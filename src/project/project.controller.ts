import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProject, UpdateProject } from './dto/project.dto';

@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService) {}
    
    // Pega todos os projetos
    @Get()
    async getAll() {
        return this.projectService.getAll();
    }

    // Pega um projeto pelo id
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return this.projectService.getOne(id);
    }
    
    // Cria um projeto
    @Post()
    async create(@Body() project: CreateProject) {
        return this.projectService.create(project);
    }

    // Atualiza um projeto
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() project: UpdateProject) {
        return this.projectService.update(id, project);
    }

    // Deleta um projeto
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.projectService.delete(id);
    }
}
