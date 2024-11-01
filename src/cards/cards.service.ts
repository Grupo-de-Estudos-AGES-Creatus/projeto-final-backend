import { Injectable } from '@nestjs/common';
import { Card } from '../cards/entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  private cards: Card[] =  []
  
  create(cardData: CreateCardDto) {
    
    const newCard = new Card(
      this.cards.length +1,
      cardData.title,
      cardData.description,
      cardData.img_url,
      cardData.hidden,
      cardData.subtitle || '',
      cardData.material
    );
    this.cards.push(newCard);
    return newCard;
  }

  findAll() {
    return this.cards;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
