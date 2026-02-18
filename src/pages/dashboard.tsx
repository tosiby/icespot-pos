import { useEffect, useState } from "react"
import { useRouter } from "next/router"

type Item = {
  id: number
  name: string
  price: number
  category: string
  isActive: boolean
}

type CartItem = Item & { qty:number }
console.log("🔥 NEW PRINT RECEIPT ACTIVE")

export default function Dashboard() {
  const router = useRouter()
  const [items, setItems] = useState<Item[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [category, setCategory] = useState("REGULAR")
const logo = "/logo.png"

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) router.push("/login")
  }, [])

  useEffect(() => {
    fetch("/api/items").then(r=>r.json()).then(setItems)
  }, [])

  // ADD TO CART
  const addToCart = (item:Item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if(existing) return prev.map(i => i.id===item.id ? {...i, qty:i.qty+1} : i)
      return [...prev, {...item, qty:1}]
    })
  }

  const increaseQty = (id:number) =>
    setCart(prev => prev.map(i => i.id===id ? {...i, qty:i.qty+1} : i))

  const decreaseQty = (id:number) =>
    setCart(prev => prev
      .map(i => i.id===id ? {...i, qty:i.qty-1} : i)
      .filter(i => i.qty>0)
    )

  const total = cart.reduce((sum,i)=> sum + i.price*i.qty,0)

  const categories = [...new Set(items.map(i=>i.category))]
  const filtered = items.filter(i=> i.category===category && i.isActive)

const printReceipt = (mode:string) => {
  console.log("🔥 NEW PRINT RECEIPT ACTIVE") // DEBUG PROOF

  const now = new Date()
  const date = now.toLocaleString()
  const txn = "TXN" + Date.now()

  const logo = window.location.origin + "/logo.png"


  const html = `
  <html>
  <head>
    <style>
      @page { margin:0 }
      body{
        font-family: monospace;
        width:260px;
        padding:10px;
      }
      hr{ border-top:1px dashed #000 }
      .row{ display:flex; justify-content:space-between }
    </style>
  </head>

  <body>
    <center>
      <img src="${logo}" width="70"/><br/>
      <b>ICE SPOT</b><br/>
      Kurishumood, Changanacherry
    </center>

    <hr/>
    Date: ${date}<br/>
    Bill No: ${txn}<br/>
    Payment: ${mode}
    <hr/>

    ${cart.map(i=>`
      <div class="row">
        <span>${i.name} x${i.qty}</span>
        <span>₹${i.price*i.qty}</span>
      </div>
    `).join("")}

    <hr/>
    <b>Total: ₹${total}</b>
    <hr/>
    <center>Thank You ❤️</center>
  </body>
  </html>
  `

  const win = window.open("", "_blank", "width=300,height=650")
  win!.document.write(html)
  win!.document.close()
  win!.focus()

  setTimeout(()=>{
    win!.print()
    win!.close()
  },500)
}

  // 💰 PAYMENT (FINAL FIX ADDED)
  const pay = async (mode:string) => {
    if(cart.length===0) return alert("Cart empty")

    const user = JSON.parse(localStorage.getItem("user")||"{}")

    await fetch("/api/create-sale",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({
        items: cart,
        total,
        userId: user.id,
        paymentMode: mode   // ⭐ IMPORTANT FIX
      })
    })

    printReceipt(mode)
    setCart([])
  }

 return (
  <div style={{ height:"100vh", display:"flex", flexDirection:"column" }}>

    {/* 🔝 POS HEADER */}
    <div style={{
      display:"flex",
      alignItems:"center",
      gap:15,
      padding:"12px 20px",
      background:"#111",
      color:"#fff"
    }}>
      <img src="/logo.png" width={50} />
      <div>
        <div style={{fontSize:22, fontWeight:"bold"}}>
          ICE SPOT
        </div>
        <div style={{fontSize:13, opacity:0.8}}>
          Kurishumood, Changanacherry
        </div>
      </div>
    </div>

    {/* MAIN POS AREA */}
    <div style={{ display:"flex", flex:1 }}>

      
      {/* MENU */}
      <div style={{ flex:1, padding:20 }}>
        <h2>Menu 🍦</h2>

        <button onClick={()=>router.push("/report")}
          style={{marginBottom:10,padding:8}}>
          📊 View Today Report
        </button>

        {categories.map(cat=>(
          <button key={cat} onClick={()=>setCategory(cat)}
            style={{marginRight:10,padding:"8px 14px",
            background:cat===category?"#333":"#eee",
            color:cat===category?"#fff":"#000",
            borderRadius:20,border:"none"}}>
            {cat}
          </button>
        ))}

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginTop:20}}>
          {filtered.map(item=>(
            <button key={item.id} onClick={()=>addToCart(item)}
              style={{padding:15,background:"#f3f3f3",borderRadius:10}}>
              {item.name}<br/>₹{item.price}
            </button>
          ))}
        </div>
      </div>

      {/* CART */}
      <div style={{ width:330,padding:20,borderLeft:"1px solid #ddd" }}>
        <h2>Cart 🧾</h2>

        {cart.map(i=>(
          <div key={i.id} style={{marginBottom:8}}>
            {i.name}
            <div>
              <button onClick={()=>decreaseQty(i.id)}>-</button>
              <b> {i.qty} </b>
              <button onClick={()=>increaseQty(i.id)}>+</button>
              = ₹{i.price*i.qty}
            </div>
          </div>
        ))}

        <hr/>
        <h2>Total: ₹{total}</h2>

        <button onClick={()=>pay("CASH")}
          style={{width:"100%",padding:12,background:"green",color:"#fff",marginTop:10}}>
          PAY CASH 💵
        </button>

        <button onClick={()=>pay("UPI")}
          style={{width:"100%",padding:12,background:"purple",color:"#fff",marginTop:10}}>
          PAY UPI 📱
        </button>
      </div>
    </div>
</div>
  )
}
