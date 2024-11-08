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
        index: createCardDto.index,
        title: createCardDto.title,
        description: createCardDto.description,
        url: createCardDto.url,
        image: createCardDto.image,
        isBlocked: createCardDto.isBlocked,
        subtitle: createCardDto.subtitle,
        material: {
          create: createCardDto.material?.map((mat) => ({
            name: mat.name,
            description: mat.description,
            content: {
              create: mat.content?.map((item) => ({
                type: item.type,
                title: item.title,
                url: item.url,
              })) || [],
            },
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
        index: updateCardDto.index,
        title: updateCardDto.title,
        description: updateCardDto.description,
        image: updateCardDto.image,
        isBlocked: updateCardDto.isBlocked,
        subtitle: updateCardDto.subtitle,
      },
    });
  }


  async remove(id: number) {
    return await prisma.cards.delete({
      where: { id },
    });
  }


}