import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { CardsModule } from './cards/cards.module';
import { MaterialModule } from './material/material.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { UserFormsModule } from './user_forms/user_forms.module';

@Module({
  imports: [UserModule, EventModule, CardsModule, MaterialModule, ProjectModule, AuthModule, UserFormsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}