import { BadgeItem } from "@/components/ui/badge-item"
import { SearchIcon, CalendarIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Dashboard() {
  // Mock badges data (in a real app, this would come from an API/database)
  const badges = [
    {
      id: "1",
      title: "Early Adopter",
      category: "Participación",
      claimCount: 42,
      isActive: true,
    },
    {
      id: "2",
      title: "Bitcoin Mendoza Meetup",
      category: "Eventos",
      claimCount: 85,
      isActive: true,
    },
    {
      id: "3",
      title: "Contribuidor",
      category: "Colaboración",
      claimCount: 16,
      isActive: true,
    },
    {
      id: "4",
      title: "Lightning Network Experto",
      category: "Educación",
      claimCount: 28,
      isActive: true,
    },
    {
      id: "5",
      title: "Bitcoin Pizza Day 2023",
      category: "Eventos",
      claimCount: 63,
      isActive: false,
    },
    {
      id: "6",
      title: "Embajador Bitcoin",
      category: "Reconocimiento",
      claimCount: 7,
      isActive: true,
    },
  ]

  return (
    <div>


      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <CalendarIcon className="h-8 w-8 text-[#F7931A] mr-3" />
          <h1 className="text-3xl font-bold text-white">Panel de Badges</h1>
        </div>
        <div className="relative w-64">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar badges..."
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <BadgeItem
            key={badge.id}
            id={badge.id}
            title={badge.title}
            category={badge.category}
            claimCount={badge.claimCount}
            isActive={badge.isActive}
          />
        ))}
      </div>
    </div>
  )
} 