import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator'
import { ApiPropertyOptional } from "@nestjs/swagger"

// Filtro para editar um evento no calendário
export class UpdateCalendarEventDto {

    @ApiPropertyOptional({ description: "Calendar event title", example: "Sprint 1 end date" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiPropertyOptional({ description: "Calendar event description", example: "End date to submit your project!" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiPropertyOptional({ description: "Start date of the calendar event", example: new Date() })
    @IsOptional()
    @IsDateString()
    startDate: string
    
    @ApiPropertyOptional({ description: "End date of the calendar event", example: new Date() })
    @IsOptional()
    @IsDateString()
    endDate: string
} 