import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailModule } from '../email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import {UserService} from "../user/user.service";

@Module({
    imports: [
        EmailModule,
        JwtModule.register({
            secret: process.env.JWT_RESET_PASSWORD_SECRET,
            signOptions: { expiresIn: '10m' } // e.g. 30s, 7d, 24h
        }),
        ConfigModule
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService]
})
export class AuthModule {}