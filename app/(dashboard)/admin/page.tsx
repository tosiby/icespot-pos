"use client"
import { useEffect, useState } from "react"
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts"

export default function AdminDashboard() {

  const [data,setData] = useState<any>(null)

  useEffect(()=>{
    fetch("/api/reports/admin")
      .then(res=>res.json())
      .then(setData)
  },[])

  if(!data) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
<a
  href="/api/reports/export"
  className="bg-green-600 text-white px-4 py-2 rounded"
>
  Export Sales Excel
</a>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-4 gap-4">
        <Card title="Today Sales" value={`₹${data.today}`} />
        <Card title="Week Sales" value={`₹${data.week}`} />
        <Card title="Month Sales" value={`₹${data.month}`} />
        <Card title="Today's Bills" value={data.billCount} />
      </div>
{/* DAILY SALES CHART */}
<div className="bg-white p-4 rounded shadow">
  <h2 className="font-bold mb-3">Last 7 Days Sales</h2>

  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data.dailyChart}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="total" />
    </LineChart>
  </ResponsiveContainer>
</div>

      {/* PAYMENT SPLIT */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-3">Payment Split (Today)</h2>
        {data.paymentSplit.map((p:any)=>(
          <p key={p.paymentMode}>
            {p.paymentMode}: ₹{p._sum.totalAmount}
          </p>
        ))}
      </div>

      {/* TOP ITEMS */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-3">Top Selling Items</h2>
        {data.topItems.map((item:any)=>(
          <p key={item.itemId}>
            Item ID: {item.itemId} | Qty Sold: {item._sum.quantity}
          </p>
        ))}
      </div>

    </div>
  )
}

function Card({title,value}:{title:string,value:any}) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
