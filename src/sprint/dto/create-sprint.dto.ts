import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';


export class CreateSprintDto{

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsBoolean()
    isLocked: boolean;
    
}