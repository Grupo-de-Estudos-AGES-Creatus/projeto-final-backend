import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findAndVerify(email, pass);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }
}
// async login(
//   @Body() verifyUserDto: VerifyUserDto,
//   @Res({ passthrough: true }) response: Response
// ) {
//   const user = await this.userService.findAndVerify(verifyUserDto.email, verifyUserDto.password);
//   if (!user) {
//     response.status(400).json({
//       message: "error",
//     });
//     return;
//   }
//   let jwt = await this.jwtService.signAsync({ email: user.email });
//   response.cookie('jwt', jwt, { httpOnly: true });


//   return {
//     "message": "success",
//   };
// }