import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // cria um usuario e criptografa a senha 
  async create(createUserDto: CreateUserDto) {
    const password = createUserDto.password;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    createUserDto.password = hash;

    return await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
  }

  //retorna todos os usuarios  
  async findAll() {
    return await this.prisma.user.findMany();
  }

  //retorna um usuario de acordo com o id 
  async findOne(id: number) {
    // Verifica se existe
    const user = await this.prisma.user.findUnique({
      where: { 
        id 
      },
    })

    // Se não existir retorna um erro
    if (!user) throw new HttpException("Não existe uma sprint com esse id",  HttpStatus.NOT_FOUND);

    return user;
  }
  //verifica se o email está no db e se a senha condiz
  async findAndVerify(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  //atualiza qualquer atributo do usuário. 
  //caso a senha seja fornecida no DTO, ela será criptografada antes de ser salva no banco de dados.
  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(updateUserDto.password, saltOrRounds);
      updateUserDto.password = hash;
    }
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async updateImg(id: number, imgLink : string)
  {
     return await this.prisma.user.update({
        where: { id },
        imgPath : imgLink,
     });
  }
  
 //remove um usuario do db
  async remove(id: number) {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');
    
    await this.prisma.user.delete({
      where: { id },
    });

    return "Usuário deletado"
  }
}
