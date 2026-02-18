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

  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)

    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    return res.status(200).json({
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Login failed" })
  }
}
