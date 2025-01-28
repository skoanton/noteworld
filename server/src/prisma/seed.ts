import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const defaultEmail = "admin@mail.com";
  const defaultPassword = "root";
  const emailUser = process.env.ADMIN_EMAIL || defaultEmail;
  const password = process.env.ADMIN_PASSWORD || defaultPassword;

  // Kolla om användaren redan finns
  const existingUser = await prisma.user.findUnique({
    where: { email: emailUser },
  });

  if (!existingUser) {
    const hashedPassword = await bcryptjs.hash(password, 10);
    await prisma.user.create({
      data: {
        email: emailUser,
        password: hashedPassword,
        role: 'ADMIN', // Byt till rätt roll om det behövs
      },
    });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
