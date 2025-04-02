import { cn } from "@/lib/utils"
import { Card } from "@/app/components/ui/card"

interface DashboardItemProps {
  children: React.ReactNode
  className?: string
  colSpan?: 1 | 2 | 3 | 4
  rowSpan?: 1 | 2 | 3
}

export function DashboardItem({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
}: DashboardItemProps) {
  return (
    <Card
      className={cn(
        "bg-gray-900 border-gray-800 card-hover press-animation p-3",
        className,
        `col-span-${colSpan}`,
        `row-span-${rowSpan}`
      )}
    >
      {children}
    </Card>
  )
} 