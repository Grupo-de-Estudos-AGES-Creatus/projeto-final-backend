import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

// Filtro para atualizar um usuário
export class UpdateUserSelfDto {

    @ApiProperty({ description: 'Github link', example: 'https://github.com/Grupo-de-Estudos-AGES-Creatus' })
    @IsNotEmpty()
    @IsString()
    githubLink: string
}  