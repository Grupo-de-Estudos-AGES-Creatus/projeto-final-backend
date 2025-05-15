import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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
        const sprint = await prisma.sprint.findUnique({
            where: { 
                id : id 
            },
        });

        if (!sprint) {
            throw new HttpException("A sprint não existe",  HttpStatus.NOT_FOUND)
        }
        return await prisma.sprint.findUnique({
            where: { id : id },
        });
    }

    async update(id: number, updateSprintDto: UpdateSprintDto) {
        if (!updateSprintDto.descriptionPath && !updateSprintDto.title && !updateSprintDto.isLocked) throw new HttpException("Precisa conter pelo menos uma informação!", HttpStatus.BAD_REQUEST) 
        
            const sprint = await prisma.sprint.findUnique({
                where: {id : id}
            }) 

        if (!sprint) {
            throw new HttpException("Não existe sala com este Id ",  HttpStatus.BAD_REQUEST)
        }

        if (sprint) {
            return await prisma.sprint.update({
            where: { id : id },
            data: updateSprintDto,
            });
        }
        
    }

    async remove(id: number) {
        const sprint = await prisma.sprint.findUnique({
            where: { id : id },
        });

        if (!sprint) {
            throw new HttpException("A sprint não existe",  HttpStatus.NOT_FOUND)
        }

        if (sprint) {
            await prisma.sprint.delete({
            where: { id : id },
            });
            throw new HttpException("Sprint deletada", HttpStatus.NO_CONTENT)
        }
        
    }

}
