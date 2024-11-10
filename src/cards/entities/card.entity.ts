import { Material } from '../../material/entities/material.entity';

export class Card {
    title: String;
    description?: String;
    img_url?: String;
    hidden: Boolean;
    material: Material[];
}