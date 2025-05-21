import { Optional } from "@nestjs/common"
import { IsNotEmpty, IsString } from "class-validator"

// Filtro para atualizar um material
export class UpdateMaterial {

    @Optional()
    @IsNotEmpty()
    @IsString()
    text: string

    @Optional()
    @IsNotEmpty()
    @IsString()
    title: string
}