import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

// Filtro para criar um usuário
export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    email: string;

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