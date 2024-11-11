import { PartialType } from '@nestjs/mapped-types';
import { CreateUserFormDto } from './create-user_form.dto';
import { IsOptional, IsString, IsInt, IsBoolean } from 'class-validator';

export class UpdateUserFormDto extends PartialType(CreateUserFormDto) {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    matricula?: string;

    @IsOptional()
    @IsString()
    semester?: string;

    @IsOptional()
    @IsString()
    course?: string;

}
