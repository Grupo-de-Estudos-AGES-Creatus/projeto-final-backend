import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { UpdateUserSelfDto } from './dto/update-user-selft.dto';
import { JwtPayload } from 'src/auth/auth-payload.interface';

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

  // Pega a imagem de um usuário
  async getImage(id: number) {
    const user = await this.prisma.user.findUnique({
        where: {
            id: id
        }
    })
    // Se o usuário não existir retorna um erro
    if (!user) throw new HttpException('Usuário inválido', HttpStatus.BAD_REQUEST)

    // Procura a imagem
    const [base, finalArquivo] = user.imgPath.split('.')
    let filePath = path.join(process.cwd(), `uploads/images/Photo-${id}.${finalArquivo}`)

    // Verifica se existe uma imagem própria, se não coloca uma padrão
    if (!fs.existsSync(filePath)) {
      filePath = path.join(process.cwd(), `uploads/fixo/avatar.png`);
    }

    // Retorna o caminho da imagem
    return filePath;
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
    const user = await this.prisma.user.findUnique({
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

  async updateSelf(id: number, updateUserSelfDto: UpdateUserSelfDto, currentUser: JwtPayload) {
    // Verifica se o id é igual ao do token
    if (id != currentUser.userId) throw new HttpException('Id não é igual', HttpStatus.FORBIDDEN);

    // Verifica se existe
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })

    // Se não existir retorna um erro
    if (!user) throw new HttpException("Não existe um usuário com esse id",  HttpStatus.NOT_FOUND);

    // Atualiza o usuário
    return await this.prisma.user.update({
      where: { 
        id: id
      },
      data: updateUserSelfDto,
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

  // Salva a imagem e 
  async newImage(id: number, file: Express.Multer.File, currentUser: JwtPayload) {
    // Verifica se o id é igual ao do token
    if (id != currentUser.userId && currentUser.role != 'admin') throw new HttpException('Id não é igual', HttpStatus.FORBIDDEN);

    // Verifica se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })

    // Se o usuário não existir retorna um erro
    if (!user) throw new HttpException('Usuário não existe', HttpStatus.BAD_REQUEST);

    // Extensões válidas e extensão do arquivo   
    const allowedExtensions = ['.jpeg', '.jpg', '.png'];
    const fileExt = path.extname(file.originalname);
    
    // Se o arquivo tiver outras extensões diz que é inválido 
    if (!allowedExtensions.includes(fileExt)) throw new HttpException('Extensão de arquivo não permitida.', HttpStatus.BAD_REQUEST);

    // Verifica se já existe uma imagem salva
    if (user.imgPath) {
      const imagePath = path.join(process.cwd(), 'uploads', user.imgPath); 

      // Verifica se existe no local e se existir deleta
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } 
    }

    // Configura o nome do arquivo 
    const fileName = `Photo-${id}${fileExt}`;

    // Atualiza na database
    await this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        imgPath: fileName
      }
    })

    // Acha o caminho do arquivo e salva ele
    const destination = path.join(process.cwd(), 'uploads/image');
    const filePath = `${destination}\\${fileName}`;
    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) throw new HttpException('Erro interno do servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    })

    // Retorna o caminho do arquivo
    return filePath;
  }
}
