import { EventItem } from "@/components/ui/event-item"
import { CalendarIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function EventosPage() {
  // Mock events data (in a real app, this would come from an API/database)
  const events = [
    {
      id: "1",
      title: "🍕Bitcoin Pizza Day|Mendoza🍷",
      date: "28 de mayo 2025",
      time: "19:00",
      location: "Secret Location",
      description: "Un encuentro acompañado de buena pizza, donde aprenderás a emplear Bitcoin como medio de pago mediante Lightning Network —configurarás tu wallet y generarás enlaces de pago instantáneos—. Además, exploraremos Nostr como plataforma emergente para que emprendedores y desarrolladores diseñen soluciones que optimicen la infraestructura digital del sector turístico mendocino.",
      day: 25,
      isActive: false,
    },
    // {
    //   id: "2",
    //   title: "Bitcoin & Vino",
    //   date: "10 de Junio",
    //   time: "18:00",
    //   location: "Bodega La Central",
    //   description: "Cata de vinos y charla sobre cómo la industria vitivinícola puede beneficiarse de Bitcoin.",
    //   day: 10,
    //   isActive: true,
    // },
    // {
    //   id: "3",
    //   title: "Taller: Configuración de Nodos Lightning",
    //   date: "15 de Julio",
    //   time: "17:00",
    //   location: "Espacio Coworking Mendoza",
    //   description: "Aprende a configurar y operar tu propio nodo Lightning Network en Mendoza.",
    //   day: 15,
    //   isActive: true,
    // },
    // {
    //   id: "4",
    //   title: "Emprendedores Mendocinos",
    //   date: "3 de Agosto",
    //   time: "20:00",
    //   location: "Galería de Arte Central",
    //   description: "Exposición de arte digital con temática Bitcoin y venta de NFTs de artistas mendocinos.",
    //   day: 3,
    //   isActive: true,
    // },
    // {
    //   id: "5",
    //   title: "Meetup Seguridad en Bitcoin",
    //   date: "28 de Agosto",
    //   time: "19:00",
    //   location: "Universidad de Mendoza",
    //   description: "Mejores prácticas para mantener seguros tus bitcoins y evitar estafas comunes.",
    //   day: 28,
    //   isActive: true,
    // },
    // {
    //   id: "6",
    //   title: "Bitcoin en la Economía Argentina",
    //   date: "12 de Septiembre",
    //   time: "18:30",
    //   location: "Hotel Diplomatic",
    //   description: "Panel de expertos sobre el impacto del Bitcoin en la economía argentina actual.",
    //   day: 12,
    //   isActive: false,
    // },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <CalendarIcon className="h-8 w-8 text-[#F7931A] mr-3" />
          <h1 className="text-3xl font-bold text-white">Eventos Bitcoin Mendoza</h1>
        </div>
        <div className="relative w-64">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar eventos..."
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventItem
            key={event.id}
            id={event.id}
            title={event.title}
            date={event.date}
            time={event.time}
            location={event.location}
            description={event.description}
            day={event.day}
            isActive={event.isActive}
          />
        ))}
      </div>
    </div>
  )
} 