import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './../prisma.service'

@Injectable()
export class AuthService {
  constructor( private jwtService: JwtService, private prisma: PrismaService ) {}

  // Login
  async login(loginDto: LoginDto) {
    // Verifica se o login corresponde a um email
    let user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.login
      }
    })

    // Se não achar verifica se o login corresponde a uma matrícula
    if (!user) {
      user = await this.prisma.user.findUnique({
        where: {
          registration: loginDto.login
        }
      })
    }

    // Se não achar retorna dizendo que os dados são inválidos
    if (!user) throw new HttpException('Dados inválidos', HttpStatus.FORBIDDEN);

    // Compara a senha passada com a armazenada
    const passwordMatch = await bcrypt.compare(loginDto.password, user.password);

    // Se for diferente retorna um erro
    if (!passwordMatch) throw new HttpException('Dados inválidos', HttpStatus.FORBIDDEN);

    // Cria um token para o usuário
    const payload = { userId: user.id, firstAcess: user.firstAcess, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    
    // Retorna o token, se é o primeiro acesso e o cargo
    return {
      accessToken: token,
      firstAcess: user.firstAcess,
      role: user.role
    }
  }

  // Mudar a senha
  async changePassword(changePasswordDto: ChangePasswordDto, currentUser: any) {
    // Verifica se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: {
        id: currentUser.userId
      }
    })

    // Se o usuário não existir retorna um erro
    if (!user) throw new HttpException("Usuário não encontrado, tente novamente", HttpStatus.BAD_REQUEST)
    // Se não for o primeiro acesso retorna um erro
    if (!user.firstAcess) throw new HttpException("A senha já foi trocada", HttpStatus.FORBIDDEN);

    // Criptografa a senha
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(changePasswordDto.password, saltOrRounds);

    // Atualiza a senha
    const updateUser = await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: hash,
        firstAcess: false
      }
    })
    
    // Cria um token para o usuário
    const payload = { userId: user.id, firstAcess: user.firstAcess, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    
    // Retorna o token, se é o primeiro acesso e o cargo
    return {
      accessToken: token,
      firstAcess: updateUser.firstAcess,
      role: user.role
    }
    
  }
}
