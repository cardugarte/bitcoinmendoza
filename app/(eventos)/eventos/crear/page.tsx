import { CalendarIcon, PlusCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function CrearEventoPage() {
  return (
    <div>
      <div className="flex items-center mb-8">
        <PlusCircle className="h-8 w-8 text-[#F7931A] mr-3" />
        <h1 className="text-3xl font-bold text-white">Crear Nuevo Evento</h1>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Información del Evento</CardTitle>
          <CardDescription className="text-gray-400">
            Complete los detalles para crear un nuevo evento en Bitcoin Mendoza
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre del evento */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Nombre del Evento</Label>
              <Input
                id="title"
                placeholder="Ej: Meetup Bitcoin Mendoza"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Fecha */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-white">Fecha</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="date"
                  type="date"
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            {/* Hora */}
            <div className="space-y-2">
              <Label htmlFor="time" className="text-white">Hora</Label>
              <Input
                id="time"
                type="time"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Ubicación */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white">Ubicación</Label>
              <Input
                id="location"
                placeholder="Ej: Café del Centro"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Estado del evento */}
            <div className="space-y-2">
              <Label htmlFor="active" className="text-white flex justify-between">
                <span>Evento Activo</span>
                <Switch id="active" defaultChecked />
              </Label>
              <p className="text-xs text-gray-400">Los eventos activos son visibles y permiten registro</p>
            </div>

            {/* Número de Día */}
            <div className="space-y-2">
              <Label htmlFor="day" className="text-white">Día del Mes</Label>
              <Input
                id="day"
                type="number"
                placeholder="Ej: 25"
                min="1"
                max="31"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe el evento en detalle..."
              className="bg-gray-800 border-gray-700 text-white min-h-32"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4 border-t border-gray-800 pt-6">
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
            Cancelar
          </Button>
          <Button className="bg-[#F7931A] hover:bg-[#E68A19] text-white">
            Crear Evento
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 