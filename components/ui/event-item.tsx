import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Calendar, MapPin, Clock } from "lucide-react"

interface EventItemProps {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  day: number
  month?: string
  isActive?: boolean
  className?: string
}

export function EventItem({
  id,
  title,
  date,
  time,
  location,
  description,
  day,
  month,
  isActive = true,
  className,
}: EventItemProps) {
  return (
    <Card
      className={cn(
        "min-h-[250px] bg-black border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all",
        className
      )}
    >
      <div className="flex flex-col h-full">
        <Link href={`/eventos/${id}`} className="flex flex-col flex-grow h-full">
          <div className="flex items-center mb-4">
            <div className="bg-[#F7931A] text-white text-xl font-bold rounded-lg w-14 h-14 flex items-center justify-center mr-4">
              {day}
              {month && <span className="text-xs ml-1">{month}</span>}
            </div>
            <div>
              <h3 className="text-white font-bold">{title}</h3>
              <div className="flex items-center text-gray-400 text-sm">
                <Calendar className="h-3 w-3 mr-1" />
                <span className="mr-3">{date}</span>
                <Clock className="h-3 w-3 mr-1" />
                <span>{time}</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{location}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-300 flex-grow mb-4">{description}</p>
          <div className="mt-auto pt-2">
            <button
              disabled={!isActive}
              className={cn(
                "w-full py-2 rounded-md transition duration-300",
                isActive
                  ? "bg-[#F7931A] hover:bg-[#E68A19] text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-white cursor-not-allowed"
              )}
            >
              {isActive ? "Registrarse" : "Próximamente"}
            </button>
          </div>
        </Link>
      </div>
    </Card>
  )
}