import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsString()
    @IsNotEmpty()
    registration: string;

    @IsString()
    @IsNotEmpty()
    semester: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    githubLink: string
}