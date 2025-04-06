import { DashboardItem } from "@/components/ui/dashboard-item"
import { CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Plus, QrCode, List, BadgeInfo } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <>
      {/* Crear Badge */}
      <DashboardItem colSpan={2}>
        <Link href="/dashboard/badge/create">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-xl">Crear Badge</CardTitle>
              <Plus className="h-5 w-5 text-[#F7931A]" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sky-100">
              Crea nuevos badges para tu comunidad. Define nombres, descripciones y requisitos.
            </p>
          </CardContent>
        </Link>
      </DashboardItem>

      {/* Dispenser de Badge */}
      <DashboardItem colSpan={2}>
        <Link href="/dashboard/badge/claim">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-xl">Dispenser de Badge</CardTitle>
              <QrCode className="h-5 w-5 text-[#F7931A]" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sky-100">
              Genera códigos QR y enlaces para distribuir tus badges de manera sencilla.
            </p>
          </CardContent>
        </Link>
      </DashboardItem>

      {/* Badge Detalle */}
      <DashboardItem colSpan={2}>
        <Link href="/dashboard/badge/1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-xl">Badge Detalle</CardTitle>
              <BadgeInfo className="h-5 w-5 text-[#F7931A]" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sky-100">
              Visualiza estadísticas y detalles completos de tus badges activos.
            </p>
          </CardContent>
        </Link>
      </DashboardItem>

      {/* Listado de Badges */}
      <DashboardItem colSpan={2}>
        <Link href="/dashboard/badges">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-xl">Listado de Badges</CardTitle>
              <List className="h-5 w-5 text-[#F7931A]" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sky-100">
              Administra y visualiza todos tus badges en un solo lugar.
            </p>
          </CardContent>
        </Link>
      </DashboardItem>
    </>
  )
} 