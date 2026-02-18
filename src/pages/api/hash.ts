import type { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const hash = await bcrypt.hash("admin123", 10)
  res.status(200).json({ hash })
}
