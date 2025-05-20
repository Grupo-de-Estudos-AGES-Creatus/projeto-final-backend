import { IsDate, IsNotEmpty, IsString } from 'class-validator'

// Filtro para criar um evento no calendário
export class CreateCalendarEventDto {

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsDate()
    startDate: Date
    
    @IsDate()
    endDate: Date
}