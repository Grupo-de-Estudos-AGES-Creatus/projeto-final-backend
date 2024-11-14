import { CreateMaterialDto } from 'src/material/dto/create-material.dto';

export class CreateCardDto {
    id: number;
    title: string;
    description?: string;
    url?: string
    image?: string;
    isBlocked: boolean;
    material: CreateMaterialDto[];
}