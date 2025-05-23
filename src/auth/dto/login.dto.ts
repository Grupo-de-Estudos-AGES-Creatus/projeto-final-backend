import {IsNotEmpty, IsString } from 'class-validator';

// Filtro para login
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
