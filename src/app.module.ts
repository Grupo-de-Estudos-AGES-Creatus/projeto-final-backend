import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MaterialModule } from './material/material.module';
import { CalendarModule } from './calendar/calendar.module';
import { RepositoryModule } from './repository/repository.module';
import { SprintModule } from './sprint/sprint.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles/roles.guard';
import { JwtAuthGuard } from './auth/auth.guard';
import { PrismaService } from './prisma.service';


@Module({
  imports: [UserModule, MaterialModule, RepositoryModule, CalendarModule, SprintModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})

export class AppModule {}
