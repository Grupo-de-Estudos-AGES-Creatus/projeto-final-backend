import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { CurrentUser, Public } from './auth.decorators'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login
  @Public()
  @Post('')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login credentials' })
  @ApiResponse({ status: 403, description: 'Invalid data' })
  @ApiBody({ type: LoginDto})
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Mudar de senha no primeiro acesso
  @Post('changePassword')
  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({ status: 200, description: 'Login credentials' })
  @ApiResponse({ status: 403, description: 'Invalid data' })
  @ApiResponse({ status: 400, description: "User dosen't exists"})
  @ApiBody({ type: ChangePasswordDto})
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @CurrentUser() currentUser: any) {
    return this.authService.changePassword(changePasswordDto, currentUser);
  }
}

