import { Optional } from '@nestjs/common'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'


// Filtro para criar um material
export class CreateMaterial {

    @IsInt()
    sprintId: number

    @IsNotEmpty()
    @IsString()
    text: string

    @IsNotEmpty()
    @IsString()
    title: string
}

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