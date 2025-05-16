import { IsString, IsNotEmpty } from 'class-validator';
export class VerifyUserDto {
    @IsNotEmpty()
    @IsString()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
}