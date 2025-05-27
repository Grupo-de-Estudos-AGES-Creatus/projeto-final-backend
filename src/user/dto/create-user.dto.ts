import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Filtro para criar um usuário
export class CreateUserDto {

    @ApiProperty({ description: 'User email',example: 'user@email.com' })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({ description: 'Username', example: 'Name Lastname' })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ description: 'Password', example: '@Ages2025' })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ description: 'Role', example: 'admin' })
    @IsNotEmpty()
    @IsString()
    role: string;

    @ApiProperty({ description: 'Registration', example: '12345678' })
    @IsNotEmpty()
    @IsString()
    registration: string;

    @ApiProperty({ description: 'Semester', example: '2025-1' })
    @IsNotEmpty()
    @IsString()
    semester: string;

    @ApiProperty({ description: 'Github link', example: 'https://github.com/Grupo-de-Estudos-AGES-Creatus' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    githubLink: string
}  