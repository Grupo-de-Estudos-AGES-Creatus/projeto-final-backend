import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateSprintDto } from "./dto/create-sprint.dto";
import { UpdateSprintDto } from "./dto/update-sprint.dto"
import { PrismaService } from "src/prisma.service";
import * as fs from 'fs';
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

    // Retorna uma sprint pelo id
    async findBySemester(semester: string) {
        // Verifica se existe
        const sprint = await this.prisma.sprint.findMany({
            where: { 
                semester: semester
            },
        });

        // Se não existir retorna um erro
        if (!sprint) throw new HttpException("Não existe uma sprint com esse semestre",  HttpStatus.NOT_FOUND)

        // Retorna a sprint
        return sprint;
    }

    // Retorna o caminho do arquivo readme
    async getFile(id: string) {
        const filePath = path.join(process.cwd(), `uploads/readme/README-${id}.md`)
        // Se não existir o arquivo retorna um erro
        if (!fs.existsSync(filePath)) throw new HttpException('Arquivo readme não existe', HttpStatus.BAD_REQUEST)
        return filePath;
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

    async newReadme(id: number, file: Express.Multer.File) {
       // Verifica se a sprint existe
        const sprint = await this.prisma.sprint.findUnique({
          where: {
            id: id
          }
        })
    
        // Se a sprint não existir retorna um erro
        if (!sprint) throw new HttpException('Sprint não existe', HttpStatus.BAD_REQUEST);
    
        // Extensões válidas e extensão do arquivo   
        const allowedExtensions = ['.md',];
        const fileExt = path.extname(file.originalname);
        
        // Se o arquivo tiver outras extensões diz que é inválido 
        if (!allowedExtensions.includes(fileExt)) throw new HttpException('Extensão de arquivo não permitida.', HttpStatus.BAD_REQUEST);
    
        // Verifica se já existe um readme salvo
        if (sprint.descriptionPath) {
          const readmePath = path.join(process.cwd(), sprint.descriptionPath); 
    
          // Verifica se existe no local e se existir deleta
          if (fs.existsSync(readmePath)) {
            fs.unlinkSync(readmePath);
          }
        }
    
        // Configura o nome do arquivo 
        const fileName = `README-${id}${fileExt}`;
    
        // Acha o caminho do arquivo e salva ele
        const destination = path.join(process.cwd(), 'uploads/readme');
        const filePath = `${destination}\\${fileName}`;

        // Atualiza na database
        await this.prisma.sprint.update({
          where: {
            id: id
          },
          data: {
            descriptionPath: `uploads/readme/${fileName}`
          }
        })

        fs.writeFile(filePath, file.buffer, (err) => {
          if (err) throw new HttpException('Erro interno do servidor', HttpStatus.INTERNAL_SERVER_ERROR);
        })
    
        // Retorna o caminho do arquivo
        return filePath;    
    }
}
