import { Optional } from '@nestjs/common'
import { IsDate, IsNotEmpty, IsString } from 'class-validator'

// Filtro para criar um evento no calendário
export class CreateEvent {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsDate()
    startDate: Date
    
    @IsDate()
    endDate: Date
}

// Filtro para editar um evento no calendário
export class UpdateEvent {

    @IsNotEmpty()
    @IsString()
    @Optional()
    title: string

    @IsNotEmpty()
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