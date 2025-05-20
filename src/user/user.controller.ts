import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Pega todos os usuários
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  // Pega um usuário pelo id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe ) id: number) {
    return await this.userService.findOne(id);
  }

  // Pega todos os usuário do semestre
  @Get('semester/:semester')
  async findBySemester(@Param('semester') semester: string) {
    return await this.userService.findBySemester(semester)
  }

  // Cria um usuário
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  // Atualiza um usuário
  @Patch(':id')
  async update(@Param('id', ParseIntPipe ) id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  // Deleta um usuário
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe ) id: number) {
    return await this.userService.remove(id);
  }
}

