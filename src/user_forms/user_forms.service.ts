import { Injectable } from '@nestjs/common';
import { CreateUserFormDto } from './dto/create-user_form.dto';
import { UpdateUserFormDto } from './dto/update-user_form.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UserFormsService {
  async create(createUserFormDto: CreateUserFormDto) {
    try {
      createUserFormDto = {
        ...createUserFormDto,
      }
      return await prisma.userForms.create({
        data: {
          ...createUserFormDto,
          register_at: new Date(),
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async findAll() {
    return await prisma.userForms.findMany();
  }

 async findOne(email: string) {  
  return await prisma.userForms.findUnique({
    where: {email},
  });
  }

  async update(email:string, updateUserFormDto: UpdateUserFormDto) {
    try {
      const verify = await this.findOne(email);
      if(verify == null){
        return "User not found"
      }else{
        return await prisma.userForms.update({
          where: {email},
          data: {
            ...updateUserFormDto,
          }
      });
    }
    } catch (error) {
      console.error(error);
    }
  }

  async remove(email: string) {
    return await prisma.userForms.delete({
      where: {email},
    });
  }
}
