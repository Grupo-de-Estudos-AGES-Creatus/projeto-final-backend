import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Retorna todos os usuarios  
  async findAll() {
    return await this.prisma.user.findMany();
  }

  // Retorna um usuario de acordo com o id 
  async findOne(id: number) {
    // Verifica se existe
    const user = await this.prisma.user.findUnique({
      where: { 
        id: id 
      },
    })

    // Se não existir retorna um erro
    if (!user) throw new HttpException("Não existe um usuário com esse id",  HttpStatus.NOT_FOUND);

    // Retorna o usuário
    return user;
  }

  // Retorna todos os usuários de um semestre
  async findBySemester(semester: string) {
    // Verifica se existe algum usuário com o semestre
    const users = await this.prisma.user.findMany({
      where: {
        semester: semester
      }
    })

    // Se não existir retorna um erro
    if (!users) throw new HttpException("Não existe usuários associados ao semestre",  HttpStatus.NOT_FOUND);

    // Retorna os usuários
    return users;
  }

  // Cria um usuário 
  async create(createUserDto: CreateUserDto) {
    // Criptografa a senha
    const password = createUserDto.password;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    // Substitui a senha fornecida pela sua versão criptografada
    createUserDto.password = hash;

    // Cria o usuário
    return await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
  }

  // Atualiza um usuário
  async update(id: number, updateUserDto: UpdateUserDto) {
    // Verifica se pelo menos uma informação foi passada, se não for retorna um erro
    if (!updateUserDto.email && !updateUserDto.githubLink && !updateUserDto.password && !updateUserDto.registration && !updateUserDto.role && !updateUserDto.semester && !updateUserDto.username) throw new HttpException("Precisa conter pelo menos uma informação!", HttpStatus.BAD_REQUEST) 
    
    // Verifica se existe
    const user = await this.prisma.sprint.findUnique({
      where: {
        id: id
      }
    }) 

    // Se não existir retorna um erro
    if (!user) throw new HttpException("Não existe um usuário com esse id",  HttpStatus.NOT_FOUND)

    // Verifica se a uma nova senha foi inserida 
    if (updateUserDto.password) {
      // Criptografa a nova senha
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(updateUserDto.password, saltOrRounds);
      // Substitui a senha fornecida pela sua versão criptografada
      updateUserDto.password = hash;
    }

    // Atualiza o usuário
    return await this.prisma.user.update({
      where: { 
        id: id
      },
      data: updateUserDto,
    });
  }

 // Deleta um usuário
  async remove(id: number) {
    // Verifica se existe
    const user = await this.prisma.user.delete({
      where: { 
        id: id
      },
    });

    // Se não existir retorna um erro
    if (!user) throw new HttpException("Não existe um usuário com esse id", HttpStatus.NOT_FOUND);
    
    // Deleta o usuário
    await this.prisma.user.delete({
      where: { 
        id: id
      },
    });

    // Retorna uma mensagem
    return "Usuário deletado"
  }

  async findImage(id: number) {
      const user = await this.prisma.user.findUnique({
        where: { 
          id: id
        },
      })

      if (!user) {
        console.log(`Usuário de ID ${id} não encontrado.`);
        return null;
      }

      return user.imgPath;
  }

  async deleteImage(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { 
        id: id 
      },
    })
    
    if (user?.imgPath) {
      const imagePath = path.join(process.cwd(), 'uploads', user.imgPath); 

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Deleta o arquivo
        console.log(`Imagem deletada: ${imagePath}`);
      } else {
        console.log(`Imagem não encontrada em: ${imagePath}`);
      }

      await this.prisma.user.update({
        where: { id: id },
        data: { imgPath: null },
      });
    }
  }


  async saveImagePath(id: number, file: Express.Multer.File) {
    const fileName = `Photo-${id}${path.extname(file.originalname)}`;

    return await this.prisma.user.update({
      where: {id: id},
        data: {
          imgPath: fileName
        },
    });
    
  }

  async saveInUploadsImage(file: Express.Multer.File, id: number) {
      
    return new Promise((resolve, reject) => {
      const fileExt = path.extname(file.originalname);
      const allowedExtensions = ['.jpeg', '.jpg', '.png'];

      if (!allowedExtensions.includes(fileExt)) {
        return reject(new Error('Extensão de arquivo não permitida.'));
      }

      const destination = './uploads';
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
      }

      const fileName = `Photo-${id}${fileExt}`;
      const filePath = `${destination}/${fileName}`;

      fs.writeFile(filePath, file.buffer, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(filePath);
      });
    });
  };
}
