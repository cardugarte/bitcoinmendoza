import { CalendarIcon, SearchIcon, ChevronRightIcon, CheckCircle, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export default function EventosListaPage() {
  // Mock events data (in a real app, this would come from an API/database)
  const events = [
    {
      id: "1",
      title: "Meetup Bitcoin Pizza Day Mendoza",
      date: "22 de Mayo",
      time: "19:00",
      location: "Café del Centro",
      day: 25,
      isActive: true,
    },
    {
      id: "2",
      title: "Bitcoin & Vino",
      date: "10 de Junio",
      time: "18:00",
      location: "Bodega La Central",
      day: 10,
      isActive: true,
    },
    {
      id: "3",
      title: "Taller: Configuración de Nodos Lightning",
      date: "15 de Julio",
      time: "17:00",
      location: "Espacio Coworking Mendoza",
      day: 15,
      isActive: true,
    },
    {
      id: "4",
      title: "Emprendedores Mendocinos",
      date: "3 de Agosto",
      time: "20:00",
      location: "Galería de Arte Central",
      day: 3,
      isActive: true,
    },
    {
      id: "5",
      title: "Meetup Seguridad en Bitcoin",
      date: "28 de Agosto",
      time: "19:00",
      location: "Universidad de Mendoza",
      day: 28,
      isActive: true,
    },
    {
      id: "6",
      title: "Bitcoin en la Economía Argentina",
      date: "12 de Septiembre",
      time: "18:30",
      location: "Hotel Diplomatic",
      day: 12,
      isActive: false,
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <CalendarIcon className="h-8 w-8 text-[#F7931A] mr-3" />
          <h1 className="text-3xl font-bold text-white">Lista de Eventos</h1>
        </div>
        <div className="relative w-64">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar eventos..."
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-gray-800/50">
              <TableHead className="text-white">Fecha</TableHead>
              <TableHead className="text-white">Nombre</TableHead>
              <TableHead className="text-white">Ubicación</TableHead>
              <TableHead className="text-white">Estado</TableHead>
              <TableHead className="text-white w-20">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id} className="border-gray-800 hover:bg-gray-800/50">
                <TableCell className="text-gray-300">
                  <div className="flex items-center">
                    <div className="bg-[#F7931A] text-white text-sm font-bold rounded-lg w-10 h-10 flex items-center justify-center mr-3">
                      {event.day}
                    </div>
                    <span>{event.date}<br />{event.time}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-white">{event.title}</TableCell>
                <TableCell className="text-gray-300">{event.location}</TableCell>
                <TableCell>
                  {event.isActive ? (
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
                  <Link href={`/eventos/${event.id}`} className="flex items-center text-[#F7931A] hover:text-[#E68A19]">
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