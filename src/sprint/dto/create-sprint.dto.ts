import { IsOptional, IsString, IsInt, IsUrl, isString, IsNotEmpty } from 'class-validator';


export class CreateSprintDto{

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    
    isLocked: boolean;
}