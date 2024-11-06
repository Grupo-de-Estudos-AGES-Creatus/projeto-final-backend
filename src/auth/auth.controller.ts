import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService) {}

    @Post('forgotpw')
    async forgotPassword(@Body() email: string ): Promise<void> {
        return this.authService.forgotPassword(email);
    }

    @Post('reset-password')
    async resetPassword(
        @Body() { token, password }: { token: string; password: string }
    ): Promise<void> {
        return this.authService.resetPassword(token, password);
    }
}