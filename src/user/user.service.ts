import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient, User } from '@prisma/client'
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

const prisma = new PrismaClient()

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const password=createUserDto.password;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    createUserDto.password=hash;

    return await prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
  }

  async findAll() {
    return await prisma.user.findMany();
  }

  async findOne(id: number) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

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

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password){
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(updateUserDto.password, saltOrRounds);
      updateUserDto.password = hash;
    }
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
