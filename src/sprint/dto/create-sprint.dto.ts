import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

// Filtro para criar uma sprint
export class CreateSprintDto{

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsBoolean()
    isLocked: boolean;

    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    semester: string

    @IsNotEmpty()
    @IsString()
    linkGithub: string
    
} 