import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bitcoin Mendoza | Comunidad Bitcoin en la Capital del Vino",
  description:
    "Comunidad Bitcoin en Mendoza, Argentina. Educación, eventos y adopción de Bitcoin en la capital del vino argentino.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning={true}
      lang="es" >
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html >
  )
}



import './globals.css'