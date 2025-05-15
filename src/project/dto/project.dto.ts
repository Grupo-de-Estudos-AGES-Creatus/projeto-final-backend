import { Optional } from '@nestjs/common'
import { IsDate, IsInt, IsString } from 'class-validator'

export class CreateProject {
    @IsInt()
    userId: number

    @IsInt()
    sprintId: number

    @IsString()
    link: string
}

export class UpdateProject {
    @IsString()
    link: string
}