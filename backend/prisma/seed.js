import bcrypt from 'bcryptjs';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@icespot.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@icespot.com',
      passwordHash,
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'staff@icespot.com' },
    update: {},
    create: {
      name: 'Counter Staff',
      email: 'staff@icespot.com',
      passwordHash,
      role: 'STAFF',
    },
  });

  const items = [
    { name: 'Vanilla Cone', category: 'CONE', price: 40, stock: 80, lowStockLevel: 15 },
    { name: 'Chocolate Cone', category: 'CONE', price: 50, stock: 70, lowStockLevel: 12 },
    { name: 'Strawberry Cup', category: 'CUP', price: 60, stock: 60, lowStockLevel: 10 },
    { name: 'Mango Cup', category: 'CUP', price: 65, stock: 50, lowStockLevel: 10 },
    { name: 'Brownie Sundae', category: 'SUNDAE', price: 120, stock: 40, lowStockLevel: 8 },
    { name: 'Choco Blast Sundae', category: 'SUNDAE', price: 140, stock: 35, lowStockLevel: 7 }
  ];

  for (const [index, item] of items.entries()) {
    await prisma.item.upsert({
      where: { id: index + 1 },
      update: item,
      create: item,
    });
  }

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
