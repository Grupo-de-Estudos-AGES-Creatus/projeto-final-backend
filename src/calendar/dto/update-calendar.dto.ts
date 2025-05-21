import { Optional } from "@nestjs/common"
import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class UpdateEvent {

    @ApiPropertyOptional({
        description: "Event title",
        example: "International Rock n Roll day"
    })
    @IsNotEmpty()
    @IsString()
    @Optional()
    title: string

    @ApiPropertyOptional({
        description: "Event description",
        example: "The day that celebrates rock music"
    })
    @IsNotEmpty()
    @IsString()
    @Optional()
    description: string

    @ApiPropertyOptional({
        description: "When event starts",
        example: "July 13"
    })
    @IsDate()
    @Optional()
    startDate: Date
    
    @ApiPropertyOptional({
        description: "When event ends",
        example: "July 14"
    })
    @IsDate()
    @Optional()
    endDate: Date
}