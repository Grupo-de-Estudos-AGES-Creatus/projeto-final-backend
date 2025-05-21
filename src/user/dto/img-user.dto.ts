import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateUserImgDto
{
    @ApiProperty({
        description: "User image",
        example: "/assets/profile_img.jpeg"
    })
    @IsString()
    imgPath: string;
}