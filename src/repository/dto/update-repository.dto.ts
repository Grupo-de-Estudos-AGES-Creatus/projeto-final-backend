import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger"
// Filtro para atualizar um projeto
export class UpdateRepository {
    @ApiPropertyOptional({
        description: "Repository link",
        example: "https://github.com/Grupo-de-Estudos-AGES-Creatus"
    })
    @IsOptional()
    @IsString()
    link: string
} 