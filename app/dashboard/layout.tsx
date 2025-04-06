'use client'

import { Ubuntu } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
  Bell,
  Settings,
  LogOut,
  BadgeCheck,
  PlusCircle,
  List,
  QrCode
} from "lucide-react"

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className={cn("min-h-screen bg-gray-950", ubuntu.className)}>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-gray-900 border-b border-gray-800 shadow-[0_0_15px_rgba(247,147,26,0.1)] z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-white">
              <BadgeCheck className="inline text-[#F7931A] mr-2" />
              Badge <span className="text-[#F7931A]">Manager</span>
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn-navbar p-2 rounded-lg">
              <Bell className="h-5 w-5" />
            </button>
            <button className="btn-navbar p-2 rounded-lg">
              <Settings className="h-5 w-5" />
            </button>
            <button className="btn-navbar p-2 rounded-lg">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-16 flex"> {/* Offset for fixed navbar */}
        {/* Sidebar */}
        <aside className="w-64 fixed left-0 top-16 bottom-0 bg-gray-900 border-r border-gray-800 hidden lg:block">
          <div className="p-4">
            <nav className="space-y-2">
              <Link href="/dashboard" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md transition-colors">
                <BadgeCheck className="h-5 w-5 text-[#F7931A]" />
                <span>Dashboard</span>
              </Link>
              <Link href="/dashboard/badge/create" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md transition-colors">
                <PlusCircle className="h-5 w-5 text-[#F7931A]" />
                <span>Crear Badge</span>
              </Link>
              <Link href="/dashboard/badges" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md transition-colors">
                <List className="h-5 w-5 text-[#F7931A]" />
                <span>Listado de Badges</span>
              </Link>
              <Link href="/dashboard/badge/claim" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md transition-colors">
                <QrCode className="h-5 w-5 text-[#F7931A]" />
                <span>Dispenser de Badge</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-0 lg:ml-64 min-h-screen pb-20 pt-8">
          <div className="container mx-auto px-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}