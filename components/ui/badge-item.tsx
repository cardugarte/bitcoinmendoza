import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { BadgeCheck, Users, Tag } from "lucide-react"

interface BadgeItemProps {
  id: string
  title: string
  category: string
  claimCount: number
  isActive?: boolean
  className?: string
}

export function BadgeItem({
  id,
  title,
  category,
  claimCount,
  isActive = true,
  className,
}: BadgeItemProps) {
  return (
    <Card
      className={cn(
        "min-h-[250px] bg-black border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all",
        className
      )}
    >
      <div className="flex flex-col h-full">
        <Link href={`/dashboard/badge/${id}`} className="flex flex-col flex-grow h-full">
          <div className="flex items-center mb-4">
            <div className="bg-[#F7931A] text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
              <BadgeCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-white font-bold">{title}</h3>
              <div className="flex items-center text-gray-400 text-sm">
                <Tag className="h-3 w-3 mr-1" />
                <span>{category}</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm mt-1">
                <Users className="h-3 w-3 mr-1" />
                <span>{claimCount} reclamados</span>
              </div>
            </div>
          </div>
          <div className="flex-grow mb-4">
            <div className="relative w-full bg-gray-800 rounded-full h-2 mt-4">
              <div
                className="absolute top-0 left-0 h-2 rounded-full bg-[#F7931A]"
                style={{ width: `${Math.min(claimCount, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-400">0</span>
              <span className="text-xs text-gray-400">100</span>
            </div>
          </div>
          <div className="mt-auto pt-2">
            <button
              disabled={!isActive}
              className={cn(
                "w-full py-2 rounded-md transition duration-300 btn-primary",
                isActive
                  ? "bg-[#F7931A] hover:bg-[#E68A19] text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-white cursor-not-allowed"
              )}
            >
              {isActive ? "Ver Detalles" : "Badge Inactivo"}
            </button>
          </div>
        </Link>
      </div>
    </Card>
  )
} 