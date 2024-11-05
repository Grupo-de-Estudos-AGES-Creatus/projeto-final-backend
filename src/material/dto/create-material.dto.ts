import { CreateContentDto } from "src/content/dto/create-content.dto";

export class CreateMaterialDto {
    name: string;
    description?: string;
    card_id: number;
    content: CreateContentDto[];
}