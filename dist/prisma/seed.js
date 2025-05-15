"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const user = {
        id: 0,
        email: 'leo@gmail.com',
        username: 'Leo',
        password: 'coco123',
        role: 'ADMIN',
        registration: "23200064",
        semester: "2025/1",
        createdAt: new Date(),
        imgPath: '',
        firstAcess: true,
    };
    const alice = await prisma.user.create({
        data: user
    });
}
main();
//# sourceMappingURL=seed.js.map