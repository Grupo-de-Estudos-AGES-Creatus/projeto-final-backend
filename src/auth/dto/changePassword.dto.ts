import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

// Filtro para mudar a senha
export class ChangePasswordDto {

  @ApiProperty({ description: "New password", example: "@Ages2025" })
  @IsString()
  @IsNotEmpty()
  password: string;
}
