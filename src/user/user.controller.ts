import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { verify } from 'crypto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users.' })
  findAll() {
    return this.userService.findAll();
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'User found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id', ParseIntPipe ) id: number) {
    return await this.userService.findOne(id);
  }

  @Get('verify')
  @ApiOperation({ summary: 'Verify user credentials' })
  @ApiResponse({ status: 200, description: 'Verification result.' })
  async findAndVerify(@Body() verifyUserDto: VerifyUserDto) {
    const result = await this.userService.findAndVerify(verifyUserDto.email, verifyUserDto.password);
    return result; 
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiBody({ type: UpdateUserDto })
  @Patch(':id')
  update(@Param('id', ParseIntPipe ) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  remove(@Param('id', ParseIntPipe ) id: number) {
    return this.userService.remove(id);
  }
}

