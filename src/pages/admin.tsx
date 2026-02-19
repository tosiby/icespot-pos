import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function Admin(){
  const router = useRouter()
  const [data,setData] = useState<any>(null)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user")||"{}")
    if(user.role !== "ADMIN" && user.role !== "SUPERADMIN")
      router.push("/login")

    fetch("/api/sales-today")
      .then(r=>r.json())
      .then(setData)
  },[])

  if(!data) return <h2 style={{padding:40}}>Loading Admin Dashboard...</h2>

  return (
    <div style={{padding:40}}>
      <h1>Admin Dashboard 📊</h1>

      <h2>Today Sales: ₹{data.totalSales}</h2>
      <h2>Total Bills: {data.totalBills}</h2>

      <button onClick={()=>router.push("/stock")}>
        📦 Stock Entry
      </button>
    </div>
  )
}
