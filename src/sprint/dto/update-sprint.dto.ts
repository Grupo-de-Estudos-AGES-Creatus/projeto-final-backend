import { IsOptional, IsString, IsNotEmpty, IsBoolean } from 'class-validator';


export class UpdateSprintDto{

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    title: string;

    @IsOptional()
    @IsBoolean()
    isLocked: boolean;

    @IsString()
    @IsOptional()
    description: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    semester: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    linkGithub: string

}