import { IsInt, IsNotEmpty, IsString } from 'class-validator'

// Filtro para criar um projeto
export class CreateRepository {
    @IsInt()
    userId: number

    @IsInt()
    sprintId: number

    @IsNotEmpty()
    @IsString()
    link: string
}