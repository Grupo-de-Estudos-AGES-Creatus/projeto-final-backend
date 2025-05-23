import { Controller, Get, Param, ParseIntPipe, Post, Res, UploadedFile, UseInterceptors,} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user/image/:id')
  async getImage(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const filePath = await this.appService.getImage(id);
    return res.sendFile(filePath);
  }
}
