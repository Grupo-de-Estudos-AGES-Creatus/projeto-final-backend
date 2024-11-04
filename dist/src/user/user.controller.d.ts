import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
<<<<<<< HEAD
import { VerifyUserDto } from './dto/verify-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
    findAndVerify(verifyUserDto: VerifyUserDto): Promise<{
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
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
>>>>>>> 6a6e30982d29ebf08d2e0689d34a645eba52320f
}
