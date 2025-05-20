import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

// Filtro para atualizar um usuário
export class UpdateUserDto {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    registration: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    role: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    semester: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    githubLink: string
}  