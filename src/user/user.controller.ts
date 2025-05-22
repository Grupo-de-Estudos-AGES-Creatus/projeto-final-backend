import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Pega todos os usuários
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users.' })
  async findAll() {
    return await this.userService.findAll();
  }

  // Pega um usuário pelo id
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'User found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id', ParseIntPipe ) id: number) {
    return await this.userService.findOne(id);
  }

  // Pega todos os usuário do semestre
  @Get('semester/:semester')
  @ApiOperation({ summary: 'Get all users by semester' })
  @ApiResponse({ status: 200, description: 'Users found.' })
  @ApiResponse({ status: 404, description: 'Users not found.' })
  async findBySemester(@Param('semester') semester: string) {
    return await this.userService.findBySemester(semester)
  }

  // Cria um usuário
  @Post()
  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  // Atualiza um usuário
  @Patch(':id')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiBody({ type: UpdateUserDto })
  @Roles(Role.ADMIN)
  async update(@Param('id', ParseIntPipe ) id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  // Deleta um usuário
  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async remove(@Param('id', ParseIntPipe ) id: number) {
    return await this.userService.remove(id);
  }
}

