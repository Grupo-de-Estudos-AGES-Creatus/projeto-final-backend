import { IsNotEmpty, IsOptional, IsString } from "class-validator"

// Filtro para atualizar um material
export class UpdateMaterial {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    text: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string
} 