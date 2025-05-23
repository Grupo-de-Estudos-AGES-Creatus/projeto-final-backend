import { IsDate, IsNotEmpty, IsString, IsOptional } from 'class-validator'
import { ApiPropertyOptional } from "@nestjs/swagger"

// Filtro para editar um evento no calendário
export class UpdateCalendarEventDto {

    @ApiPropertyOptional({ description: "Calendar event title" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiPropertyOptional({ description: "Calendar event description" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiPropertyOptional({ description: "Start date of the calendar event" })
    @IsOptional()
    @IsDate()
    startDate: Date
    
    @ApiPropertyOptional({ description: "End date of the calendar event" })
    @IsOptional()
    @IsDate()
    endDate: Date
} 