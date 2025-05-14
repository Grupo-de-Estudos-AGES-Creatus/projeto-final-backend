import { PrismaClient, User } from '@prisma/client'
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function main() {
const password = await bcrypt.hash('admin123', 10); // Senha padrão

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {}, // se já existir, não faz nada
    create: {

    id: 0,  
    email: 'leo@gmail.com',
    username: 'Leo',
    password: 'coco123',
    role: 'ADMIN',
    registration: "23200064",
    img_url: "https://avatars.githubusercontent.com/u/1?v=4", 
    semester: "2025/1",
    firstAcess: true, 
    createdAt: new Date(), 
   
},
});

  console.log('✅ Usuário admin criado:', admin);

}

  

    

main()
  .catch(e => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  