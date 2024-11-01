export declare class CreateCardDto {
    title: string;
    description: string;
    img_url: string;
    hidden: boolean;
    subtitle?: string;
    material: number[];
    constructor(title: string, description: string, img_url: string, hidden: boolean, subtitle?: string, material?: number[]);
}
