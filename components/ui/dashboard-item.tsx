import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

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
        "min-h-[250px] bg-gray-900 border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all",
        className,
        colSpan > 1 ? `col-span-${colSpan}` : "",
        rowSpan > 1 ? `row-span-${rowSpan}` : ""
      )}
    >
      {children}
    </Card>
  )
} 