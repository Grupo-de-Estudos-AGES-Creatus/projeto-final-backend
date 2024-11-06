import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {UserService} from "../user/user.service";

@Module({
    imports: [JwtModule, ConfigModule.forRoot()],
    controllers: [EmailController],
    providers: [EmailService, UserService],
    exports: [EmailService]
})
export class EmailModule {}