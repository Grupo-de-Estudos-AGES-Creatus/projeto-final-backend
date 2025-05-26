import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

// Filtro para atualizar um usuário
export class UpdateUserDto {

    @ApiProperty({ description: 'Username',example: 'Name Lastname' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @ApiProperty({ description: 'User email',example: 'user@email.com' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({ description: 'Password', example: '@Ages2025' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ description: 'Registration', example: '12345678' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    registration: string;

    @ApiProperty({ description: 'Role', example: 'admin' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    role: string;

    @ApiProperty({ description: 'Semester', example: '2025/1' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    semester: string;

    @ApiProperty({ description: 'Github link', example: 'https://github.com/Grupo-de-Estudos-AGES-Creatus' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    githubLink: string
}  