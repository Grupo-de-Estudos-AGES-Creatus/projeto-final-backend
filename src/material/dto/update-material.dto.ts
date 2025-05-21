import { Optional } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

// Filtro para atualizar um material
export class UpdateMaterial {

    @ApiProperty({
        description: "Update material title",
        example: "Medicine"
    })
    @Optional()
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty({
        description: "Update material description",
        example: "Medicine content"
    })
    @Optional()
    @IsNotEmpty()
    @IsString()
    text: string


}