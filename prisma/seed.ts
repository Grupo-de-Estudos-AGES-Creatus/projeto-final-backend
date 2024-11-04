import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

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
    }
    const alice = await prisma.user.create({
        data: user
    })

}
main();