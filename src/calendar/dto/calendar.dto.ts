import { Optional } from '@nestjs/common'
import { IsDate, IsString } from 'class-validator'

// Filtro para criar um evento no calendário
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

// Filtro para editar um evento no calendário
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