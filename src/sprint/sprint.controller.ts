import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';

@Controller('sprint')
export class SprintController {
    constructor(private readonly sprintService: SprintService) {}

    // Pega todas as sprints
    @Get()
    async findAll() {
        return await this.sprintService.findAll();
    }

    // Pega uma sprint pelo id
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.sprintService.findOne(id);
    }

    // Cria uma sprint
    @Post()
    async create(@Body() createUserDto: CreateSprintDto) {
        return await this.sprintService.create(createUserDto);
    }

    // Atualiza uma sprint
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateSprintDto: UpdateSprintDto) {
        return await this.sprintService.update(id, updateSprintDto);
    }

    // Deleta uma sprint
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.sprintService.remove(id);
    }
}