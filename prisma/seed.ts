import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user: User = {
        id: 1,
        email: 'aaa@gmail.com',
        username: 'aaa',
        password: '123',
        role: 'ADMIN',
        registration: "23200064",
        semester: "2025/1",
        createdAt: new Date(),
        imgPath: '',
        firstAcess: true,
    }
    const alice = await prisma.user.create({
        data: user
    })
}
main();