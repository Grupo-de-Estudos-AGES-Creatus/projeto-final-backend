import { Controller} from '@nestjs/common';
import { AppService } from './app.service';
import {
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
          callback(null, fileName);
          
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
}
