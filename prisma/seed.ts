import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = {
        email: 'pedro@gmail.com',
        username: 'pedro',
        password: '12345',
        role: 'ADMIN',
        registration: "25199999-3",
        img_url: "https://avatars.githubusercontent.com/u/1?v=4",
        semester: "25/1,",        
        created_at: new Date(),


    }
    const alice = await prisma.user.create({
        data: user
    })

}
main();