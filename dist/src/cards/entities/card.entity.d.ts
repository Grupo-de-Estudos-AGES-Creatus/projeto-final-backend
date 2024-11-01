import { Material } from '../../material/entities/material.entity';
export declare class Card {
    id: number;
    title: String;
    description: String;
    img_url: String;
    hidden: Boolean;
    subtitle: String;
    material: Material[];
    constructor(id: number, title: String, description: String, img_url: String, hidden: Boolean, subtitle: String, material: Material[]);
}
