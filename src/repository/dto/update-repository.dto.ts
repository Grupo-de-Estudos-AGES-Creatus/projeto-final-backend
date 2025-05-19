import { IsString } from "class-validator";

// Filtro para atualizar um projeto
export class UpdateRepository {
    @IsString()
    link: string
} 