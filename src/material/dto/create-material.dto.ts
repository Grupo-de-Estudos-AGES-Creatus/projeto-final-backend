import { IsInt, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
// Filtro para criar um material
export class CreateMaterial {

    
    @ApiProperty({
    description: 'The ID of the sprint the material belongs to',
    example: 2,
    })
    @IsInt()
    sprintId: number

    @ApiProperty({
    description: 'The ID of the user that posted the material',
    example: 2,
    })
    @IsInt()
    userId: number
    
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