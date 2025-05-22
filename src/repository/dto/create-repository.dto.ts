import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

// Filtro para criar um projeto
export class CreateRepository {
    
    @ApiProperty({
        description: 'The ID of the user the repository belongs to',
        example: 2,
    })
    @IsNotEmpty()
    @IsInt()
    userId: number

    @ApiProperty({
        description: 'The ID of the sprint the repository belongs to',
        example: 2,  
    })
    @IsNotEmpty()
    @IsInt()
    sprintId: number

    @ApiProperty({
        description: "Repository link",
        example: "https://github.com/Grupo-de-Estudos-AGES-Creatus"  
    })
    @IsNotEmpty()
    @IsString()
    link: string
}