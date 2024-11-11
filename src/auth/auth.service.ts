import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient()
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await prisma.user.findUnique({
        where: { email },
      });
    console.log(user);
    console.log(pass);
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException({
        message: 'Senha incorreta ou usuario incorreto',
      });
    }
    const payload = { sub: user.id, name: user.name, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}