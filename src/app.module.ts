import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { MaterialModule } from './material/material.module';
import { CalendarController } from './calendar/calendar.controller';
import { CalendarModule } from './calendar/calendar.module';
import { PrismaService } from './prisma.service';
import { CalendarService } from './calendar/calendar.service';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [UserModule, EventModule, MaterialModule, CalendarModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
