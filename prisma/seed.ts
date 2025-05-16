import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user: User = {
        id: 0,
        email: 'leo@gmail.com',
        username: 'Leo',
        password: 'coco123',
        role: 'ADMIN',
        registration: "23200064",
        semester: "2025/1",
        createdAt: new Date(),
        imgPath: '',
        githubLink: '',
        firstAcess: true,
    }
    const alice = await prisma.user.create({
        data: user
    })
}
main();
