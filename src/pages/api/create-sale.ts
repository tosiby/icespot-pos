import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("💰 CREATE SALE API HIT")

  try {
    const { items, total, userId, paymentMode } = req.body

    const billNo = "BILL-" + Date.now()

    const sale = await prisma.sale.create({
  data: {
    billNumber: billNo,
    totalAmount: total,
    paymentMode,
    total,
    staffId: userId,

    items: {
      create: items.map((item:any)=>({
        itemId: item.id,
        qty: item.qty ?? 1,
        price: item.price
      }))
    }
  }
})

// ⭐ DEDUCT STOCK
for (const item of items) {
  await prisma.item.update({
    where: { id: item.id },
    data: {
      stock: { decrement: item.qty }
    }
  })
}


    console.log("✅ SALE CREATED:", sale)
    res.status(200).json(sale)

  } catch (err) {
    console.log("❌ CREATE SALE ERROR:", err)
    res.status(500).json({ error: "Failed to create sale" })
  }
}
