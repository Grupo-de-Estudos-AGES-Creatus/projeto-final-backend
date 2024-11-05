import { Injectable } from '@nestjs/common';
import { Content, PrismaClient } from '@prisma/client';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
const prisma = new PrismaClient()
@Injectable()
export class ContentService {
  async create(createContentDto: CreateContentDto) {

    const content = await prisma.content.create(
      {
        data: {
          ...createContentDto
        } as Content
      }
    );
    return content;
  }

  async findAll() {
    const content = await prisma.content.findMany();

    if(content.length === 0){
      throw new Error("No contents registered!");
    }
    return content;
  }

  async findOne(id: string) {
    const content = await prisma.content.findUnique({where: {id: Number(id)}});

    if(!content){
      throw new Error("This content doesn't exists!");
    }
    return content;
  }

  async update(id: string, updateContentDto: UpdateContentDto) {
    const content = await prisma.content.update({
      where: {
        id: Number(id)
      },
      data: {
        ...updateContentDto,
      } as Content
    })

    if(!content){
      throw new Error("This content doesn't exists!")
    }
    return content;
  }

  async remove(id: string) {
    const content = await prisma.content.delete({where: {id: Number(id)}});

    if(!content){
      throw new Error("This content doesn't exists!");
    }
    return content;
  }
}
