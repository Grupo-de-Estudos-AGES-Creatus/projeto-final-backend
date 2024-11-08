import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @UseGuards(AuthGuard)  
  @Roles('ADMIN')
  @Post()
  async create(@Body() createContentDto: CreateContentDto) {
    try{
      const contentService = new ContentService();
      const content = await contentService.create(createContentDto);
      return content;
    }catch(error){
      throw new Error(error);
    }
  }

  @Get()
  async findAll() {
    try{
      const contentService = new ContentService();
      const content = await contentService.findAll();
      return content;
    }catch(error){
      {message: error}
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try{
      const contentService = new ContentService();
      const content = await contentService.findOne(id);
      return content;
    }catch(error){
      throw new Error(error);
    }
  }

  @UseGuards(AuthGuard)  
  @Roles('ADMIN')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    try{
      const contentService = new ContentService();
      const content = await contentService.update(id, updateContentDto);
      return content;
    }catch(error){
      throw new Error(error);
    }
  }

  @UseGuards(AuthGuard)  
  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try{
      const contentService = new ContentService();
      const content = await contentService.remove(id);
      return content;
    }catch(error){
      throw new Error(error);
    }
  }
}
