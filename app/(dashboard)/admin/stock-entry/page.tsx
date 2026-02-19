"use client"
import { useEffect, useState } from "react"

export default function StockEntryPage() {
  const [items, setItems] = useState([])
  const [itemId, setItemId] = useState("")
  const [qty, setQty] = useState("")
  const [note, setNote] = useState("")

  useEffect(() => {
    fetch("/api/items")
      .then(res => res.json())
      .then(setItems)
  }, [])

  async function submit(e:any) {
    e.preventDefault()

    await fetch("/api/stock", {
      method: "POST",
      body: JSON.stringify({
        itemId: Number(itemId),
        quantity: Number(qty),
        note
      })
    })

    alert("Stock updated!")
    setQty("")
    setNote("")
  }

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Stock Entry</h1>

      <form onSubmit={submit} className="space-y-4">

        <select
          className="border p-2 w-full"
          onChange={e => setItemId(e.target.value)}
        >
          <option>Select Item</option>
          {items.map((i:any) => (
            <option key={i.id} value={i.id}>
              {i.name} (Current stock: {i.stock})
            </option>
          ))}
        </select>

        <input
          placeholder="Quantity to add"
          className="border p-2 w-full"
          value={qty}
          onChange={e => setQty(e.target.value)}
        />

        <input
          placeholder="Note (optional)"
          className="border p-2 w-full"
          value={note}
          onChange={e => setNote(e.target.value)}
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Stock
        </button>
      </form>
    </div>
  )
}
