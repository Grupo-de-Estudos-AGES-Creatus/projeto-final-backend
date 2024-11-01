import { CreateEventDto } from './create-event.dto';
declare const UpdateEventDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateEventDto>>;
export declare class UpdateEventDto extends UpdateEventDto_base {
    title?: string;
    start_date?: Date;
    end_date?: Date;
}
export {};
