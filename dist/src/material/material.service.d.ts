import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
export declare class MaterialService {
    create(createMaterialDto: CreateMaterialDto): Promise<{
        id: number;
        name: string;
        card_id: number;
        description: string;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        card_id: number;
        description: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        card_id: number;
        description: string;
    }>;
    update(id: number, updateMaterialDto: UpdateMaterialDto): Promise<{
        id: number;
        name: string;
        card_id: number;
        description: string;
    }>;
    remove(id: number): Promise<void>;
}
