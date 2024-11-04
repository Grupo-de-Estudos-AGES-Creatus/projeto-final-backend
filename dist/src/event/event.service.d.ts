import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
<<<<<<< HEAD
export declare class EventService {
    create(createEventDto: CreateEventDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEventDto: UpdateEventDto): string;
    remove(id: number): string;
=======
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
    update(updateEventDto: UpdateEventDto): Promise<{
        id: number;
        title: string;
        start_date: Date;
        end_date: Date;
    } | "start date can't be bigger than end date">;
    remove(id: number): Promise<boolean>;
    removeOld(date: Date): Promise<boolean>;
>>>>>>> 6a6e30982d29ebf08d2e0689d34a645eba52320f
}
