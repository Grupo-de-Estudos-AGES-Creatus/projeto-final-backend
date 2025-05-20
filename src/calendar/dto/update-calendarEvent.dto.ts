import { IsDate, IsNotEmpty, IsString, IsOptional } from 'class-validator'

// Filtro para editar um evento no calendário
export class UpdateCalendarEventDto {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string

    @IsOptional()
    @IsDate()
    startDate: Date
    
    @IsOptional()
    @IsDate()
    endDate: Date
} 