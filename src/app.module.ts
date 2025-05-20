import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MaterialModule } from './material/material.module';
import { CalendarModule } from './calendar/calendar.module';
import { PrismaService } from '../prisma/prisma.service';
import { RepositoryModule } from './repository/repository.module';
import { SprintModule } from './sprint/sprint.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, MaterialModule, RepositoryModule, CalendarModule, SprintModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})

export class AppModule {}
