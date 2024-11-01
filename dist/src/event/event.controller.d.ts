import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
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
    findOne(id: string): string;
    findUpcoming(date: string): Promise<{
        id: number;
        title: string;
        start_date: Date;
        end_date: Date;
    }[]>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<{
        id: number;
        title: string;
        start_date: Date;
        end_date: Date;
    }>;
    remove(id: string): Promise<boolean>;
    removeOld(date: string): Promise<boolean>;
}
