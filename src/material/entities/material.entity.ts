import { Content } from "src/content/entities/content.entity";
import {Card} from "../../cards/entities/card.entity";

export class Material {
    name: string;
    description: string;
    card: Card;
    content: Content[];
}