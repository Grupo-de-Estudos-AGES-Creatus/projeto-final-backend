import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';


export class CreateSprintDto{

    @ApiProperty({
        description: 'Sprint title',
        example: 'Sprint 5 - Portfolio',
      })
    @IsNotEmpty()
    @IsString()
    title: string;


    @ApiProperty({
        description: 'Sprint description',
        example: 'Make a portfolio',
      })
    @IsNotEmpty()
    @IsString()
    descriptionPath: string;

    @ApiProperty({
        description: 'This sprint is locked?',
        example: true,
      })
    @IsBoolean()
    isLocked: boolean;
    
}