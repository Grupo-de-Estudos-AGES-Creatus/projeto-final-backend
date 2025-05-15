import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
export declare class SprintController {
    private readonly sprintService;
    constructor(sprintService: SprintService);
    create(createUserDto: CreateSprintDto): Promise<{
        id: number;
        img_url: string | null;
        createdAt: Date;
        title: string;
        descriptionPath: string;
        projectId: number;
        isLocked: boolean;
    }>;
    findAll(): Promise<{
        id: number;
        img_url: string | null;
        createdAt: Date;
        title: string;
        descriptionPath: string;
        projectId: number;
        isLocked: boolean;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        img_url: string | null;
        createdAt: Date;
        title: string;
        descriptionPath: string;
        projectId: number;
        isLocked: boolean;
    }>;
    update(id: number, updateSprintDto: UpdateSprintDto): Promise<{
        id: number;
        img_url: string | null;
        createdAt: Date;
        title: string;
        descriptionPath: string;
        projectId: number;
        isLocked: boolean;
    }>;
    remove(id: number): Promise<void>;
}
