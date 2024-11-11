import { Module } from '@nestjs/common';
import { UserFormsService } from './user_forms.service';
import { UserFormsController } from './user_forms.controller';

@Module({
  controllers: [UserFormsController],
  providers: [UserFormsService],
})
export class UserFormsModule {}
