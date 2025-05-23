import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) {}
    
    async getImage(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        }) 

        if (!user) throw new HttpException('Usuário inválido', HttpStatus.BAD_REQUEST);

        const [base, finalArquivo] = user.imgPath.split('.');

        const filePath = path.join(process.cwd(), `uploads/images/Photo-${id}.${finalArquivo}`)
        if (!fs.existsSync(filePath)) throw new HttpException('Arquivo readme não existe', HttpStatus.BAD_REQUEST)
        return filePath;
    }
}
