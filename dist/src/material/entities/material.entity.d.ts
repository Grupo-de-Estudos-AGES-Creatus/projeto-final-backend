import { Content } from "src/content/entities/content.entity";
import { Card } from "../../cards/entities/card.entity";
export declare class Material {
    card_id: number;
    name: string;
    description: string;
    card: Card;
    content: Content[];
}
