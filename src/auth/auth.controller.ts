
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    Res,
    UseGuards
  } from '@nestjs/common';
  import { Response } from 'express';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: Record<string, any>,@Res({ passthrough: true }) response: Response) {
      const authToken=await this.authService.signIn(signInDto.email, signInDto.password);
      response.cookie('jwt', authToken.access_token, { httpOnly: true });
      return {
        "message": "success",
      };
    }
  
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }
  