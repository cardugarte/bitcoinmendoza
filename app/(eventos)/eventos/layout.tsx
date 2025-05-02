import { Bitcoin, CalendarDays, PlusCircle, ListIcon } from "lucide-react"
import Link from "next/link"

export default function EventosLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative min-h-screen bg-gray-950">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-gray-900 border-b border-gray-800 shadow-[0_0_15px_rgba(247,147,26,0.1)] z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-white">
              <Bitcoin className="inline text-[#F7931A] mr-2" />
              Eventos <span className="text-[#F7931A]">Bitcoin Mendoza</span>
            </h1>
          </div>
        </div>
      </nav>

      <div className="pt-16 flex"> {/* Offset for fixed navbar */}
        {/* Sidebar */}
        <aside className="w-64 fixed left-0 top-16 bottom-0 bg-gray-900 border-r border-gray-800 hidden lg:block">
          <div className="p-4">
            <nav className="space-y-2">
              <Link href="/eventos" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md transition-colors">
                <CalendarDays className="h-5 w-5 text-[#F7931A]" />
                <span>Eventos</span>
              </Link>
              {/* <Link href="/eventos/crear" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md transition-colors">
                <PlusCircle className="h-5 w-5 text-[#F7931A]" />
                <span>Crear Evento</span>
              </Link>
              <Link href="/eventos/lista" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md transition-colors">
                <ListIcon className="h-5 w-5 text-[#F7931A]" />
                <span>Lista de Eventos</span>
              </Link> */}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-0 lg:ml-64 min-h-screen pb-20 pt-8">
          <div className="container mx-auto max-w-6xl px-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 