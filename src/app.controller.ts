import { Controller, Get, Param, ParseIntPipe, Post, Res, UploadedFile, UseInterceptors,} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
