import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';


export class CreateSprintDto{

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    descriptionPath: string;

    @IsBoolean()
    isLocked: boolean;
    
}