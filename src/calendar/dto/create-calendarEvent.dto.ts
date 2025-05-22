import { IsDate, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";

// Filtro para criar um evento no calendário
export class CreateCalendarEventDto {


    @ApiProperty({
            description: "Event title",
            example: "International Rock n Roll day"
    })
    @IsNotEmpty()
    @IsString()
    title: string


    @ApiProperty({
        description: "Event description",
        example: "The day that celebrates rock music"
    })
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty({
        description: "When event starts",
        example: "July 13"
    })
    @IsDate()
    startDate: Date
    
    @ApiProperty({
        description: "When event ends",
        example: "July 14"
    })
    @IsDate()
    endDate: Date
}