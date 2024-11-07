import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ProjectService {
  async create(createProjectDto: CreateProjectDto) {
    const {link,type,user_id} = createProjectDto
    const project = await prisma.project.create({
      data: {
        ...createProjectDto,
      }
    });

    return project;
  }

  async findAll() {
    const project = await prisma.project.findMany();
    return project;
    `This action returns all project`;
  }

  async findOne(link: string) {
    const project = await prisma.project.findUnique({
      where: { link: link },
    });
    return project;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
