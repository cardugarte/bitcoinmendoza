'use client'

import { useState, useEffect } from 'react';
import { QrCode, Key } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

export default function BadgesPage() {
  const [nip05, setNip05] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userPubkey, setUserPubkey] = useState<string | null>(null);
  const { toast } = useToast();

  // Generate the claim URL for the QR code
  const claimUrl = userPubkey
    ? `${window.location.origin}/badges/claim?pubkey=${userPubkey}`
    : `${window.location.origin}/badges/claim`;

  const handleNip05Claim = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/badges/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_INSTAT_API_KEY}`
        },
        body: JSON.stringify({ nip05 })
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
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Hubo un error al reclamar tu badge. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get user's public key from NIP-05
  const getUserPubkey = async (nip05: string) => {
    try {
      const username = nip05.split('@')[0];
      const response = await fetch(`/.well-known/nostr.json?name=${username}`);
      const data = await response.json();
      return data.names[username];
    } catch (error) {
      console.error('Error fetching public key:', error);
      return null;
    }
  };

  // Update user's public key when NIP-05 changes
  useEffect(() => {
    if (nip05 && nip05.endsWith('@bitcoinmendoza.ar')) {
      getUserPubkey(nip05).then(setUserPubkey);
    } else {
      setUserPubkey(null);
    }
  }, [nip05]);

  return (
    <section className="w-full py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Badges de Bitcoin Mendoza</h1>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mb-8">
            Reclama tu badge de Bitcoin Mendoza para mostrar tu apoyo a la comunidad Bitcoin en Mendoza.
          </p>

          <Tabs defaultValue="qr" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="qr">Código QR</TabsTrigger>
              <TabsTrigger value="nip05">NIP-05</TabsTrigger>
            </TabsList>

            <TabsContent value="qr">
              <Card className="bg-black border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Escanear Código QR</CardTitle>
                  <CardDescription className="text-gray-400">
                    {userPubkey
                      ? 'Escanea este código QR con tu cliente Nostr para reclamar tu badge'
                      : 'Ingresa tu NIP-05 en la otra pestaña para obtener tu código QR personalizado'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <QRCodeSVG
                      value={claimUrl}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  {userPubkey && (
                    <Button
                      variant="outline"
                      className="text-white border-gray-700 hover:bg-gray-800"
                      onClick={() => window.open(claimUrl, '_blank')}
                    >
                      Abrir en Cliente Nostr
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nip05">
              <Card className="bg-black border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Reclamar con NIP-05</CardTitle>
                  <CardDescription className="text-gray-400">
                    Ingresa tu identificador NIP-05 para reclamar tu badge
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNip05Claim} className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        type="text"
                        placeholder="usuario@bitcoinmendoza.ar"
                        value={nip05}
                        onChange={(e) => setNip05(e.target.value)}
                        className="bg-gray-900 text-white border-gray-700"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#F7931A] hover:bg-[#E68A19]"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Key className="mr-2 h-4 w-4 animate-spin" />
                          Reclamando...
                        </>
                      ) : (
                        <>
                          <Key className="mr-2 h-4 w-4" />
                          Reclamar Badge
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
} 