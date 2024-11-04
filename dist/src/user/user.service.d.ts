import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
<<<<<<< HEAD
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
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
    }>;
    findAll(): Promise<{
        id: string;
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
    findOne(id: string): Promise<{
        id: string;
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
    }>;
    findAndVerify(email: string, password: string): Promise<{
        id: string;
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
    } | {
        error: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
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
    }>;
    remove(id: string): Promise<{
        id: string;
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
    }>;
=======
    create(createUserDto: CreateUserDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
>>>>>>> 6a6e30982d29ebf08d2e0689d34a645eba52320f
}
