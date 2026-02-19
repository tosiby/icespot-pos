import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) redirect("/login")

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h1 className="text-2xl font-bold">ICE POS</h1>

        {user.role === "SUPERADMIN" && (
          <Link href="/superadmin">Dashboard</Link>
        )}

        {user.role === "ADMIN" && (
          <>
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/categories">Categories</Link>
            <Link href="/admin/products">Products</Link>
            <Link href="/admin/purchases">Purchases</Link>
<Link href="/admin/stock-entry">Stock Entry</Link>
<Link href="/admin/stock-history">Stock History</Link>
<Link href="/admin/low-stock">Low Stock</Link>

          </>
        )}

        {user.role === "STAFF" && (
          <Link href="/staff">POS Billing</Link>
        )}
      </aside>

<main className="flex-1 bg-gray-100">
  <div className="bg-white shadow p-4 flex justify-between">
    <div>
      <p className="font-semibold">Welcome, {user.name}</p>
      <p className="text-sm text-gray-500">{user.role}</p>
    </div>

    <form action="/api/logout" method="post">
      <button className="bg-red-500 text-white px-3 py-1 rounded">
        Logout
      </button>
    </form>
  </div>

  {children}
</main>

  )
}
