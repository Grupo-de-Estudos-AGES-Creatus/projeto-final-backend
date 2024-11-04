"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const user = {
        email: 'pedro@gmail.com',
        username: 'pedro',
        password: '12345',
        role: 'ADMIN',
        matricula: "24106875",
        course: "CC",
        github: "github.com/pedro",
        semester: "242",
        n_of_absences: 0,
        img_url: "https://avatars.githubusercontent.com/u/1?v=4",
        created_at: new Date(),
    };
    const alice = await prisma.user.create({
        data: user
    });
}
main();
//# sourceMappingURL=seed.js.map