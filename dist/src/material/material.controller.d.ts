import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
export declare class MaterialController {
    private readonly materialService;
    constructor(materialService: MaterialService);
    create(createMaterialDto: CreateMaterialDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMaterialDto: UpdateMaterialDto): string;
    remove(id: string): string;
}
