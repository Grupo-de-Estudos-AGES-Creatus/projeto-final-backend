import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"
// Filtro para atualizar um material
export class UpdateMaterial {

    @ApiPropertyOptional({
        description: "Update material title",
        example: "Medicine"
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    text: string

    @ApiPropertyOptional({
        description: "Update material description",
        example: "Medicine content"
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string
} 