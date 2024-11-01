import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    create(createCardDto: CreateCardDto): Card;
    findAll(): Card[];
    findOne(id: string): Card;
    update(id: string, updateCardDto: UpdateCardDto): Card;
    remove(id: string): boolean;
}
