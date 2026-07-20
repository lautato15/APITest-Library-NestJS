import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(process.env.DATABASE_URL);
  await prisma.user.create({
    data: {
      name: 'admin',
      password: '1234',
    },
  });
}

main()
  .then(() => console.log('Usuario creado'))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
