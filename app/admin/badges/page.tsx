'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Image as ImageIcon, LogOut } from 'lucide-react';
import { useAlbyAuth } from '@/lib/hooks/useAlbyAuth';

interface BadgeForm {
  name: string;
  description: string;
  image: string;
  thumbnails: string[];
  tags: string[];
}

export default function AdminBadgesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [badgeForm, setBadgeForm] = useState<BadgeForm>({
    name: '',
    description: '',
    image: '',
    thumbnails: [],
    tags: []
  });
  const { toast } = useToast();
  const { isAuthenticated, isLoading: isAuthLoading, error: authError, login, logout } = useAlbyAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/badges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_INSTAT_API_KEY}`
        },
        body: JSON.stringify(badgeForm)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear el badge');
      }

      toast({
        title: "Badge Creado",
        description: "El badge ha sido creado exitosamente.",
      });

      // Reset form
      setBadgeForm({
        name: '',
        description: '',
        image: '',
        thumbnails: [],
        tags: []
      });
    } catch (error) {
      console.error('Error creating badge:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al crear el badge",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthLoading) {
    return (
      <section className="w-full py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <Card className="w-full max-w-md bg-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Verificando...</CardTitle>
                <CardDescription className="text-gray-400">
                  Por favor, espera mientras verificamos tu autenticación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-[#F7931A]" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="w-full py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <Card className="w-full max-w-md bg-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Acceso Administrador</CardTitle>
                <CardDescription className="text-gray-400">
                  Inicia sesión para gestionar los badges de Bitcoin Mendoza
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {authError && (
                  <div className="p-3 bg-red-900/50 border border-red-500 rounded text-red-200">
                    {authError}
                  </div>
                )}
                <div className="space-y-2">
                  <Button
                    onClick={() => login('alby')}
                    className="btn btn-primary w-full"
                  >
                    Iniciar Sesión con Alby
                  </Button>
                  <Button
                    onClick={() => login('privateKey')}
                    className="btn btn-outline w-full"
                  >
                    Iniciar Sesión con Clave Privada
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="flex justify-between items-center w-full max-w-2xl mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white">Gestionar Badges</h1>
            <Button
              onClick={logout}
              className="btn btn-outline"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mb-8">
            Crea y gestiona los badges de Bitcoin Mendoza
          </p>

          <Card className="w-full max-w-2xl bg-black border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Crear Nuevo Badge</CardTitle>
              <CardDescription className="text-gray-400">
                Completa el formulario para crear un nuevo badge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-white">Nombre del Badge</label>
                  <Input
                    value={badgeForm.name}
                    onChange={(e) => setBadgeForm({ ...badgeForm, name: e.target.value })}
                    placeholder="Ej: Miembro Fundador"
                    className="bg-gray-900 text-white border-gray-700 focus:border-[#F7931A] focus:ring-[#F7931A]"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white">Descripción</label>
                  <Textarea
                    value={badgeForm.description}
                    onChange={(e) => setBadgeForm({ ...badgeForm, description: e.target.value })}
                    placeholder="Describe el badge y sus requisitos"
                    className="bg-gray-900 text-white border-gray-700 focus:border-[#F7931A] focus:ring-[#F7931A]"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white">URL de la Imagen</label>
                  <div className="flex gap-2">
                    <Input
                      value={badgeForm.image}
                      onChange={(e) => setBadgeForm({ ...badgeForm, image: e.target.value })}
                      placeholder="https://bitcoinmendoza.ar/badges/badge.png"
                      className="bg-gray-900 text-white border-gray-700 focus:border-[#F7931A] focus:ring-[#F7931A]"
                      required
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      className="btn btn-outline"
                      disabled={isLoading}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-white">Etiquetas</label>
                  <Input
                    value={badgeForm.tags.join(', ')}
                    onChange={(e) => setBadgeForm({
                      ...badgeForm,
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                    })}
                    placeholder="bitcoin, mendoza, comunidad"
                    className="bg-gray-900 text-white border-gray-700 focus:border-[#F7931A] focus:ring-[#F7931A]"
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creando...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Crear Badge
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 