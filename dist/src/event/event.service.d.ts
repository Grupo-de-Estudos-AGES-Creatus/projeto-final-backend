import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class EventService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createEventDto: CreateEventDto): Promise<"Event end date is smaller than start date" | {
        id: number;
        title: string;
        start_date: Date;
        end_date: Date;
    }>;
    findAll(): Promise<{
        id: number;
        title: string;
        start_date: Date;
        end_date: Date;
    }[]>;
    findOne(id: number): string;
    findUpcomingEvents(date?: Date): Promise<{
        id: number;
        title: string;
        start_date: Date;
        end_date: Date;
    }[]>;
    update(id: number, updateEventDto: UpdateEventDto): Promise<{
        id: number;
        title: string;
        start_date: Date;
        end_date: Date;
    }>;
    remove(id: number): Promise<boolean>;
    removeOld(date: Date): Promise<boolean>;
}
