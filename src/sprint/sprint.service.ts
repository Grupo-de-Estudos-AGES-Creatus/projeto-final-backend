import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateSprintDto } from "./dto/create-sprint.dto";
import { UpdateSprintDto } from "./dto/update-sprint.dto"
import { PrismaService } from "src/prisma.service";

@Injectable()
export class SprintService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.sprint.findMany();
    }

    async findOne(id: number) {
        const sprint = await this.prisma.sprint.findUnique({
            where: { 
                id : id 
            },
        });

        if (!sprint) {
            throw new HttpException("Não existe uma sprint com esse id",  HttpStatus.NOT_FOUND)
        }

        return await this.prisma.sprint.findUnique({
            where: { 
                id: id 
            },
        });
    }

    async create (createSprintDto: CreateSprintDto){

        return await this.prisma.sprint.create({
            data: {
                ...createSprintDto,
            }
        });
    }

    async update(id: number, updateSprintDto: UpdateSprintDto) {
        if (!updateSprintDto.descriptionPath && !updateSprintDto.title && !updateSprintDto.isLocked) throw new HttpException("Precisa conter pelo menos uma informação!", HttpStatus.BAD_REQUEST) 
        
            const sprint = await this.prisma.sprint.findUnique({
                where: {
                    id: id
                }
            }) 

        if (!sprint) {
            throw new HttpException("Não existe uma sprint com esse id",  HttpStatus.NOT_FOUND)
        }

        
        return await this.prisma.sprint.update({
            where: {
                id: id
            },
            data: {
                ...updateSprintDto,
            }
        });       
    }

    async remove(id: number) {
        const sprint = await this.prisma.sprint.findUnique({
            where: {
                id: id
            },
        });

        if (!sprint) {
            throw new HttpException("Não existe uma sprint com esse id",  HttpStatus.NOT_FOUND)
        }

        await this.prisma.sprint.delete({
            where: {
                id: id
            },
        });
        
        return "Sprint deletada!"
    }

}
