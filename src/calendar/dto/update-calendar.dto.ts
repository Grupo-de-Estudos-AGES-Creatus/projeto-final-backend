import { Optional } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class UpdateEvent {

    @ApiProperty({
        description: "Event title",
        example: "International Rock n Roll day"
    })
    @IsNotEmpty()
    @IsString()
    @Optional()
    title: string

    @ApiProperty({
        description: "Event description",
        example: "The day that celebrates rock music"
    })
    @IsNotEmpty()
    @IsString()
    @Optional()
    description: string

    @ApiProperty({
        description: "When event starts",
        example: "July 13"
    })
    @IsDate()
    @Optional()
    startDate: Date
    
    @ApiProperty({
        description: "When event ends",
        example: "July 14"
    })
    @IsDate()
    @Optional()
    endDate: Date
}