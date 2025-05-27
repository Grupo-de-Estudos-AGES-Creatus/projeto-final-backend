import { IsDate, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";

// Filtro para criar um evento no calendário
export class CreateCalendarEventDto {

    @ApiProperty({ description: "Calendar event title", example: "Sprint 1 end date" })
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty({ description: "Calendar event description", example: "End date to submit your project!" })
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty({ description: "Start date of the calendar event", example: new Date() })
    @IsDate()
    startDate: Date
    
    @ApiProperty({ description: "End date of the calendar event", example: new Date() })
    @IsDate()
    endDate: Date
}