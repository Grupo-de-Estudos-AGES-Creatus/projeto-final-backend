import { Card } from '../cards/entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
export declare class CardsService {
    private cards;
    create(cardData: CreateCardDto): Card;
    findAll(): Card[];
    findOne(id: number): Card;
    update(id: number, updateCardDto: UpdateCardDto): Card;
    remove(id: number): boolean;
}
