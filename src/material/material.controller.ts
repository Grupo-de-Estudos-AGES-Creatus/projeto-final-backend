import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterial } from './dto/create-material.dto';
import { UpdateMaterial } from './dto/update-material.dto';

@Controller('material')
export class MaterialController {
    constructor(private materialService: MaterialService) {}
        
    // Pega todos os materiais
    @Get()
    async getAll() {
        return await this.materialService.getAll();
    }
    
    // Pega um material pelo id
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.materialService.getOne(id);
    }

    // Pega os materiais de uma sprint usando o id da sprint
    @Get('/sprint/:id')
    async getOneBySprint(@Param('id', ParseIntPipe) sprintId: number) {
        return await this.materialService.getOneBySprint(sprintId);
    }
    
    // Cria um material
    @Post()
    async create(@Body() material: CreateMaterial) {
        return await this.materialService.create(material);
    }

    // Atualiza um material
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() material: UpdateMaterial) {
        return await this.materialService.update(id, material);
    }

    // Deleta um material
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.materialService.delete(id);
    }
}
