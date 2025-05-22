import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Pega todos os usuários
  @Get()
  findAll() {
    return this.userService.findAll();
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
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Atualiza um usuário
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseIntPipe ) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // Deleta um usuário
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe ) id: number) {
    return this.userService.remove(id);
  }
}

