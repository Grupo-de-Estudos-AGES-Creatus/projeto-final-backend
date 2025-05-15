import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsInt, IsUrl, isString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    email:        string;
    @IsString()
    @IsNotEmpty()
    username:     string;
    @IsString()
    @IsNotEmpty()
    password:     string;
    @IsString()
    @IsNotEmpty()
    role:         string;
    @IsString()
    @IsNotEmpty()
    registration: string;
    @IsString()
    @IsNotEmpty()
    semester:    string;
    @IsString()
    @IsOptional()
    img_url?:     string;
}