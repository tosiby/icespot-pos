import { prisma } from "@/lib/prisma"
export default async function handler(req,res){
  const {id,qty} = req.body

  await prisma.item.update({
    where:{id},
    data:{ stock:{ increment: qty } }
  })

  res.json({ok:true})
}
