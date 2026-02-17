import 'dotenv/config'
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
  // Regular Scoops / Cups
  { name: 'Mango', category: 'REGULAR', price: 10, stock: 200, lowStockLevel: 20 },
  { name: 'Water Melon', category: 'REGULAR', price: 10, stock: 200, lowStockLevel: 20 },
  { name: 'Mosambi', category: 'REGULAR', price: 10, stock: 200, lowStockLevel: 20 },
  { name: 'Pine Apple', category: 'REGULAR', price: 10, stock: 200, lowStockLevel: 20 },
  { name: 'Orange', category: 'REGULAR', price: 15, stock: 200, lowStockLevel: 20 },
  { name: 'Mojito', category: 'REGULAR', price: 15, stock: 200, lowStockLevel: 20 },
  { name: 'Green Apple Small', category: 'REGULAR', price: 15, stock: 200, lowStockLevel: 20 },

  { name: 'Oreo', category: 'REGULAR', price: 20, stock: 200, lowStockLevel: 20 },
  { name: 'Chikku', category: 'REGULAR', price: 20, stock: 200, lowStockLevel: 20 },
  { name: 'Green Apple Large', category: 'REGULAR', price: 20, stock: 200, lowStockLevel: 20 },
  { name: 'Strawberry', category: 'REGULAR', price: 20, stock: 200, lowStockLevel: 20 },
  { name: 'Jack Fruit', category: 'REGULAR', price: 20, stock: 200, lowStockLevel: 20 },
  { name: 'White Guava', category: 'REGULAR', price: 20, stock: 200, lowStockLevel: 20 },
  { name: 'Avocado', category: 'REGULAR', price: 20, stock: 200, lowStockLevel: 20 },

  { name: 'Malai Kilfi', category: 'PREMIUM', price: 25, stock: 150, lowStockLevel: 15 },
  { name: 'Naruneendi', category: 'PREMIUM', price: 25, stock: 150, lowStockLevel: 15 },
  { name: 'Fig', category: 'PREMIUM', price: 25, stock: 150, lowStockLevel: 15 },
  { name: 'Semiya', category: 'PREMIUM', price: 30, stock: 150, lowStockLevel: 15 },

  { name: 'Tender Coconut', category: 'DELUXE', price: 35, stock: 150, lowStockLevel: 15 },
  { name: 'English Delight', category: 'DELUXE', price: 35, stock: 150, lowStockLevel: 15 },
  { name: 'Chocolate', category: 'DELUXE', price: 35, stock: 150, lowStockLevel: 15 },
  { name: 'Custard', category: 'DELUXE', price: 35, stock: 150, lowStockLevel: 15 },
  { name: 'Cold Coffee Small', category: 'DELUXE', price: 35, stock: 150, lowStockLevel: 15 },

  { name: 'Cold Coffee Large', category: 'DELUXE', price: 40, stock: 150, lowStockLevel: 15 },
  { name: 'Gulab', category: 'DELUXE', price: 40, stock: 150, lowStockLevel: 15 },
  { name: 'Palada', category: 'DELUXE', price: 40, stock: 150, lowStockLevel: 15 },

  { name: 'KitKat', category: 'SPECIAL', price: 50, stock: 120, lowStockLevel: 12 },
  { name: 'Red Velvet', category: 'SPECIAL', price: 50, stock: 120, lowStockLevel: 12 },
  { name: 'Rich Plum', category: 'SPECIAL', price: 50, stock: 120, lowStockLevel: 12 },
  { name: 'Snickers', category: 'SPECIAL', price: 50, stock: 120, lowStockLevel: 12 },

  { name: 'Lotus Biscoff', category: 'SIGNATURE', price: 55, stock: 120, lowStockLevel: 12 },
  { name: 'Blueberry', category: 'SIGNATURE', price: 55, stock: 120, lowStockLevel: 12 },
  { name: 'Alphonso Mango', category: 'SIGNATURE', price: 55, stock: 120, lowStockLevel: 12 },
  { name: 'Saffron', category: 'SIGNATURE', price: 60, stock: 120, lowStockLevel: 12 },

  // FAMILY PACK 1 LTR
  { name: 'Family Pack Jackfruit 1L', category: 'FAMILY_PACK', price: 360, stock: 50, lowStockLevel: 5 },
  { name: 'Family Pack Chikko 1L', category: 'FAMILY_PACK', price: 340, stock: 50, lowStockLevel: 5 },
  { name: 'Family Pack Strawberry 1L', category: 'FAMILY_PACK', price: 260, stock: 50, lowStockLevel: 5 },
  { name: 'Family Pack Avacado 1L', category: 'FAMILY_PACK', price: 430, stock: 50, lowStockLevel: 5 },
  { name: 'Family Pack Delite 1L', category: 'FAMILY_PACK', price: 380, stock: 50, lowStockLevel: 5 },
  { name: 'Family Pack Alphonso Mango 1L', category: 'FAMILY_PACK', price: 320, stock: 50, lowStockLevel: 5 }
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
