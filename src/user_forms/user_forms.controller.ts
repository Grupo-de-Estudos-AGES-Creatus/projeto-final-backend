import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserFormsService } from './user_forms.service';
import { CreateUserFormDto } from './dto/create-user_form.dto';
import { UpdateUserFormDto } from './dto/update-user_form.dto';

@Controller('user-forms')
export class UserFormsController {
  constructor(private readonly userFormsService: UserFormsService) {}

  @Post()
  create(@Body() createUserFormDto: CreateUserFormDto) {
    return this.userFormsService.create(createUserFormDto);
  }

  @Get()
  findAll() {
    return this.userFormsService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userFormsService.findOne(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserFormDto: UpdateUserFormDto) {
    return this.userFormsService.update(id, updateUserFormDto);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userFormsService.remove(email);
  }
}
