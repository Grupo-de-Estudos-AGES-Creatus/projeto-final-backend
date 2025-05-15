import { IsOptional, IsString, IsInt, IsNotEmpty } from 'class-validator';


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
    isLocked?: boolean;

    @IsInt()
    @IsOptional()
    projectId?: number;
}