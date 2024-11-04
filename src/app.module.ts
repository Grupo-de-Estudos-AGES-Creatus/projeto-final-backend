import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { CardsModule } from './cards/cards.module';
import { MaterialModule } from './material/material.module';
import { ContentModule } from './content/content.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, EventModule, CardsModule, MaterialModule, ContentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
''