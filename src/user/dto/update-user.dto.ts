import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsInt, IsUrl } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsInt()
    n_of_absences?: number;

    @IsOptional()
    @IsUrl()
    img_url?: string;

    @IsOptional()
    @IsString()
    resetToken?: string;
}