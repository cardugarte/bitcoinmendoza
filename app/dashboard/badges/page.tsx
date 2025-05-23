import { BadgeCheck, SearchIcon, ChevronRightIcon, CheckCircle, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export default function BadgeList() {
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
          <BadgeCheck className="h-8 w-8 text-[#F7931A] mr-3" />
          <h1 className="text-3xl font-bold text-white">Listado de Badges</h1>
        </div>
        <div className="relative w-64">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar badges..."
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-gray-800/50">
              <TableHead className="text-white">Nombre</TableHead>
              <TableHead className="text-white">Categoría</TableHead>
              <TableHead className="text-white">Reclamados</TableHead>
              <TableHead className="text-white">Estado</TableHead>
              <TableHead className="text-white w-20">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {badges.map((badge) => (
              <TableRow key={badge.id} className="border-gray-800 hover:bg-gray-800/50">
                <TableCell className="font-medium text-white">
                  <div className="flex items-center">
                    <div className="bg-[#F7931A] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      <BadgeCheck className="h-4 w-4" />
                    </div>
                    {badge.title}
                  </div>
                </TableCell>
                <TableCell className="text-gray-300">{badge.category}</TableCell>
                <TableCell className="text-gray-300">{badge.claimCount}</TableCell>
                <TableCell>
                  {badge.isActive ? (
                    <div className="flex items-center text-green-500">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>Activo</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500">
                      <XCircle className="h-4 w-4 mr-1" />
                      <span>Inactivo</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/badge/${badge.id}`} className="flex items-center text-[#F7931A] hover:text-[#E68A19]">
                    <span className="mr-1">Ver</span>
                    <ChevronRightIcon className="h-4 w-4" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}