import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProject, UpdateProject } from './dto/project.dto';

@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService) {}
    
        @Get()
        async getAll() {
            return this.projectService.getAll();
        }
    
        @Get(':id')
        async getOne(@Param('id', ParseIntPipe) id: number) {
            return this.projectService.getOne(id);
        }
        
        @Post()
        async create(@Body() project: CreateProject) {
            return this.projectService.create(project);
        }
    
        @Patch(':id')
        async update(@Param('id', ParseIntPipe) id: number, @Body() event: UpdateProject) {
            return this.projectService.update(id, event);
        }
    
        @Delete(':id')
        async delete(@Param('id', ParseIntPipe) id: number) {
            return this.projectService.delete(id);
        }
}
