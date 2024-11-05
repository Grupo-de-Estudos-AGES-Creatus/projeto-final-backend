import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

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
