import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient, User } from '@prisma/client'
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

const prisma = new PrismaClient()

@Injectable()
export class UserService {
  // cria um usuario e criptografa a senha 
  async create(createUserDto: CreateUserDto) {
    const password = createUserDto.password;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    createUserDto.password = hash;

    return await prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
  }

  //retorna todos os usuarios  
  async findAll() {
    return await prisma.user.findMany();
  }

  //retorna um usuario de acordo com o id 
  async findOne(id: number) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }
  //verifica se o email está no db e se a senha condiz
  async findAndVerify(email: string, password: string) {
    const user = await prisma.user.findUnique({
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
    return await prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
 //remove um usuario do db
  async remove(id: number) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}
