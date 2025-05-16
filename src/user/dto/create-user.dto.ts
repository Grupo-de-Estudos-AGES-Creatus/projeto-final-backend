import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@email.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Nome de usuário',
    example: 'usuario123',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Função do usuário',
    example: 'admin ou user',
  })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    description: 'Matrícula do usuário',
    example: '20231234',
  })
  @IsString()
  @IsNotEmpty()
  registration: string;

  @ApiProperty({
    description: 'Semestre do grupo',
    example: '2023/1',
  })
  @IsString()
  @IsNotEmpty()
  semester: string;

  @ApiPropertyOptional({
    description: 'Caminho da imagem do usuário',
    example: '/images/user1.png',
  })
  @IsString()
  @IsOptional()
  imgPath?: string;
}