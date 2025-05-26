import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString } from 'class-validator';

// Filtro para login
export class LoginDto {

  @ApiProperty({ description: "Login, registration or email", example: "ages@gmail.com ou 12345678" })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ description: "Password", example: "@Ages2025" })
  @IsNotEmpty()
  password: string;
}
