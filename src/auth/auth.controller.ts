import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { CurrentUser } from './auth.decorators'

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('changePassword')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @CurrentUser() currentUser: any) {
    return this.authService.changePassword(changePasswordDto, currentUser);
  }
}
