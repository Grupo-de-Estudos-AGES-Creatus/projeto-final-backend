import { IsOptional, IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class UpdateSprintDto{

    @IsNotEmpty()
    @IsString()
    @IsOptional()
        @ApiProperty({
            description: 'The name of the sprint',
            example: 'Calculator',
            })
    title?: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The description of the sprint',
        example: 'Portfolio sprint',
        })
    descriptionPath?: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({
        description: 'Says if the sprint is locked or avaiable',
        example: false,
        })
    isLocked?: boolean;

}