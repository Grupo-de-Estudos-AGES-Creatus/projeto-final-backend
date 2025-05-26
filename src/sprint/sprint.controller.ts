import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UploadedFile, UseInterceptors, Res} from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

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
    async getFile(@Res() res: Response, @Param('id') id: string){
        const filePath = await this.sprintService.getFile(id);
        // Envia o arquivo readme
        return res.sendFile(filePath);
    }   

    // Cria uma sprint
    @Post()
    @Roles(Role.ADMIN)
    async create(@Body() createUserDto: CreateSprintDto) {
        return await this.sprintService.create(createUserDto);
    }

    // Cria o arquivo readme da sprint
    @Post('readme/:id')
    @Roles(Role.ADMIN)
    @UseInterceptors(FileInterceptor('file', {})) 
    async uploadFile(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File){
        const filePath = await this.sprintService.newReadme(id, file);
        return filePath;
    }

    // Atualiza uma sprint
    @Patch(':id')
    @Roles(Role.ADMIN)
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateSprintDto: UpdateSprintDto) {
        return await this.sprintService.update(id, updateSprintDto);
    }

    // Atualiza o arquivo readme da sprint
    @Patch('readme/:id')
    @Roles(Role.ADMIN)
    @UseInterceptors(FileInterceptor('file', {})) 
    async uploadFileEdit(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File){
        const filePath = await this.sprintService.newReadme(id, file);
        return filePath;
    }

    // Deleta uma sprint
    @Delete(':id')
    @Roles(Role.ADMIN)
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.sprintService.remove(id);
    }
}