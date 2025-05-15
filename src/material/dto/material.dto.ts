import { Optional } from '@nestjs/common'
import { IsInt, IsString } from 'class-validator'

export class CreateMaterial {

    @IsInt()
    sprintId: number

    @IsString()
    text: string

    @IsString()
    title: string
}

export class UpdateMaterial {

    @Optional()
    @IsString()
    text: string

    @Optional()
    @IsString()
    title: string
}