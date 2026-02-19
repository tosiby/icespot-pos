"use client"
import { useEffect, useState } from "react"

export default function LowStockPage() {
  const [items,setItems] = useState([])

  useEffect(()=>{
    fetch("/api/stock/low")
      .then(res=>res.json())
      .then(setItems)
  },[])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-red-600">
        Low Stock Items
      </h1>

      {items.length === 0 && (
        <p className="text-green-600 font-semibold">
          All stock levels are healthy ✅
        </p>
      )}

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-red-100">
          <tr>
            <th className="p-2">Item</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Minimum Level</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item:any)=>(
            <tr key={item.id} className="border-t text-center">
              <td className="p-2 font-semibold">{item.name}</td>
              <td className="p-2 text-red-600 font-bold">{item.stock}</td>
              <td className="p-2">{item.lowStockLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
