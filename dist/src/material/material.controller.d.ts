import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
export declare class MaterialController {
    private readonly materialService;
    constructor(materialService: MaterialService);
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
    findOne(id: string): Promise<{
        id: number;
        name: string;
        card_id: number;
        description: string;
    }>;
    update(id: string, updateMaterialDto: UpdateMaterialDto): Promise<{
        id: number;
        name: string;
        card_id: number;
        description: string;
    }>;
    remove(id: string): Promise<void>;
}
