"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const user = {
<<<<<<< HEAD
        email: 'pedro@gmail.com',
        username: 'pedro',
        password: '12345',
        role: 'ADMIN',
        matricula: "24106875",
        course: "CC",
        github: "github.com/pedro",
        semester: "242",
        n_of_absences: 0,
=======
        id: 1,
        email: 'leo@gmail.com',
        username: 'Leo',
        password: 'coco123',
        role: 'ADMIN',
        matricula: "23200064",
        course: "ES",
        github: "github.com/leo",
        semester: "242",
        n_of_absences: 1,
>>>>>>> 6a6e30982d29ebf08d2e0689d34a645eba52320f
        img_url: "https://avatars.githubusercontent.com/u/1?v=4",
        created_at: new Date()
    };
    const alice = await prisma.user.create({
        data: user
    });
}
main();
//# sourceMappingURL=seed.js.map