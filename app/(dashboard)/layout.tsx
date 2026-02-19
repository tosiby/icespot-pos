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
          </>
        )}

        {user.role === "STAFF" && (
          <Link href="/staff">POS Billing</Link>
        )}
      </aside>

      <main className="flex-1 bg-gray-100">
        {children}
      </main>
    </div>
  )
}
