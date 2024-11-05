import { CreateMaterialDto } from 'src/material/dto/create-material.dto';

export class CreateCardDto {
    title: string;
    description?: string;
    img_url?: string;
    hidden: boolean;
    subtitle?: string;
    material: CreateMaterialDto[];
}