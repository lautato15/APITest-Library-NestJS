import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.book.createMany({
    data: [
      {
        title: 'El Mundo de Sofía',
        author: 'Jostein Gaarder',
        available: true,
      },
      {
        title: 'El Principito',
        author: 'Antoine de Saint-Exupéry',
        available: true,
      },
      {
        title: 'Cien Años de Soledad',
        author: 'Gabriel García Márquez',
        available: true,
      },
      {
        title: '1984',
        author: 'George Orwell',
        available: true,
      },
      {
        title: 'Don Quijote de la Mancha',
        author: 'Miguel de Cervantes',
        available: true,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log('EL ERROR');
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
