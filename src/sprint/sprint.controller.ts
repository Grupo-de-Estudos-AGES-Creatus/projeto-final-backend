import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, FileTypeValidator, ParseFilePipe, MaxFileSizeValidator, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('sprint')
export class SprintController {
    constructor(private readonly sprintService: SprintService) {}
    
    // Cria uma sprint
    @Post()
    create(@Body() createUserDto: CreateSprintDto) {
        return this.sprintService.create(createUserDto);
    }

    // Pega todas as sprints
    @Get()
    findAll() {
        return this.sprintService.findAll();
    }

    // Pega uma sprint pelo id
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.sprintService.findOne(id);
    }

    // Atualiza uma sprint
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateSprintDto: UpdateSprintDto) {
        return this.sprintService.update(id, updateSprintDto);
    }

    // Deleta uma sprint
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.sprintService.remove(id);
    }

    

}