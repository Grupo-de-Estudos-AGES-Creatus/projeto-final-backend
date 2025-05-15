import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        email: string;
        username: string;
        password: string;
        role: string;
        registration: string;
        imgPath: string | null;
        semester: string;
        firstAcess: boolean;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        email: string;
        username: string;
        password: string;
        role: string;
        registration: string;
        imgPath: string | null;
        semester: string;
        firstAcess: boolean;
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        email: string;
        username: string;
        password: string;
        role: string;
        registration: string;
        imgPath: string | null;
        semester: string;
        firstAcess: boolean;
        createdAt: Date;
    }>;
    findAndVerify(email: string, password: string): Promise<{
        id: number;
        email: string;
        username: string;
        password: string;
        role: string;
        registration: string;
        imgPath: string | null;
        semester: string;
        firstAcess: boolean;
        createdAt: Date;
    } | {
        error: string;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        email: string;
        username: string;
        password: string;
        role: string;
        registration: string;
        imgPath: string | null;
        semester: string;
        firstAcess: boolean;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        email: string;
        username: string;
        password: string;
        role: string;
        registration: string;
        imgPath: string | null;
        semester: string;
        firstAcess: boolean;
        createdAt: Date;
    }>;
}
