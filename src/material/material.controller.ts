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
    
    // Pega um material
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return this.materialService.getOne(id);
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
