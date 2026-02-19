import { useEffect,useState } from "react"

export default function Stock(){
  const [items,setItems] = useState<any[]>([])

  useEffect(()=>{
    fetch("/api/items").then(r=>r.json()).then(setItems)
  },[])

  const addStock = async (id:number, qty:number)=>{
    await fetch("/api/add-stock",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({id,qty})
    })
    alert("Stock Updated")
  }

  return (
    <div style={{padding:40}}>
      <h1>Stock Entry 📦</h1>

      {items.map(i=>(
        <div key={i.id}>
          {i.name} — Stock: {i.stock}
          <input id={"qty"+i.id} placeholder="Add qty"/>
          <button onClick={()=>{
            const qty=(document.getElementById("qty"+i.id) as HTMLInputElement).value
            addStock(i.id, Number(qty))
          }}>
            Add Stock
          </button>
        </div>
      ))}
    </div>
  )
}
