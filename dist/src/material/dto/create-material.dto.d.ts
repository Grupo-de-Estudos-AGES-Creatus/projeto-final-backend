import { Card } from "../../cards/entities/card.entity";
import { Content } from "../../content/entities/content.entity";
export declare class CreateMaterialDto {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly card: Card;
    readonly content: Content[];
}
