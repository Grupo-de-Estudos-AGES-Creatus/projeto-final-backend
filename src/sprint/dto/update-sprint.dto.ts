import { IsOptional, IsString, IsNotEmpty, IsBoolean } from 'class-validator';

// Filtro para atualizar uma sprint
export class UpdateSprintDto{

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsBoolean()
    isLocked: boolean;

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    semester: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    linkGithub: string

} 