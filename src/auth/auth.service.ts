import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor( private jwtService: JwtService, private prisma: PrismaService ) {}


  async login(loginDto: LoginDto) {
    let user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email
      }
    })
    if (!user) {
      user = await this.prisma.user.findUnique({
        where: {
          registration: loginDto.email
        }
      })
    }

    if (!user) throw new HttpException('Dados inválidos', HttpStatus.FORBIDDEN);

    const passwordMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!passwordMatch) throw new HttpException('Dados inválidos', HttpStatus.FORBIDDEN);

    const payload = { userId: user.id, firstAcess: user.firstAcess, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    
    return {
      accessToken: token,
      firstAcess: user.firstAcess,
      role: user.role
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto, currentUser: any) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: currentUser.userId
      }
    })

    if (!user) throw new HttpException("Usuário não encontrado, tente novamente", HttpStatus.BAD_REQUEST)
    if (!user.firstAcess) throw new HttpException("A senha já foi trocada", HttpStatus.FORBIDDEN);

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(changePasswordDto.password, saltOrRounds);

    const updateUser = await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: hash,
        firstAcess: false
      }
    })
    
    const payload = { userId: user.id, firstAcess: user.firstAcess, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return {
      accessToken: token,
      firstAcess: updateUser.firstAcess,
      role: user.role
    }
    
  }
}
