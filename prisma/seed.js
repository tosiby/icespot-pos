import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('password123', 10)

  // Admin user
  await prisma.user.upsert({
    where: { email: 'admin@icespot.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@icespot.com',
      password,
      role: 'ADMIN',
    },
  })

  // Staff user
  await prisma.user.upsert({
    where: { email: 'staff@icespot.com' },
    update: {},
    create: {
      name: 'Staff',
      email: 'staff@icespot.com',
      password,
      role: 'STAFF',
    },
  })

  // Sample items
  const items = [
    { name: 'Vanilla Cone', category: 'REGULAR', price: 40, stock: 100 },
    { name: 'Chocolate Cone', category: 'REGULAR', price: 50, stock: 100 },
    { name: 'Brownie Sundae', category: 'DELUXE', price: 120, stock: 50 },
    { name: 'Choco Blast', category: 'SIGNATURE', price: 140, stock: 50 },
  ]

  for (const item of items) {
    await prisma.item.create({ data: item })
  }

  console.log('Seed complete 🌱')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
