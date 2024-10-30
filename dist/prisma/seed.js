"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const User = {
        id: 1,
        email: "leo@gmail.com",
        username: "Leo",
        password: "coco123",
        role: "ADMIN",
        matricula: "123456",
        course: "ES",
        github: "github.com/leo",
        semester: "24/2",
        n_of_absences: 0,
        img_url: "https://avatars.githubusercontent.com/u/1?v=4",
        created_at: new Date(),
    };
    await prisma.user.createMany({
        data: [
            User
        ]
    });
}
main();
//# sourceMappingURL=seed.js.map