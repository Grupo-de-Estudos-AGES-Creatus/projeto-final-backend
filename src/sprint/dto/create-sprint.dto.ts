import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

// Filtro para criar uma sprint
export class CreateSprintDto{

    @ApiProperty({ description: "Sprint title", example: "Sprint 1 - Calculadora" })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: "Sprint is locked?", example: "true" })
    @IsBoolean()
    isLocked: boolean;

    @ApiProperty({ description: "Brief sprint description", example: "In this sprint a calculator will be developed" })
    @IsString()
    description: string

    @ApiProperty({ description: "Semester", example: "2025/1" })
    @IsNotEmpty()
    @IsString()
    semester: string

    @ApiProperty({ description: "Github link", example: "https://github.com/Grupo-de-Estudos-AGES-Creatus/projeto-final-backend" })
    @IsNotEmpty()
    @IsString()
    linkGithub: string
    
}