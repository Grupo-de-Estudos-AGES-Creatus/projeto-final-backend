import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('sprint')
export class SprintController {
    constructor(private readonly sprintService: SprintService) {}
    
    // Cria uma sprint
    @Post()
    @ApiOperation({ summary: 'Create a sprint' })
    @ApiResponse({ status: 200, description: 'Sprint created.' })
    create(@Body() createUserDto: CreateSprintDto) {
        return this.sprintService.create(createUserDto);
    }

    // Pega todas as sprints
    @ApiOperation({ summary: 'Get all sprints' })
    @ApiResponse({ status: 200, description: 'List of sprints.' })
    @Get()
    findAll() {
        return this.sprintService.findAll();
    }

    // Pega uma sprint pelo id
    @ApiOperation({ summary: 'Get a sprint by id' })
    @ApiResponse({ status: 200, description: 'Sprint found.' })
    @ApiResponse({ status: 404, description: 'Sprint not found.' })
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.sprintService.findOne(id);
    }

    // Atualiza uma sprint
    @ApiOperation({ summary: 'Update sprint by id' })
    @ApiResponse({ status: 200, description: 'sprint updated successfully.' })
    @ApiResponse({ status: 404, description: 'sprint not found.' })
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateSprintDto: UpdateSprintDto) {
        return this.sprintService.update(id, updateSprintDto);
    }

    // Deleta uma sprint
    @ApiOperation({ summary: 'Delete sprint by id' })
    @ApiResponse({ status: 200, description: 'sprint deleted successfully.' })
    @ApiResponse({ status: 404, description: 'sprint not found.' })
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.sprintService.remove(id);
    }
}