import { Optional } from "@nestjs/common"
import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

// Filtro para atualizar um material
export class UpdateMaterial {

    @ApiPropertyOptional({
        description: "Update material title",
        example: "Medicine"
    })
    @Optional()
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiPropertyOptional({
        description: "Update material description",
        example: "Medicine content"
    })
    @Optional()
    @IsNotEmpty()
    @IsString()
    text: string


}