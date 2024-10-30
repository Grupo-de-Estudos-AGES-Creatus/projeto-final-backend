import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<User> {
    return await this.appService.getHello();
  }
}
