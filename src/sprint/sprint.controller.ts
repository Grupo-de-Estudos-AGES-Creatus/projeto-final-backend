import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UploadedFile, UseInterceptors, Res} from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('sprint')
export class SprintController {
    constructor(private readonly sprintService: SprintService) {}

    // Pega todas as sprints
    @Get()
    @ApiOperation({ summary: 'Get all sprints' })
    @ApiResponse({ status: 200, description: 'List of the sprints' })
    async findAll() {
        return await this.sprintService.findAll();
    }

    // Pega uma sprint pelo id
    @Get(':id')
    @ApiOperation({ summary: 'Get sprint by id' })
    @ApiResponse({ status: 200, description: 'Sprint found' })
    @ApiResponse({ status: 403, description: 'Sprint not found' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.sprintService.findOne(id);
    }

    // Pega o arquivo readme de uma sprint pelo id
    @Get('readme/:id')
    @ApiOperation({ summary: 'Get readme by sprint id' })
    @ApiResponse({ status: 200, description: 'Readme found' })
    @ApiResponse({ status: 403, description: 'Readme not found' })
    async getFile(@Res() res: Response, @Param('id') id: string){
        const filePath = await this.sprintService.getFile(id);
        // Envia o arquivo readme
        return res.sendFile(filePath);
    }   

    // Cria uma sprint
    @Post()
    @ApiOperation({ summary: 'Create a new sprint' })
    @ApiResponse({ status: 201, description: 'Sprint created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiBody({ type: CreateSprintDto })
    @Roles(Role.ADMIN)
    async create(@Body() createUserDto: CreateSprintDto) {
        return await this.sprintService.create(createUserDto);
    }

    // Cria o arquivo readme da sprint
    @Post('readme/:id')
    @ApiOperation({ summary: 'Create a new readme by sprint id' })
    @ApiResponse({ status: 201, description: 'Readme created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @Roles(Role.ADMIN)
    @UseInterceptors(FileInterceptor('file', {})) 
    async uploadFile(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File){
        const filePath = await this.sprintService.newReadme(id, file);
        return filePath;
    }

    // Atualiza uma sprint
    @Patch(':id')
    @ApiOperation({ summary: 'Update sprint by id' })
    @ApiResponse({ status: 200, description: 'Sprint updated successfully.' })
    @ApiResponse({ status: 404, description: 'Sprint not found.' })
    @ApiBody({ type: UpdateSprintDto })
    @Roles(Role.ADMIN)
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateSprintDto: UpdateSprintDto) {
        return await this.sprintService.update(id, updateSprintDto);
    }

    // Atualiza o arquivo readme da sprint
    @Patch('readme/:id')
    @ApiOperation({ summary: 'Update readme by sprint id' })
    @ApiResponse({ status: 200, description: 'Readme updated successfully.' })
    @ApiResponse({ status: 404, description: 'Sprint not found.' })
    @ApiResponse({ status: 400, description: 'Bad resquest.' })
    @ApiBody({ type: UpdateSprintDto })
    @Roles(Role.ADMIN)
    @UseInterceptors(FileInterceptor('file', {})) 
    async uploadFileEdit(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File){
        const filePath = await this.sprintService.newReadme(id, file);
        return filePath;
    }

    // Deleta uma sprint
    @Delete(':id')
    @ApiOperation({ summary: 'Delete sprint by id' })
    @ApiResponse({ status: 200, description: 'Sprint deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Sprint not found.' })
    @Roles(Role.ADMIN)
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.sprintService.remove(id);
    }
}