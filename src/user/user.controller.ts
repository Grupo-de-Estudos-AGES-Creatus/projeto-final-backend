import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UnauthorizedException, Put, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.user.dto';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
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
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }




  //Change Password
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'NORMAL')
  @Put('changePW')
  async changePassword(@Body() changePasswordDto:ChangePasswordDto, @Req() req){
    try {
      const cookie = req.cookies.jwt;
      const data = await this.jwtService.verifyAsync(cookie);//n sei se funciona
      if(!data){
        throw new UnauthorizedException();
      }
      const user = await this.userService.findOne(data.email);
      return this.userService.changePassword(user.email,changePasswordDto.oldPassword,changePasswordDto.newPassword);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  //Forgot Password
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'NORMAL')
  @Post('forgotPW')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto){
    return this.userService.forgotPassword(forgotPasswordDto.email);
  }
}
