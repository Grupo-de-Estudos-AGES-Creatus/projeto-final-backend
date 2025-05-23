import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
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

  
  @Post('img/:id')
      @UseInterceptors(FileInterceptor('file', {}))
      public async updateImage(@UploadedFile() file: Express.Multer.File, @Param('id', ParseIntPipe) id: number, ) {
        try {
          //se já existir uma imagem deleta ela
          const oldImage = await this.userService.findImage(id);
          
          if (oldImage) {
            await this.userService.deleteImage(id);
          }

          await this.userService.saveInUploadsImage(file, id)
          await this.userService.saveImagePath(id, file);

        } catch (error) {
          console.log(error.message)
          throw new HttpException('Failed to update image', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    
      
}


