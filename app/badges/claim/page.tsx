'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export default function ClaimPage() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Get the public key from the URL
  const pubkey = searchParams.get('pubkey');

  useEffect(() => {
    if (pubkey) {
      handleClaim();
    }
  }, [pubkey]);

  const handleClaim = async () => {
    if (!pubkey) {
      setError('No se proporcionó una clave pública');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/badges/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_INSTAT_API_KEY}`
        },
        body: JSON.stringify({ pubkey })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to claim badge');
      }

      toast({
        title: "¡Badge Reclamado!",
        description: "Tu badge de Bitcoin Mendoza ha sido reclamado exitosamente.",
      });
    } catch (error) {
      console.error('Error claiming badge:', error);
      setError(error instanceof Error ? error.message : 'Error al reclamar el badge');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <Card className="w-full max-w-md bg-black border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Reclamar Tu Badge</CardTitle>
              <CardDescription className="text-gray-400">
                {isLoading
                  ? 'Reclamando tu badge de Bitcoin Mendoza...'
                  : error
                    ? 'Hubo un error al reclamar tu badge'
                    : 'Tu badge será reclamado automáticamente'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 text-white">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Procesando...</span>
                </div>
              ) : error ? (
                <div className="space-y-4">
                  <p className="text-red-400">{error}</p>
                  <Button
                    onClick={handleClaim}
                    className="w-full bg-[#F7931A] hover:bg-[#E68A19]"
                  >
                    Intentar Nuevamente
                  </Button>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 