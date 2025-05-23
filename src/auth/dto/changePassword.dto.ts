import { IsNotEmpty, IsString } from 'class-validator';

// Filtro para mudar a senha
export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
