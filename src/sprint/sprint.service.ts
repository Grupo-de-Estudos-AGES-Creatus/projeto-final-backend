import { Injectable } from "@nestjs/common";
import { PrismaClient } from '@prisma/client'
import { CreateSprintDto } from "./dto/create-sprint.dto";
import { UpdateSprintDto } from "./dto/update-sprint.dto"
const prisma = new PrismaClient()



@Injectable()
export class SprintService {
    async create (createSprintDto: CreateSprintDto){
        return await prisma.sprint.create({
        data: {
            ...createSprintDto,
            createdAt: new Date(),
            }as any
        });
    }
    async findAll() {
        return await prisma.sprint.findMany();
    }

    async findOne(id: number) {
        return await prisma.sprint.findUnique({
            where: { id },
        });
    }

    async update(id: number, updateUserDto: UpdateSprintDto) {
        return await prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    async remove(id: number) {
        return await prisma.user.delete({
            where: { id },
        });
    }

}
