import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VerifyUserDto {
    @ApiPropertyOptional({
        description: "User email",
        example: "john.doe@unknown.com"
    })
    @IsNotEmpty()
    @IsString()
    email: string;
    
    @ApiPropertyOptional({
        description: "User password",
        example: "1234"
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}