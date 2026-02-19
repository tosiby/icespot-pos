"use client"
import { useEffect, useState } from "react"

export default function POSPage() {

  // MAIN STATES
  const [items, setItems] = useState<any[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState("")
  const [cart, setCart] = useState<any[]>([])

  // PAYMENT + RECEIPT STATES
  const [showPayment,setShowPayment] = useState(false)
  const [paymentMode,setPaymentMode] = useState("CASH")
  const [receipt,setReceipt] = useState<any>(null)

  // LOAD ITEMS
  useEffect(() => {
    fetch("/api/items")
      .then(res => res.json())
      .then(data => {
        setItems(data)
        const cats = [...new Set(data.map((i:any)=>i.category))]
        setCategories(cats)
        setActiveCategory(cats[0])
      })
  }, [])

  // ADD TO CART
  function addToCart(item:any){
    const exists = cart.find(c => c.id === item.id)
    if (exists) {
      setCart(cart.map(c =>
        c.id === item.id ? {...c, qty: c.qty + 1} : c
      ))
    } else {
      setCart([...cart, { ...item, qty: 1 }])
    }
  }

  // CHANGE QTY
  function changeQty(id:number, delta:number){
    setCart(cart.map(c => {
      if (c.id === id) {
        const newQty = c.qty + delta
        if (newQty <= 0) return null
        return { ...c, qty: newQty }
      }
      return c
    }).filter(Boolean))
  }

  const filteredItems = items.filter((i:any)=>i.category===activeCategory)
  const total = cart.reduce((sum,c)=> sum + c.price * c.qty, 0)

  // CREATE SALE
  async function createSale() {
    const payload = {
      items: cart.map(c => ({
        itemId: c.id,
        quantity: c.qty,
        price: c.price,
        name: c.name
      })),
      paymentMode,
      totalAmount: total
    }

    const res = await fetch("/api/sales", {
      method: "POST",
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error)
      return
    }

    // SET RECEIPT DATA
    setReceipt({
      ...data,
      items: cart,
      total,
      paymentMode
    })

    setCart([])
    setShowPayment(false)
  }

  // PRINT RECEIPT
  function printReceipt() {
    const printContent = document.getElementById("printable")!.innerHTML
    const win = window.open("", "", "width=400,height=600")
    win!.document.write(printContent)
    win!.document.close()
    win!.print()
  }

  return (
    <div className="flex h-[calc(100vh-70px)]">

      {/* LEFT SIDE ITEMS */}
      <div className="w-2/3 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">POS Billing</h1>

        {/* CATEGORY TABS */}
        <div className="flex gap-2 mb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={()=>setActiveCategory(cat)}
              className={`px-3 py-1 rounded ${
                cat===activeCategory
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ITEMS GRID */}
        <div className="grid grid-cols-4 gap-3">
          {filteredItems.map((item:any)=>(
            <div
              key={item.id}
              onClick={()=>addToCart(item)}
              className="bg-white shadow p-3 rounded cursor-pointer hover:bg-blue-50"
            >
              <p className="font-semibold">{item.name}</p>
              <p>₹{item.price}</p>
              <p className="text-xs text-gray-500">Stock: {item.stock}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE CART */}
      <div className="w-1/3 bg-white p-4 border-l flex flex-col">
        <h2 className="text-xl font-bold mb-4">Cart</h2>

        <div className="flex-1 overflow-y-auto space-y-2">
          {cart.map(item=>(
            <div key={item.id} className="flex justify-between border-b pb-2">
              <div>
                <p>{item.name}</p>
                <p>₹{item.price} x {item.qty}</p>
              </div>

              <div className="flex gap-2">
                <button onClick={()=>changeQty(item.id,-1)}>-</button>
                <button onClick={()=>changeQty(item.id,1)}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <p className="text-xl font-bold">Total: ₹{total}</p>
          <button
            onClick={()=>setShowPayment(true)}
            className="bg-green-600 text-white w-full mt-3 py-2 rounded"
          >
            Proceed to Pay
          </button>
        </div>
      </div>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-80 space-y-4">
            <h2 className="text-xl font-bold">Select Payment Mode</h2>

            <select
              className="border p-2 w-full"
              value={paymentMode}
              onChange={e=>setPaymentMode(e.target.value)}
            >
              <option value="CASH">Cash</option>
              <option value="UPI">UPI</option>
            </select>

            <button
              onClick={createSale}
              className="bg-green-600 text-white w-full py-2 rounded"
            >
              Confirm Payment
            </button>

            <button
              onClick={()=>setShowPayment(false)}
              className="w-full py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* RECEIPT POPUP */}
      {receipt && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div id="printable" className="bg-white p-6 w-80 font-mono text-sm">
            <h2 className="text-center font-bold">ICE SPOT</h2>
            <p className="text-center">Kurishumood Changanacherry</p>
            <hr className="my-2"/>

            <p>Bill No: {receipt.billNumber}</p>
            <p>Date: {new Date().toLocaleString()}</p>
            <p>Payment: {receipt.paymentMode}</p>

            <hr className="my-2"/>

            {receipt.items.map((i:any)=>(
              <div key={i.id} className="flex justify-between">
                <span>{i.name} x{i.qty}</span>
                <span>₹{i.price * i.qty}</span>
              </div>
            ))}

            <hr className="my-2"/>
            <p className="text-right font-bold">Total: ₹{receipt.total}</p>
            <p className="text-center mt-2">Thank you! 🍦</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={printReceipt}
                className="bg-blue-600 text-white px-3 py-1 rounded w-full"
              >
                Print
              </button>

              <button
                onClick={()=>setReceipt(null)}
                className="w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
