"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")

  async function handleLogin(e:any){
    e.preventDefault()

    const res = await fetch("/api/login",{
      method:"POST",
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if(!res.ok){
      setError(data.error)
      return
    }

    if(data.role === "SUPERADMIN") router.push("/superadmin")
    if(data.role === "ADMIN") router.push("/admin")
    if(data.role === "STAFF") router.push("/staff")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h1 className="text-2xl font-bold text-center">ICE POS Login</h1>

        <input
          placeholder="Email"
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  )
}
