import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class SigninDto {
  @IsEmail({}, { message: 'Email inválido.' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string;
}
