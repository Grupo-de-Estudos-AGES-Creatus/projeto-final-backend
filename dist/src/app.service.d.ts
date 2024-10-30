import { User } from '@prisma/client';
export declare class AppService {
    getHello(): Promise<User>;
    findUser(): Promise<{
        id: number;
        email: string;
        username: string;
        password: string;
        role: string;
        matricula: string;
        course: string | null;
        github: string | null;
        semester: string | null;
        n_of_absences: number | null;
        img_url: string | null;
        created_at: Date;
    }[]>;
}
