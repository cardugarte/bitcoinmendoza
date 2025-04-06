"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { QRCodeCanvas } from "qrcode.react" // Asegúrate de instalar esta librería

interface BadgeDispenserProps {
  title: string
  description: string
  imageUrl: string
  tags: string[]
  qrValue: string
}

const BadgeDispenser: React.FC<BadgeDispenserProps> = ({ title, description, imageUrl, tags, qrValue }) => {
  return (
    <Card className="bg-gray-900 border-gray-800 p-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={imageUrl} alt={title} className="w-full h-auto mb-4" />
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} variant="default">{tag}</Badge>
          ))}
        </div>
        <QRCodeCanvas value={qrValue} size={128} />
      </CardContent>
    </Card>
  )
}

export default BadgeDispenser