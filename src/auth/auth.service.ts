import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SigninDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  // Cadastro de novo usuário
  async signup(dto: CreateUserDto) {
    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Cria o usuário com a senha criptografada
    const user = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    // Payload do JWT
    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  // Login de usuário existente
  async signin(dto: SigninDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new HttpException('Senha incorreta', HttpStatus.FORBIDDEN);
    }
    // ✅ Adicionando o log de sucesso
    console.log(`Usuário logado com sucesso: ${user.email}`);
    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
