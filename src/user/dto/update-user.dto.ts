import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    username?: string;
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    email?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    registration?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    role?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    semester?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    githubLink: string
}