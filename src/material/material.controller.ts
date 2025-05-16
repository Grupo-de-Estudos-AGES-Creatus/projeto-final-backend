import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterial, UpdateMaterial } from './dto/material.dto';

@Controller('material')
export class MaterialController {
    constructor(private materialService: MaterialService) {}
        
    // Pega todos os materiais
    @Get()
    async getAll() {
        return this.materialService.getAll();
    }
    
    // Pega um material pelo id
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return this.materialService.getOne(id);
    }

    // Pega os materiais de uma sprint usando o id da sprint
    @Get('/sprint/:id')
    async getOneBySprint(@Param('id', ParseIntPipe) sprintId: number) {
        return this.materialService.getOneBySprint(sprintId);
    }
    
    // Cria um material
    @Post()
    async create(@Body() material: CreateMaterial) {
        return this.materialService.create(material);
    }

    // Atualiza um material
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() material: UpdateMaterial) {
        return this.materialService.update(id, material);
    }

    // Deleta um material
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.materialService.delete(id);
    }
}
