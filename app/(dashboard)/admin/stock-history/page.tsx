"use client"
import { useEffect, useState } from "react"

export default function StockHistoryPage() {
  const [data,setData] = useState([])

  useEffect(()=>{
    fetch("/api/stock/history")
      .then(res=>res.json())
      .then(setData)
  },[])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Stock History</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Date</th>
            <th className="p-2">Item</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Note</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row:any)=>(
            <tr key={row.id} className="border-t text-center">
              <td className="p-2">
                {new Date(row.createdAt).toLocaleString()}
              </td>
              <td className="p-2">{row.item.name}</td>
              <td className="p-2 text-green-600 font-bold">
                +{row.quantity}
              </td>
              <td className="p-2">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
