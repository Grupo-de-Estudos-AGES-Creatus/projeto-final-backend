import { Module } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { SprintController } from './sprint.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [SprintController],
    providers: [SprintService, PrismaService]
})

export class SprintModule {}
