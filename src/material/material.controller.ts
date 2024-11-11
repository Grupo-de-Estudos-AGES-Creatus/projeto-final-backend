import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.create(createMaterialDto);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'NORMAL')
  @Get()
  findAll() {
    return this.materialService.findAll();
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'NORMAL')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialDto: UpdateMaterialDto) {
    return this.materialService.update(+id, updateMaterialDto);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialService.remove(+id);
  }
}