"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsService = void 0;
const common_1 = require("@nestjs/common");
const card_entity_1 = require("../cards/entities/card.entity");
let CardsService = class CardsService {
    constructor() {
        this.cards = [];
    }
    create(cardData) {
        const newCard = new card_entity_1.Card(this.cards.length + 1, cardData.title, cardData.description, cardData.img_url, cardData.hidden, cardData.subtitle || '', cardData.material);
        this.cards.push(newCard);
        return newCard;
    }
    findAll() {
        return this.cards;
    }
    findOne(id) {
        return this.cards.find(card => card.id === id);
    }
    update(id, updateCardDto) {
        const cardIndex = this.cards.findIndex(card => card.id === id);
        if (cardIndex <= 0)
            return undefined;
        const card = this.cards[cardIndex];
        this.cards[cardIndex] = { ...card, ...updateCardDto };
        return this.cards[cardIndex];
    }
    remove(id) {
        const initialLength = this.cards.length;
        this.cards = this.cards.filter(card => card.id != id);
        return this.cards.length < initialLength;
    }
};
exports.CardsService = CardsService;
exports.CardsService = CardsService = __decorate([
    (0, common_1.Injectable)()
], CardsService);
//# sourceMappingURL=cards.service.js.map