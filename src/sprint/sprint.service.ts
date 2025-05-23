import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateSprintDto } from "./dto/create-sprint.dto";
import { UpdateSprintDto } from "./dto/update-sprint.dto"
import { PrismaService } from "src/prisma.service";
import { createReadStream } from "fs";
import * as path from "path";

@Injectable()
export class SprintService {
    constructor(private prisma: PrismaService) {}

    // Retorna todas as sprints
    async findAll() {
        return await this.prisma.sprint.findMany();
    }

    // Retorna uma sprint pelo id
    async findOne(id: number) {
        // Verifica se existe
        const sprint = await this.prisma.sprint.findUnique({
            where: { 
                id : id 
            },
        });

        // Se não existir retorna um erro
        if (!sprint) throw new HttpException("Não existe uma sprint com esse id",  HttpStatus.NOT_FOUND)

        // Retorna a sprint
        return sprint;
    }

    // Retorna o arquivo readme
    async getFile(id: string) {
        const filePath = path.join(process.cwd(), `uploads/readme/README-${id}.md`)
        const fileStream = createReadStream(filePath);
        console.log("Arquivo devolvido com sucesso");
        return fileStream;
    }

    // Cria uma sprint
    async create (createSprintDto: CreateSprintDto){
        return await this.prisma.sprint.create({
            data: {
                ...createSprintDto,
            }
        });
    }

    // Atualiza uma sprint
    async update(id: number, updateSprintDto: UpdateSprintDto) {
        // Verifica se pelo menos uma informação foi passada, se não for retorna um erro
        if (!updateSprintDto.title && !updateSprintDto.isLocked && !updateSprintDto.description && !updateSprintDto.linkGithub && !updateSprintDto.semester) throw new HttpException("Precisa conter pelo menos uma informação!", HttpStatus.BAD_REQUEST) 
        
        // Verifica se existe
        const sprint = await this.prisma.sprint.findUnique({
            where: {
                id: id
            }
        }) 

        // Se não existir retorna um erro
        if (!sprint) throw new HttpException("Não existe uma sprint com esse id",  HttpStatus.NOT_FOUND)

        // Atualiza a sprint
        return await this.prisma.sprint.update({
            where: {
                id: id
            },
            data: {
                ...updateSprintDto,
            }
        });       
    }

    // Deleta uma sprint
    async remove(id: number) {
        // Verifica se existe
        const sprint = await this.prisma.sprint.findUnique({
            where: {
                id: id
            },
        });

        // Se não existir retorna um erro
        if (!sprint) throw new HttpException("Não existe uma sprint com esse id",  HttpStatus.NOT_FOUND)

        // Deleta a sprint
        await this.prisma.sprint.delete({
            where: {
                id: id
            },
        });
        
        // Retorna uma mensagem
        return "Sprint deletada!"
    }
}
