import { useEffect, useState } from "react"
import jsPDF from "jspdf"

import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip
} from "recharts"

export default function Report() {
  const [data,setData] = useState<any>()

  useEffect(()=>{
    fetch("/api/sales-today")
      .then(r=>r.json())
      .then(setData)
  },[])

  if(!data) return <h2 style={{padding:40}}>Loading dashboard...</h2>

  const paymentData = [
    { name:"Cash", value:data.cashTotal },
    { name:"UPI", value:data.upiTotal }
  ]

  const salesData = [
    { name:"Week", sales:data.weekTotal },
    { name:"Month", sales:data.monthTotal }
  ]
const exportPDF = () => {
  const doc = new jsPDF()

  let y = 20

  doc.setFontSize(16)
  doc.text("ICE SPOT DAILY REPORT", 20, y)

  y += 15
  doc.setFontSize(12)

  doc.text(`Today Sales: Rs ${data.todayTotal}`, 20, y); y+=10
  doc.text(`Total Bills: ${data.todayBills}`, 20, y); y+=10
  doc.text(`Cash Sales: Rs ${data.cashTotal}`, 20, y); y+=10
  doc.text(`UPI Sales: Rs ${data.upiTotal}`, 20, y); y+=20

  doc.text("Top Selling Items:", 20, y); y+=10

  data.topItems.forEach((item:any) => {
    doc.text(`${item[0]} - Sold ${item[1]}`, 20, y)
    y += 8
  })

  doc.save("IceSpot_Daily_Report.pdf")
}


  const topItemsData = data.topItems.map((i:any)=>({
  name: i[0],   // real item name
  sold: i[1]
}))


  return (
    <div style={{padding:40}}>
      <h1>📊 Ice Spot Owner Dashboard</h1>
<button onClick={exportPDF}>⬇ Export PDF</button>

      <h2>Today Summary</h2>
      <p>Total Sales: ₹{data.todayTotal}</p>
      <p>Total Bills: {data.todayBills}</p>

      <hr/>

      <h2>Payment Split</h2>
      <PieChart width={300} height={250}>
        <Pie data={paymentData} dataKey="value" outerRadius={100}>
          <Cell fill="#00C49F"/>
          <Cell fill="#8884d8"/>
        </Pie>
        <Tooltip/>
      </PieChart>

      <hr/>

      <h2>Weekly vs Monthly Sales</h2>
      <BarChart width={400} height={250} data={salesData}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Bar dataKey="sales" fill="#82ca9d"/>
      </BarChart>

      <hr/>

      <h2>Top Selling Items 🍦</h2>
<ul>
  {data.topItems.map((i:any)=>(
    <li key={i[0]}>
      {i[0]} — Sold {i[1]}
    </li>
  ))}
</ul>


    </div>
  )
}
