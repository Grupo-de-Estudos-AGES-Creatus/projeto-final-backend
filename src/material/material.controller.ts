import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterial } from './dto/create-material.dto';
import { UpdateMaterial } from './dto/update-material.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { CurrentUser } from 'src/auth/auth.decorators';
import { JwtPayload } from 'src/auth/auth-payload.interface';

@Controller('material')
export class MaterialController {
    constructor(private materialService: MaterialService) {}
        
    // Pega todos os materiais
    @Get()
    @ApiOperation({ summary: 'Get all materials' })
    @ApiResponse({ status: 200, description: 'List of materials.' })
    async getAll() {
        return await this.materialService.getAll();
    }
    
    // Pega um material pelo id
    @Get(':id')
    @ApiOperation({ summary: 'Get material by id' })
    @ApiResponse({ status: 200, description: 'Material found.' })
    @ApiResponse({ status: 404, description: 'Material not found.' })
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.materialService.getOne(id);
    }

    // Pega os materiais de uma sprint usando o id da sprint
    @Get('/sprint/:id')
    @ApiOperation({ summary: 'Get all materials of the sprint by id' })
    @ApiResponse({ status: 200, description: 'Sprint found.' })
    @ApiResponse({ status: 404, description: 'Sprint not found.' })
    async getOneBySprint(@Param('id', ParseIntPipe) sprintId: number) {
        return await this.materialService.getOneBySprint(sprintId);
    }
    
    // Cria um material
    @Post()
    @ApiOperation({ summary: 'Create a new material' })
    @ApiResponse({ status: 201, description: 'Material created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiBody({ type: CreateMaterial })
    async create(@Body() material: CreateMaterial) {
        return await this.materialService.create(material);
    }

    // Atualiza um material
    @Patch(':id')
    @ApiOperation({ summary: 'Update material by id' })
    @ApiResponse({ status: 200, description: 'Material updated successfully.' })
    @ApiResponse({ status: 400, description: 'Require at leats one information.' })
    @ApiResponse({ status: 404, description: 'Material not found.' })
    @ApiResponse({ status: 403, description: "UserId in the material isn't the one used in the token."})
    @ApiBody({ type: UpdateMaterial })
    async update(@Param('id', ParseIntPipe) id: number, @Body() material: UpdateMaterial, @CurrentUser() currentUser: JwtPayload) {
        return await this.materialService.update(id, material, currentUser);
    }

    // Deleta um material
    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Delete material by id' })
    @ApiResponse({ status: 200, description: 'Material deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Material not found.' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.materialService.delete(id);
    }
}
