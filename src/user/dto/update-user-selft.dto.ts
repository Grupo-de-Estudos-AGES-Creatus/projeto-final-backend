import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

// Filtro para atualizar um usuário
export class UpdateUserSelfDto {

    @IsNotEmpty()
    @IsString()
    githubLink: string
}  