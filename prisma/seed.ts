import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = {
        email: 'pedro@gmail.com',
        username: 'pedro',
        password: '12345',
        role: 'ADMIN',
        registration: "25199999-3",
        semester: "25/1,",        
        img_url: "https://avatars.githubusercontent.com/u/1?v=4",
        


    }
    const alice = await prisma.user.create({
        data: user
    })

}
main(); 