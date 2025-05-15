import { CalendarService } from './calendar.service';
import { CreateEvent, UpdateEvent } from './dto/calendar.dto';
export declare class CalendarController {
    private calendarService;
    constructor(calendarService: CalendarService);
    getAll(): Promise<{
        id: number;
        title: string;
        description: string;
        startDate: Date;
        endDate: Date;
    }[]>;
    getOne(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        startDate: Date;
        endDate: Date;
    }>;
    create(event: CreateEvent): Promise<{
        id: number;
        title: string;
        description: string;
        startDate: Date;
        endDate: Date;
    }>;
    update(id: number, event: UpdateEvent): Promise<{
        id: number;
        title: string;
        description: string;
        startDate: Date;
        endDate: Date;
    }>;
    delete(id: number): Promise<string>;
}
