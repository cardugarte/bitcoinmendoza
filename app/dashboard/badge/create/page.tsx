'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Button } from "@/app/components/ui/button"
import { AlertCircle, Loader2, User, Code, Bitcoin, Star, Link } from "lucide-react"
import { useState } from "react"

export default function CreateBadge() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [thumb, setThumb] = useState('')
  const [link, setLink] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [nameError, setNameError] = useState<string | null>(null)
  const [descriptionError, setDescriptionError] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const tags = [
    { label: 'Contributor', icon: <User className="h-4 w-4 mr-1" strokeWidth={3} /> },
    { label: 'Developer', icon: <Code className="h-4 w-4 mr-1" strokeWidth={3} /> },
    { label: 'Bitcoiner', icon: <Bitcoin className="h-4 w-4 mr-1" strokeWidth={3} /> },
    { label: 'Core', icon: <Star className="h-4 w-4 mr-1" strokeWidth={3} /> },
    { label: 'Nostr', icon: <Link className="h-4 w-4 mr-1" strokeWidth={3} /> },
    { label: 'Lightning', icon: <Bitcoin className="h-4 w-4 mr-1" strokeWidth={3} /> }
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag)
      } else {
        return [...prev, tag]
      }
    })
  }

  const isTagSelected = (tag: string) => selectedTags.includes(tag)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      // TODO: Implement form submission
      // Simulando una petición asíncrona
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSuccess('Badge creado exitosamente')
    } catch (err) {
      setError('Error al crear el badge. Por favor intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-black border-gray-800 p-3">
      <CardHeader>
        <CardTitle className="text-white text-2xl text-center">Crear nuevo badge</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">Nombre del Badge</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Bitcoin Core Contributor"
              className={`bg-gray-900 text-white border ${nameError ? 'border-red-500' : 'border-gray-700'} rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F7931A] transition duration-300`}
              required
              onInvalid={(e) => {
                e.preventDefault()
                setNameError('Ingresa un nombre para el badge')
              }}
              onInput={() => setNameError(null)}
            />
            {nameError && (
              <div className="flex items-center gap-1 text-red-400 text-sm animate-in slide-in-from-top-4 fade-in-50 duration-300">
                <AlertCircle className="h-4 w-4" />
                <span>{nameError}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el badge y sus requisitos"
              className={`bg-gray-900 text-white border ${descriptionError ? 'border-red-500' : 'border-gray-700'} rounded-md py-3 px-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#F7931A] transition duration-300`}
              required
              onInvalid={(e) => {
                e.preventDefault()
                setDescriptionError('Ingresa una descripción para el badge')
              }}
              onInput={() => setDescriptionError(null)}
            />
            {descriptionError && (
              <div className="flex items-center gap-1 text-red-400 text-sm animate-in slide-in-from-top-4 fade-in-50 duration-300">
                <AlertCircle className="h-4 w-4" />
                <span>{descriptionError}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-gray-300">URL de la Imagen</Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://ejemplo.com/badge.png"
              className={`bg-gray-900 text-white border ${imageError ? 'border-red-500' : 'border-gray-700'} rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F7931A] transition duration-300`}
              required
              onInvalid={(e) => {
                e.preventDefault()
                setImageError('Ingresa una URL válida para la imagen')
              }}
              onInput={() => setImageError(null)}
            />
            {imageError && (
              <div className="flex items-center gap-1 text-red-400 text-sm animate-in slide-in-from-top-4 fade-in-50 duration-300">
                <AlertCircle className="h-4 w-4" />
                <span>{imageError}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumb" className="text-gray-300">URL de la Miniatura (opcional)</Label>
            <Input
              id="thumb"
              value={thumb}
              onChange={(e) => setThumb(e.target.value)}
              placeholder="https://ejemplo.com/badge-thumb.png"
              className="bg-gray-900 text-white border border-gray-700 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F7931A] transition duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link" className="text-gray-300">Enlace (opcional)</Label>
            <Input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://ejemplo.com/badge-info"
              className="bg-gray-900 text-white border border-gray-700 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#F7931A] transition duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Tags</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {tags.map(tag => (
                <Button
                  key={tag.label}
                  type="button"
                  variant="outline"
                  onClick={() => toggleTag(tag.label)}
                  className={`text-sm py-1.5 px-3 h-auto w-full transition-all duration-300 ${isTagSelected(tag.label)
                    ? 'btn-primary'
                    : 'bg-gray-900 border-gray-700 text-white hover:bg-gray-800 hover:text-[#F7931A]'
                    } active:bg-gray-800 active:text-white`}
                >
                  {tag.icon} {tag.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm animate-in slide-in-from-top-4 fade-in-50 duration-300">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 text-green-400 text-sm animate-in slide-in-from-top-4 fade-in-50 duration-300">
                <span>{success}</span>
              </div>
            )}
            <button
              type="submit"
              className="w-full md:w-1/2 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creando badge...</span>
                </>
              ) : (
                'Crear Badge'
              )}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 