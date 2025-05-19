import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'


// Filtro para criar um projeto
export class CreateProject {
    @IsInt()
    userId: number

    @IsInt()
    sprintId: number

    @IsNotEmpty()
    @IsString()
    link: string

    @IsString()
    @IsOptional()
    mdFile?: String
}

// Filtro para atualizar um projeto
export class UpdateProject {
    @IsString()
    link: string
}