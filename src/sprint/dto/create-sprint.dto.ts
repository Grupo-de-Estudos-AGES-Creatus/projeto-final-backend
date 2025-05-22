import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class CreateSprintDto{

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'The name of the sprint',
        example: 'Calculator',
        })
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'The description of the sprint',
        example: 'Portfolio sprint',
        })
    descriptionPath: string;

    @IsBoolean()
    @ApiProperty({
        description: 'Says if the sprint is locked or avaiable',
        example: false,
        })
    isLocked: boolean;
    
}