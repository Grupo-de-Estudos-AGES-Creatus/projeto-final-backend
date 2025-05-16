import { IsOptional, IsString, IsNotEmpty, IsBoolean } from 'class-validator';


export class UpdateSprintDto{

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    title?: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    descriptionPath?: string;

    @IsOptional()
    @IsBoolean()
    isLocked?: boolean;

}