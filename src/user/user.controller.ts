import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UnauthorizedException, Put } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.user.dto';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) { }
  
//Login e logout
  @Post('login')
  async login(
    @Body() verifyUserDto: VerifyUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.userService.findAndVerify(verifyUserDto.email, verifyUserDto.password);
    if (!user) {
      response.status(400).json({
        message: "error",
      });
      return;
    }
    let jwt = await this.jwtService.signAsync({ email: user.email });
    response.cookie('jwt', jwt, { httpOnly: true });


    return {
      "message": "success",
    };
  }
  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies.jwt;
      const data = await this.jwtService.verifyAsync(cookie);
      if(!data){
        throw new UnauthorizedException();
      }
      const user = await this.userService.findOne(data.email);
      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: "success",
    };
  }




//CRUD basico
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }




  //Change Password
  @Put('changePW')
  async changePassword(@Body() changePasswordDto:ChangePasswordDto, @Req() req){
    return this.userService.changePassword(req.email,changePasswordDto.oldPassword,changePasswordDto.newPassword);
  }
  //Forgot Password
  @Post('forgotPW')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto){
    return this.userService.forgotPassword(forgotPasswordDto.email);
  }
}
