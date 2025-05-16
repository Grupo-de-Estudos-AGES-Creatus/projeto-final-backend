import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsInt, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional({
        description: 'Nome de usuário',
        example: 'usuario123',
    })
    @IsOptional()
    @IsString()
    username?: string;
    
    @ApiPropertyOptional({
        description: 'Email do usuário',
        example: 'usuario@email.com',
    })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiPropertyOptional({
        description: 'Senha do usuário',
        example: 'senha123',
    })
    @IsOptional()
    @IsString()
    password?: string;
    
    @ApiPropertyOptional({
        description: 'Matrícula do usuário',
        example: '20231234',
    })
    @IsOptional()
    @IsString()
    registration?: string;

    @ApiPropertyOptional({
        description: 'Função do usuário',
        example: 'admin ou user',
    })
    @IsOptional()
    @IsString()
    role?: string;

    @ApiPropertyOptional({
        description: 'Semestre do grupo',
        example: '2023/1',
    })
    @IsOptional()
    @IsString()
    semester?: string;

    @ApiPropertyOptional({
        description: 'Caminho da imagem do usuário',
        example: '/images/user1.png',
    })
    @IsOptional()
    @IsUrl()
    imgPath?: string;
}