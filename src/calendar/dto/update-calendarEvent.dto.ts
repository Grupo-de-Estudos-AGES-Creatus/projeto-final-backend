import { IsDate, IsNotEmpty, IsString, IsOptional } from 'class-validator'
import { ApiPropertyOptional } from "@nestjs/swagger"
// Filtro para editar um evento no calendário
export class UpdateCalendarEventDto {


    @ApiPropertyOptional({
        description: "Event title",
        example: "International Rock n Roll day"
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiPropertyOptional({
        description: "Event description",
        example: "The day that celebrates rock music"
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiPropertyOptional({
        description: "When event starts",
        example: "July 13"
    })
    @IsOptional()
    @IsDate()
    startDate: Date
    
    @ApiPropertyOptional({
        description: "When event ends",
        example: "July 14"
    })
    @IsOptional()
    @IsDate()
    endDate: Date
} 