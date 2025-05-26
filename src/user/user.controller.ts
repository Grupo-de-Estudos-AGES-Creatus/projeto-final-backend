import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { UpdateUserSelfDto } from './dto/update-user-selft.dto';
import { CurrentUser } from 'src/auth/auth.decorators';
import { JwtPayload } from 'src/auth/auth-payload.interface';

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

  // Pega a imagem do usuário
  @Get('image/:id')
  @ApiOperation({ summary: 'Get image by user id' })
  @ApiResponse({ status: 200, description: 'Image found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getImage(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const filePath = await this.userService.getImage(id);
    return res.sendFile(filePath);
  }

  // Cria um usuário
  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  // Atualiza um usuário
  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 400, description: "Don't has any information" })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiBody({ type: UpdateUserDto })
  async update(@Param('id', ParseIntPipe ) id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  // Atualiza o próprio usuário
  @Patch('self/:id')
  @ApiOperation({ summary: 'Update self user with id' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 403, description: "Id provided isn't the one used in the token."})
  @ApiBody({ type: UpdateUserSelfDto })
  async updateSelf(@Param('id', ParseIntPipe ) id: number, @Body() updateUserSelfDto: UpdateUserSelfDto, @CurrentUser() currentUser: JwtPayload) {
    return await this.userService.updateSelf(id, updateUserSelfDto, currentUser);
  }

  // Recebe uma imagem de usuário 
  @Patch('img/:id')
  @ApiOperation({ summary: 'Update image by user id' })
  @ApiResponse({ status: 200, description: 'Image updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 403, description: "Id provided isn't the one used in the token."})
  @UseInterceptors(FileInterceptor('file', {})) 
  async updateImage(@UploadedFile() file: Express.Multer.File, @Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: JwtPayload) {
    return await this.userService.newImage(id, file, currentUser);
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


