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
import { SprintController } from './sprint/sprint.controller';
import { SprintService } from './sprint/sprint.service';

@Module({
  imports: [UserModule, EventModule, MaterialModule, CalendarModule],
  controllers: [AppController, CalendarController, SprintController],
  providers: [AppService, PrismaService, CalendarService, SprintService],
})
export class AppModule {}
