import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
//import { UpdateSprintDto } from './dto/update-user.dto';

@Controller('user')
export class SprintController {
  constructor(private readonly userService: SprintService) {}
  
  @Post()
  create(@Body() createUserDto: CreateSprintDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//     return this.userService.update(id, updateUserDto);
//   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}