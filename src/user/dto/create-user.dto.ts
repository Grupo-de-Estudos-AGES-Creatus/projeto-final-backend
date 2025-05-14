export class CreateUserDto {
    email:        string;
    username:     string;
    password:     string;
    role:         string;
    registration: string;
    semester?:    string;
    img_url?:     string;
}
