import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';


import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


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




  @Post('img/:id')
      @UseInterceptors(FileInterceptor('file', {}))
      public async uploadFile( @UploadedFile() file: Express.Multer.File, @Param('id') id: number){
          try {
            const filePath = await this.userService.saveInUploadsImage(file, id);
            return { message: 'File uploaded successfully', path: filePath };
          } catch (error) {
            throw new BadRequestException(error.message);
          }
        }

  
  @Post('update/:id')
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


