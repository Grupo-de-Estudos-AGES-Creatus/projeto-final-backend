import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AppService {
  async getHello(): Promise<User> {
    const users: User[] = await prisma.user.findMany();
    return users[0]

  }

  async findUser(){
    const users: User[] = await prisma.user.findMany();
    return users;
  }

  // async mergeStr(findUser()){
  //   var str =
}
