import { Optional } from '@nestjs/common'
import { IsDate, IsString } from 'class-validator'

export class CreateEvent {
    @IsString()
    title: string

    @IsString()
    description: string

    @IsDate()
    startDate: Date
    
    @IsDate()
    endDate: Date
}

export class UpdateEvent {
    @IsString()
    @Optional()
    title: string

    @IsString()
    @Optional()
    description: string

    @IsDate()
    @Optional()
    startDate: Date
    
    @IsDate()
    @Optional()
    endDate: Date
}