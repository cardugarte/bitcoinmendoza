'use client'

import { Ubuntu } from 'next/font/google'
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Bell,
  Settings,
  LogOut
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
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn("min-h-screen bg-gray-950", ubuntu.className)}>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-gray-900 border-b border-gray-800 shadow-[0_0_15px_rgba(247,147,26,0.1)] z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-white">
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

      {/* Main Content */}
      <div className="pt-16"> {/* Offset for fixed navbar */}
        <div className="container mx-auto p-4">
          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-min">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}