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
    return this.cards.find(card => card.id === id);
  }

  update(id: number, updateCardDto: UpdateCardDto): Card {
    const cardIndex = this.cards.findIndex(card => card.id === id);
    if (cardIndex <= 0) return undefined;

    const card = this.cards[cardIndex]
    this.cards[cardIndex] = {...card, ...updateCardDto}
    return this.cards[cardIndex]
  }

  remove(id: number): boolean{
    const initialLength = this.cards.length;
    this.cards = this.cards.filter(card => card.id != id)
    return this.cards.length < initialLength
  }
}
