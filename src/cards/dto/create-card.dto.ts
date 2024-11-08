import { CreateMaterialDto } from 'src/material/dto/create-material.dto';

export class CreateCardDto {
    index: number;
    title?: string;
    description?: string;
    url: string
    image?: string;
    isBlocked: boolean;
    subtitle?: string;
    material: CreateMaterialDto[];
}