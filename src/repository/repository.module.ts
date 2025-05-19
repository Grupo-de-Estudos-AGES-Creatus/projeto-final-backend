import { Module } from '@nestjs/common';
import { RepositoryController } from './repository.controller';
import { RepositoryService } from './repository.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RepositoryController],
  providers: [RepositoryService, PrismaService]
})

export class RepositoryModule {}
