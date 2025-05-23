import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UploadedFile, UseInterceptors, Res} from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReadmeCreateOrEdit } from './sprint.interceptor';
import { Response } from 'express';

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

    // Pega o arquivo readme de uma sprint pelo id
    @Get('readme/:id')
    async getFile(@Param('id') id: string){
      return this.sprintService.getFile(id)
    }   

    // Cria uma sprint
    @Post()
    @Roles(Role.ADMIN)
    async create(@Body() createUserDto: CreateSprintDto) {
        return await this.sprintService.create(createUserDto);
    }

    // Verficar para colocar no service
    @Post('readme/:id')
    @UseInterceptors(ReadmeCreateOrEdit)
    async uploadFile(@UploadedFile() file: Express.Multer.File){
      return file;
    }

    // Atualiza uma sprint
    @Patch(':id')
    @Roles(Role.ADMIN)
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateSprintDto: UpdateSprintDto) {
        return await this.sprintService.update(id, updateSprintDto);
    }

    // Deleta uma sprint
    @Delete(':id')
    @Roles(Role.ADMIN)
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.sprintService.remove(id);
    }
}