import { Button } from "@/components/ui/button"
import Link from "next/link"
import BlockHeightDisplay from "../components/BlockHeightDisplay"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#F7931A_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      {/* Contenido principal centrado */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 text-center">
        {/* Título */}
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">Club Bitcoin Mendoza</h1>

        {/* Número de bloque */}
        <BlockHeightDisplay />

        {/* Subtítulo */}
        <p className="text-base md:text-xl text-gray-300 max-w-2xl mt-8 mb-10">
          Educación y herramientas para emprendedores, programadores y entusiastas de Bitcoin como moneda de pago
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="https://t.me/bitcoinmendoza/" target="_blank">
            <Button className="bg-[#F7931A] hover:bg-[#E68A19] text-white font-bold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition duration-300 w-full">
              Grupo de Telegram
            </Button>
          </Link>
          <Link href="/eventos">
            <Button className="bg-transparent border-2 border-[#F7931A] text-white hover:bg-[#F7931A]/20 font-bold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition duration-300 w-full">
              Eventos
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer simple */}
      <footer className="w-full py-6 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <p className="text-gray-500 text-center">Construido por Bitcoiners mendocinos, para Mendoza y el mundo.</p>
        </div>
      </footer>
    </div>
  )
}

