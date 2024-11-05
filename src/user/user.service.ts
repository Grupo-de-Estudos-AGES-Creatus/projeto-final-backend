import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient, User } from '@prisma/client'
import * as bcrypt from 'bcrypt';
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
        created_at: new Date(),
      },
    });
  }
  async findAll() {
    return await prisma.user.findMany();
  }
  async findOne(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
  async findAndVerify(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    const password=updateUserDto.password;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    updateUserDto.password=hash;
    return await prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}
