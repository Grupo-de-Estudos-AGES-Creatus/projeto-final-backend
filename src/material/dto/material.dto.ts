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