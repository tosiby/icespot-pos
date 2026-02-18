import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("📊 DASHBOARD ANALYTICS API HIT")

  try {
    const now = new Date()

    // Today range
    const startToday = new Date()
    startToday.setHours(0,0,0,0)

    const endToday = new Date()
    endToday.setHours(23,59,59,999)

    // Week range
    const startWeek = new Date()
    startWeek.setDate(now.getDate() - 7)

    // Month range
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    // Fetch all sales once
    const sales = await prisma.sale.findMany({
  include: {
    items: {
      include: { item:true }   // ⭐ join item table
    }
  }
})


    // ---- TODAY ----
    const todaySales = sales.filter(s =>
      new Date(s.createdAt) >= startToday &&
      new Date(s.createdAt) <= endToday
    )

    const todayTotal = todaySales.reduce((s,x)=>s+x.totalAmount,0)
    const todayBills = todaySales.length

    const cashTotal = todaySales
      .filter(s=>s.paymentMode==="CASH")
      .reduce((s,x)=>s+x.totalAmount,0)

    const upiTotal = todaySales
      .filter(s=>s.paymentMode==="UPI")
      .reduce((s,x)=>s+x.totalAmount,0)

    // ---- WEEK ----
    const weekSales = sales.filter(s => new Date(s.createdAt) >= startWeek)
    const weekTotal = weekSales.reduce((s,x)=>s+x.totalAmount,0)

    // ---- MONTH ----
    const monthSales = sales.filter(s => new Date(s.createdAt) >= startMonth)
    const monthTotal = monthSales.reduce((s,x)=>s+x.totalAmount,0)

    // ---- TOP ITEMS ----
    const itemCount:any = {}

sales.forEach(sale=>{
  sale.items.forEach(i=>{
    const name = i.item.name
    itemCount[name] = (itemCount[name] || 0) + i.qty
  })
})

const topItems = Object.entries(itemCount)
  .sort((a:any,b:any)=>b[1]-a[1])
  .slice(0,5)
// HOURLY SALES
const hourly:any = {}

todaySales.forEach(sale=>{
  const hour = new Date(sale.createdAt).getHours()
  hourly[hour] = (hourly[hour] || 0) + sale.totalAmount
})

const hourlySales = Object.entries(hourly).map(([hour,total])=>({
  hour: hour+":00",
  total
}))


    res.status(200).json({
      todayTotal,
      todayBills,
      cashTotal,
      upiTotal,
      weekTotal,
      monthTotal,
      topItems
    })

  } catch (err) {
    console.log("❌ ANALYTICS ERROR:", err)
    res.status(500).json({ error: "Analytics failed" })
  }
}
