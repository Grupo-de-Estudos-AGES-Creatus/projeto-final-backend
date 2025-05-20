import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('coco123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'leo@gmail.com' },
    update: {},
    create: {
      email: 'leo@gmail.com',
      username: 'Leo',
      password: hashedPassword,
      role: 'ADMIN',
      registration: "23200064",
      semester: "2025/1",
      createdAt: new Date(),
      imgPath: '',
      githubLink: '',
      firstAcess: true,
    },
  });

  console.log('✅ Usuário criado:', user);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
