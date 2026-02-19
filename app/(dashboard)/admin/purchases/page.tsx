import Link from "next/link"

export default function PurchasesHome(){
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Purchases</h1>

      <Link
        href="/admin/purchases/upload"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload Purchase Excel
      </Link>
    </div>
  )
}
