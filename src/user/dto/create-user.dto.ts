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

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    role: string;

    @IsNotEmpty()
    @IsString()
    registration: string;

    @IsNotEmpty()
    @IsString()
    semester: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    githubLink: string
}  