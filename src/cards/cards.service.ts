import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaClient } from '@prisma/client';
import { CreateMaterialDto } from 'src/material/dto/create-material.dto';

const prisma = new PrismaClient();

@Injectable()
export class CardsService {
  async create(createCardDto: CreateCardDto) {
    return await prisma.cards.create({
      data: {
        title: createCardDto.title,
        description: createCardDto.description,
        img_url: createCardDto.img_url,
        hidden: createCardDto.hidden,
        subtitle: createCardDto.subtitle,
        material: {
          create: createCardDto.material, // assume que createCardDto.materials é uma lista de materiais
        },
      },
    });
  }

  async findAll() {
    return await prisma.cards.findMany({
      include: {
        material: true, // Inclui materiais associados
      },
    });
  }

  async findOne(id: number) {
    return await prisma.cards.findUnique({
      where: { id },
      include: {
        material: true, // Inclui materiais associados
      },
    });
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    return await prisma.cards.update({
      where: { id },
      data: {
        title: updateCardDto.title,
        description: updateCardDto.description,
        img_url: updateCardDto.img_url,
        hidden: updateCardDto.hidden,
        subtitle: updateCardDto.subtitle,
        material: {
          // Se você também quer atualizar materiais, você precisa definir como lidar com isso
          // Aqui, você poderia ter um array de materiais para atualizar ou deletar
          // Exemplo de atualizar materiais
          update: updateCardDto.material,
        },
      },
    });
  }

  async remove(id: number) {
    return await prisma.cards.delete({
      where: { id },
    });
  }

  async findMaterialsForCard(cardId: number) {
    return await prisma.material.findMany({
      where: { card_id: cardId },
    });
  }

  async addMaterialToCard(cardId: number, materialData: Omit<CreateMaterialDto, 'card_id'>) {
    return await prisma.material.create({
      data: {
        ...materialData,
        card_id: cardId,
      },
    });
  }

  async removeMaterialFromCard(materialId: number) {
    return await prisma.material.delete({
      where: { id: materialId },
    });
  }
}
