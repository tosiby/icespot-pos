import { useEffect,useState } from "react"

export default function SuperAdmin(){
  const [data,setData]=useState<any>(null)

  useEffect(()=>{
    fetch("/api/prediction").then(r=>r.json()).then(setData)
  },[])

  if(!data) return <h2>Loading...</h2>

  return (
    <div style={{padding:40}}>
      <h1>Super Admin 👑</h1>
      <h2>Current Month Sales: ₹{data.current}</h2>
      <h2>Predicted Month End: ₹{data.predicted}</h2>
    </div>
  )
}
