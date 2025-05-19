import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';


export class CreateSprintDto{

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsBoolean()
    isLocked: boolean;

    @IsString()
    description: string

    @IsString()
    @IsNotEmpty()
    semester: string

    @IsString()
    @IsNotEmpty()
    linkGithub: string
    
}