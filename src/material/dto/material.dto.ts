import { Optional } from '@nestjs/common'
import { IsInt, IsString } from 'class-validator'


// Filtro para criar um material
export class CreateMaterial {

    @IsInt()
    sprintId: number

    @IsString()
    text: string

    @IsString()
    title: string
}

// Filtro para atualizar um material
export class UpdateMaterial {

    @Optional()
    @IsString()
    text: string

    @Optional()
    @IsString()
    title: string
}