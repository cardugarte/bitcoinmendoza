'use client'

import { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
import { nip19 } from 'nostr-tools';
import { TriangleAlert, Loader2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { createName, getAllNames, isUsernameAvailable } from '@/lib/api-client';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [keys, setKeys] = useState({ privateKey: '', publicKey: '' });
  const [nip05, setNip05] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [useExistingAccount, setUseExistingAccount] = useState(false);
  const [existingNpub, setExistingNpub] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);

  const convertNpubToHex = (npub: string): string => {
    try {
      const { data } = nip19.decode(npub);
      return data as string;
    } catch (error) {
      throw new Error('El formato del npub no es válido');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setNip05('');
    setKeys({ privateKey: '', publicKey: '' });

    try {
      let publicKey;

      if (useExistingAccount) {
        if (!existingNpub) {
          throw new Error('Por favor ingresa tu npub');
        }
        publicKey = convertNpubToHex(existingNpub);
        await registerNip05(username, publicKey);
        setNip05(`${username}@bitcoinmendoza.ar`);
      } else {
        // First check if username is available
        const isAvailable = await isUsernameAvailable(username);
        if (!isAvailable) {
          throw new Error('Este nombre de usuario ya está registrado.');
        }

        // Only if username is available, generate the account
        const signer = NDKPrivateKeySigner.generate();
        publicKey = signer.pubkey;
        await registerNip05(username, publicKey);

        // Only after everything is successful, update the state
        setKeys({ privateKey: signer.privateKey!, publicKey });
        setNip05(`${username}@bitcoinmendoza.ar`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar la solicitud. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const registerNip05 = async (username: string, publicKey: string) => {
    const result = await createName(username, publicKey);
    const names = await getAllNames();
  };

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(keys.privateKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reverts to "Copy key" after 2 seconds
    } catch (err) {
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
            Vení a formar parte de nuestra comunidad con un identificador único en @bitcoinmendoza.ar
          </p>
          <div className="w-full max-w-md bg-black border border-gray-800 rounded-lg p-6">
            {error && (
              <div className="relative min-h-[90px] transition-opacity duration-300">
                <div className="absolute w-full mb-4 p-3 bg-red-900/50 border border-red-500 rounded-md text-red-200 animate-in slide-in-from-top-4 fade-in-50 duration-300">
                  {error}
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="flex items-center space-x-2 mb-4">
                <Switch
                  id="existing-account"
                  checked={useExistingAccount}
                  onCheckedChange={setUseExistingAccount}
                  className="data-[state=checked]:bg-[#F7931A] data-[state=checked]:hover:bg-[#E68A19]"
                />
                <Label htmlFor="existing-account" className="text-gray-300">
                  Usar cuenta existente
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-full">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value.replace(/[^a-zA-Z0-9]/g, ''));
                    }}
                    placeholder="username"
                    className={`w-full bg-gray-900 text-white border ${inputError ? 'border-red-500' : 'border-gray-700'
                      } rounded-md py-3 px-4 mb-3 focus:outline-none focus:ring-2 focus:ring-[#F7931A] transition duration-300`}
                    required
                    disabled={isLoading}
                    onInvalid={(e) => {
                      e.preventDefault();
                      setInputError('Ingresa un nombre de usuario');
                    }}
                    onInput={(e) => {
                      setInputError(null);
                    }}
                  />
                  {inputError && (
                    <div className="flex items-center gap-1 text-red-400 text-sm mb-4 animate-in slide-in-from-top-4 fade-in-50 duration-300">
                      <AlertCircle className="h-4 w-4" />
                      <span>{inputError}</span>
                    </div>
                  )}
                </div>
                <span className="text-gray-400 mb-4">
                  @bitcoinmendoza.ar
                </span>
              </div>

              {useExistingAccount && (
                <div className="animate-in slide-in-from-top-4 fade-in-50 duration-300">
                  <input
                    type="text"
                    value={existingNpub}
                    onChange={(e) => setExistingNpub(e.target.value)}
                    placeholder="Ingresa tu npub"
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded-md py-3 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-[#F7931A] transition duration-300"
                    required
                    disabled={isLoading}
                  />
                </div>
              )}

              <button
                type="submit"
                className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Procesando...</span>
                  </>
                ) : useExistingAccount ? (
                  'Obtener NIP-05'
                ) : (
                  'Crear cuenta con NIP-05'
                )}
              </button>
            </form>

            {nip05 && !useExistingAccount && (
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
                    className="mt-2 btn-primary text-sm"
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

            {nip05 && useExistingAccount && (
              <div className="mt-6 text-left">
                <p className="text-gray-300 text-lg mb-2">
                  <span className="font-bold text-[#F7931A]">Tu NIP-05:</span> {nip05}
                </p>
                <p className="text-gray-500 text-sm mt-2 italic">
                  Tu NIP-05 ha sido registrado exitosamente con tu cuenta existente.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}