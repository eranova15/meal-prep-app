import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/dashboard" className="flex items-center">
                <span className="text-xl font-bold">MealPrep</span>
              </Link>
              <div className="ml-10 flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="/dashboard/ingredients">
                  <Button variant="ghost">Ingredients</Button>
                </Link>
                <Link href="/dashboard/recipes">
                  <Button variant="ghost">Recipes</Button>
                </Link>
                <Link href="/dashboard/shopping-list">
                  <Button variant="ghost">Shopping List</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="outline">Profile</Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}