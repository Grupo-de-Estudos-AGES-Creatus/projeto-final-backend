import { Optional } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'


// Filtro para criar um material
export class CreateMaterial {

    @ApiProperty({
    description: 'The ID of the sprint the material belongs to',
    example: 2,
    })
    @IsInt()
    sprintId: number

    @ApiProperty({
    description: 'Material title',
    example: 'Programming content',
    })
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty({
    description: 'Material description',
    example: 'Programming content',
    })
    @IsNotEmpty()
    @IsString()
    text: string
}