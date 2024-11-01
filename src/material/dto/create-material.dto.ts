import {Card} from "../../cards/entities/card.entity";

export class CreateMaterialDto {
    readonly name: string;
    readonly description: string;
    readonly cardId: number;
    readonly card: Card;
}
