import { useState } from "react"
import { useRouter } from "next/router"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setError("")

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      return
    }

    // temporary session (local storage)
    localStorage.setItem("user", JSON.stringify(data))

    router.push("/dashboard")
  }

  return (
    <div style={{ display:"flex", height:"100vh", alignItems:"center", justifyContent:"center" }}>
      <form onSubmit={handleLogin} style={{ width:300 }}>
        <h1>Ice Spot Login</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{ width:"100%", padding:10, marginTop:10 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{ width:"100%", padding:10, marginTop:10 }}
        />

        {error && (
          <p style={{ color:"red" }}>{error}</p>
        )}

        <button style={{ width:"100%", padding:10, marginTop:10 }}>
          Login
        </button>
      </form>
    </div>
  )
}
