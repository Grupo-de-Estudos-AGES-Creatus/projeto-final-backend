import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
//import { UpdateSprintDto } from './dto/update-user.dto';

@Controller('sprint')
export class SprintController {
    constructor(private readonly sprintService: SprintService) {}
    
    @Post()
    create(@Body() createUserDto: CreateSprintDto) {
        return this.sprintService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.sprintService.findAll();
    }
    @Get('/:id')
    async findOne(@Param('id') id: number) {
        return await this.sprintService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateSprintDto: UpdateSprintDto) {
        return this.sprintService.update(id, updateSprintDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.sprintService.remove(id);
    }
}