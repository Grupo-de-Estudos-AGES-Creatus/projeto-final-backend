import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsBoolean } from 'class-validator';

// Filtro para atualizar uma sprint
export class UpdateSprintDto{

    @ApiProperty({ description: "Sprint title", example: "Sprint 1 - Calculadora" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: "Sprint is locked?", example: "false" })
    @IsOptional()
    @IsBoolean()
    isLocked: boolean;

    @ApiProperty({ description: "Brief sprint description", example: "In this sprint a calculator will be developed" })
    @IsOptional()
    @IsString()
    description: string

    @ApiProperty({ description: "Semester", example: "2025/1" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    semester: string

    @ApiProperty({ description: "Github link", example: "https://github.com/Grupo-de-Estudos-AGES-Creatus/projeto-final-backend" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    linkGithub: string
} 