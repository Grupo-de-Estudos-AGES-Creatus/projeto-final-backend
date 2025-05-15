import { CalendarService } from './calendar.service';
import { UpdateEvent } from './dto/calendar.dto';
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
    update(id: number, event: UpdateEvent): Promise<void>;
    delete(id: number): Promise<void>;
}
