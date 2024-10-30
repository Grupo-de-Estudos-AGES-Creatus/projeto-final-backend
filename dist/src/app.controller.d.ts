import { AppService } from './app.service';
import { User } from '@prisma/client';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): Promise<User>;
}
