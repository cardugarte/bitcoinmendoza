'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import BadgeDispenser from "@/components/ui/BadgeDispenser"

export default function ClaimPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  useEffect(() => {
    // Redirigir si no hay un ID
    if (!params.id) {
      router.replace("/dashboard") // Redirige al dashboard
    }
  }, [params.id, router])

  // Asegúrate de que params.id esté disponible antes de usarlo
  if (!params.id) {
    return null; // O puedes mostrar un loading spinner aquí
  }

  const badgeData = {
    title: `Badge #${params.id}`,
    description: "Este es un badge especial que puedes reclamar.",
    imageUrl: "url_de_la_imagen_del_badge", // Reemplaza con la URL real
    tags: ["Etiqueta1", "Etiqueta2", "Etiqueta3"],
    qrValue: "https://example.com/badge/" + params.id // URL que se codificará en el QR
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Claim Badge #{params.id}</h1>
      <BadgeDispenser {...badgeData} />
    </div>
  )
}