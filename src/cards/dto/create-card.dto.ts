import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCardDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    img_url: string;

    @IsBoolean()
    hidden: boolean;

    @IsOptional()
    @IsString()
    subtitle?: string;

    @IsArray()
    material: number[];

    constructor(
        title: string,
        description: string,
        img_url: string,
        hidden: boolean,
        subtitle?: string,
        material?: number[]
    ) {
        this.title = title;
        this.description = description;
        this.img_url = img_url;
        this.hidden = hidden;
        this.subtitle = subtitle;
        this.material = material || [];
    }
}
