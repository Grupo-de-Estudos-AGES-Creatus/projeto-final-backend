import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
export declare class SprintController {
    private readonly sprintService;
    constructor(sprintService: SprintService);
    create(createUserDto: CreateSprintDto): Promise<{
        id: number;
        img_url: string | null;
        title: string;
        description: string;
        isLocked: boolean;
    }>;
    findAll(): Promise<{
        id: number;
        img_url: string | null;
        title: string;
        description: string;
        isLocked: boolean;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        img_url: string | null;
        title: string;
        description: string;
        isLocked: boolean;
    }>;
    update(id: number, updateSprintDto: UpdateSprintDto): Promise<{
        id: number;
        email: string;
        username: string;
        password: string;
        role: string;
        registration: string;
        img_url: string | null;
        semester: string;
        firstAcess: boolean;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        email: string;
        username: string;
        password: string;
        role: string;
        registration: string;
        img_url: string | null;
        semester: string;
        firstAcess: boolean;
        createdAt: Date;
    }>;
}
