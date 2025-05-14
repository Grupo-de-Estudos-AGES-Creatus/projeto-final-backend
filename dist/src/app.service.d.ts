import { User } from '@prisma/client';
export declare class AppService {
    getHello(): Promise<User>;
    findUser(): Promise<{
        id: number;
        email: string;
        username: string;
        password: string;
        role: string;
        registration: string;
        img_url: string | null;
        semester: string;
        firstAcess: boolean;
        createdAt: Date;
    }[]>;
}
