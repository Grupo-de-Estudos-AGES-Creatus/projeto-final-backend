import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MaterialModule } from './material/material.module';
import { CalendarModule } from './calendar/calendar.module';
import { PrismaService } from './prisma.service';
import { ProjectModule } from './project/project.module';
import { SprintModule } from './sprint/sprint.module';

@Module({
  imports: [UserModule, MaterialModule, ProjectModule, CalendarModule, SprintModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})

export class AppModule {}
