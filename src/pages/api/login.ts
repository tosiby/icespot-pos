import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/prisma"
import bcrypt from "bcrypt"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { email, password } = req.body

  console.log("LOGIN BODY:", { email, password })

  const user = await prisma.user.findUnique({
    where: { email }
  })

  console.log("USER FROM DB:", user)

  if (!user) {
    console.log("❌ USER NOT FOUND")
    return res.status(401).json({ error: "Invalid credentials" })
  }

  console.log("PASSWORD HASH:", user.passwordHash)

  const valid = await bcrypt.compare(
    String(password),
    String(user.passwordHash)
  )

  console.log("BCRYPT RESULT:", valid)

  if (!valid) {
    console.log("❌ PASSWORD MISMATCH")
    return res.status(401).json({ error: "Invalid credentials" })
  }

  console.log("✅ LOGIN SUCCESS")

  localStorage.setItem("user", JSON.stringify(data))

if(data.role === "STAFF") router.push("/dashboard")
else if(data.role === "ADMIN") router.push("/admin")
else if(data.role === "SUPERADMIN") router.push("/superadmin")

}
