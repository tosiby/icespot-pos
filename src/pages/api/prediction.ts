import { prisma } from "@/lib/prisma"

export default async function handler(req,res){
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(),1)

  const sales = await prisma.sale.findMany({
    where:{ createdAt:{ gte:start } }
  })

  const total = sales.reduce((sum,s)=>sum+s.totalAmount,0)
  const daysPassed = now.getDate()
  const daysInMonth = new Date(now.getFullYear(),now.getMonth()+1,0).getDate()

  const predicted = Math.round((total/daysPassed)*daysInMonth)

  res.json({current:total, predicted})
}
