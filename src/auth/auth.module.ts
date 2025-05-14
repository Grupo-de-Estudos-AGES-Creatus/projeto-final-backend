import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module'; 
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UserModule, 
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '150s' },
    }),
  ],
  providers: [AuthService, AuthGuard, JwtModule],  
  controllers: [AuthController],
  exports: [AuthService, AuthGuard], 
})
export class AuthModule {}