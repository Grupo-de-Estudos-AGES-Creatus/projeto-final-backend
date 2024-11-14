import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CardsService {
  async create(createCardDto: CreateCardDto) {
    return await prisma.cards.create({
      data: {
        id: createCardDto.id,
        title: createCardDto.title,
        description: createCardDto.description,
        url: createCardDto.url,
        image: createCardDto.image,
        isBlocked: createCardDto.isBlocked,
        material: {
          create: createCardDto.material?.map((mat) => ({
            name: mat.name,
            url: mat.url,
          })) || [],
        },
      },
    });
  }



  async findAll() {
    return await prisma.cards.findMany({
      include: {
        material: true,
      },
    });
  }

  async findOne(id: number) {
    return await prisma.cards.findUnique({
      where: { id },
      include: {
        material: true,
      },
    });
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    return await prisma.cards.update({
      where: { id },
      data: {
        title: updateCardDto.title,
        description: updateCardDto.description,
        image: updateCardDto.image,
        isBlocked: updateCardDto.isBlocked,
      },
    });
  }


  async remove(id: number) {
    return await prisma.cards.delete({
      where: { id },
    });
  }


}