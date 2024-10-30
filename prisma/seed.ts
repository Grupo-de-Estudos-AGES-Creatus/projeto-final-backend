import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user: User = {
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
        img_url: "https://avatars.githubusercontent.com/u/1?v=4",
        created_at: new Date()
    }
    const alice = await prisma.user.create({
        data: user
    })

}
main();