import type React from "react"
import type { Metadata } from "next"
import { Inter, Ubuntu } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const ubuntu = Ubuntu({ weight: "400", subsets: ["greek"] })

export const metadata: Metadata = {
  title: "Bitcoin Mendoza | Comunidad Bitcoin en la Capital del Vino",
  description:
    "Comunidad Bitcoin en Mendoza, Argentina. Educación, eventos y adopción de Bitcoin en la capital del vino argentino.",
  generator: 'carlit0s@xplorers.ar'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning={true}
      lang="es" >
      <body className={`${ubuntu.className} antialiased`}>{children}</body>
    </html >
  )
}



import './globals.css'