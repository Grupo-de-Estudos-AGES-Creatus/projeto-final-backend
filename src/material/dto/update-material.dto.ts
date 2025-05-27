import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"

// Filtro para atualizar um material
export class UpdateMaterial {

    @ApiPropertyOptional({ description: "Update material title", example: "NestJS documentation" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiPropertyOptional({ description: "Update material description", example: "https://docs.nestjs.com/" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    text: string
} 