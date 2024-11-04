import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { IsOptional } from 'class-validator';

export class UpdateEventDto extends PartialType(CreateEventDto) {
    id: number;

    @IsOptional()
    title?: string;

    @IsOptional()
    start_date?: Date;

    @IsOptional()
    end_date?: Date;
}
