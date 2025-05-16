import { IsOptional, IsString, IsNotEmpty, IsBoolean } from 'class-validator';


export class UpdateSprintDto{

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    title?: string;

    @IsOptional()
    @IsBoolean()
    isLocked?: boolean;

}