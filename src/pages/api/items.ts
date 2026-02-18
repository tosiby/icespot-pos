import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/prisma"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const items = await prisma.item.findMany({
    orderBy: { name: "asc" }
  })

  res.status(200).json(items)
}
