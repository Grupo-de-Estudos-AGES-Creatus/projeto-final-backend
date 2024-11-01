import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    create(createCardDto: CreateCardDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCardDto: UpdateCardDto): string;
    remove(id: string): string;
}
