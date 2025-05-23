import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export function ReadmeCreateOrEdit() {
  return FileInterceptor('file', {
    storage: 
        diskStorage({ destination: './uploads', filename: (req, file, callback) => {
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
        }
  });
}