import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({
    where: {
      email: "leo@gmail.com"
    }
  })
  await prisma.user.deleteMany({
    where: {
      email: "leo2@gmail.com"
    }
  })

  const hashedPassword1 = await bcrypt.hash('leo123', 10);

  const hashedPassword2 = await bcrypt.hash('leo12', 10);

  const user = await prisma.user.upsert({
    where: { email: 'leo@gmail.com' },
    update: {},
    create: {
      email: 'leo@gmail.com',
      username: 'Leo',
      password: hashedPassword1,
      role: 'admin',
      registration: "23200064",
      semester: "2025/1",
      createdAt: new Date(),
      imgPath: '',
      githubLink: '',
      firstAcess: true,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'leo2@gmail.com' },
    update: {},
    create: {
      email: 'leo2@gmail.com',
      username: 'Leo',
      password: hashedPassword2,
      role: 'student',
      registration: "23200062",
      semester: "2025/1",
      createdAt: new Date(),
      imgPath: '',
      githubLink: '',
      firstAcess: true,
    },
  });

  console.log('✅ Usuário criado:', user, user2);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
