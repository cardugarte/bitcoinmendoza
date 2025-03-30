'use client'

import { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
import { TriangleAlert, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { createName, getName, getAllNames } from '@/lib/api-client';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [keys, setKeys] = useState({ privateKey: '', publicKey: '' });
  const [nip05, setNip05] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const signer = NDKPrivateKeySigner.generate();
      const privateKey = signer.privateKey!;
      const publicKey = signer.pubkey;

      const identifier = `${username}@bitcoinmendoza.ar`;

      setKeys({ privateKey, publicKey });
      setNip05(identifier);

      // Send to server to register in nostr.json
      await registerNip05(username, publicKey);
    } catch (err) {
      console.error('Error generating keys:', err);
      setError('Error al generar las claves. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const registerNip05 = async (username: string, publicKey: string) => {
    try {
      const result = await createName(username, publicKey);
      const names = await getAllNames();
    } catch (err) {
      setError(`${err} No se puede registrar este NIP-05.`);
    }
  };

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(keys.privateKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reverts to "Copy key" after 2 seconds
    } catch (err) {
      console.error('Error copying:', err);
      // Fallback for browsers without clipboard API support
      const textarea = document.createElement('textarea');
      textarea.value = keys.privateKey;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Function to mask the private key
  const maskPrivateKey = (key: string) => {
    if (!key) return '';
    const start = key.slice(0, 18); // First 18 characters
    const end = key.slice(-18);     // Last 18 characters
    return `${start}...${end}`;     // Masks the middle with "..."
  };

  return (
    <section className="w-full py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Crea tu perfil Nostr</h1>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mb-8">
            Vení a formar parte de nuestra comunidad con un identificador único en @bitcoinmendoza.ar. Esto te va a servir para mostrar que sos de Bitcoin Mendoza en Nostr, y también será tu Address para recibir pagos Lightning en Bitcoin.
          </p>
          <div className="w-full max-w-md bg-black border border-gray-800 rounded-lg p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-md text-red-200">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu nombre de usuario"
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-md py-3 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-[#F7931A] transition duration-300"
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                className="w-full bg-[#F7931A] hover:bg-[#E68A19] text-white font-bold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Creando tu perfil...</span>
                  </>
                ) : (
                  'Generar NIP-05'
                )}
              </button>
            </form>
            {nip05 && (
              <div className="mt-6 text-left">
                <p className="text-gray-300 text-lg mb-2">
                  <span className="font-bold text-[#F7931A]">Tu NIP-05:</span> {nip05}
                </p>
                <div className="text-gray-300 text-lg">
                  <span className="flex flex-row items-center font-bold text-[#F7931A]">
                    <TriangleAlert className="text-[#F7931A] mr-2 text-sm" />
                    Guarda tu clave privada:
                  </span>
                  <div className="mt-2 bg-gray-800 p-3 rounded-md border border-gray-700 break-words text-sm">
                    {maskPrivateKey(keys.privateKey)}
                  </div>
                  <button
                    onClick={handleCopyKey}
                    className="mt-2 bg-[#F7931A] hover:bg-[#E68A19] text-white font-bold py-1 px-4 rounded-md shadow-lg hover:shadow-xl transition duration-300 text-sm"
                    disabled={isLoading}
                  >
                    {copied ? '¡Copiado!' : 'Copiar clave'}
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-2 italic">
                  Copia tu clave privada y guárdala en un lugar seguro. No la compartas con nadie.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}