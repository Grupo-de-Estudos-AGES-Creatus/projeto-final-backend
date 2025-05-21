import { Controller, Get, Param, Post, UploadedFile, UseInterceptors,} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { dirname, extname } from 'path';
import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import path = require("path");


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('readme/:id')
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileExt = extname(file.originalname);
          const params = req.params.id
          const nameWoExt = "README"
          const fileName = `${nameWoExt}-${params}${fileExt}`;

          const allowedExtensions = ['.md'];
          if (!allowedExtensions.some(ext => fileName.endsWith(ext))) {
              return callback(new Error('Extensão de arquivo não permitida.'), fileName); 
          }
          callback(null, fileName);
        },
      }),
        fileFilter: (req, file, callback) => {
          if (file.mimetype === 'text/markdown') {
            callback(null, true);
          } else {
            callback(new Error('Only markdown files are allowed!'), false);
          }
        },
    }))
    public async uploadFile(
        @UploadedFile()
        file: Express.Multer.File){
        console.log(file);
        return file;
      }

      @Get('readme/:id')
      public async getFile(@Param('id') id: string){
        
        const filePath = path.join(__dirname, `./uploads/README-${id}`)
        const fileStream = createReadStream(filePath);
        return fileStream;
      }
      
      
    
}
