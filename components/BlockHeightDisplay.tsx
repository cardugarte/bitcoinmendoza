'use client';

import { useEffect, useState } from "react";

export default function BlockHeightDisplay() {
  const [blockHeight, setBlockHeight] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Función para obtener la altura del bloque
    const fetchBlockHeight = async () => {
      try {
        const response = await fetch('https://blockchain.info/q/getblockcount');
        const data = await response.text();
        setBlockHeight(parseInt(data));
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching block height:', err);
        setError(true);
        setIsLoading(false);
      }
    };

    // Obtener la altura del bloque inmediatamente
    fetchBlockHeight();

    // Configurar un intervalo para actualizar cada minuto (60000ms)
    const intervalId = setInterval(fetchBlockHeight, 60000);

    // Limpiar el intervalo al desmontar
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm text-[#F7931A] mb-2">NÚMERO DE BLOQUE AHORA:</p>
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#F7931A] to-orange-600 blur-xl opacity-30 rounded-full"></div>
        <div className="relative bg-black/50 backdrop-blur-sm px-8 py-6 rounded-xl border border-[#F7931A]/30">
          {isLoading ? (
            <div className="h-20 flex items-center justify-center">
              <div className="animate-pulse text-[#F7931A]">Cargando...</div>
            </div>
          ) : error ? (
            <div className="h-20 flex items-center justify-center">
              <div className="text-red-500">Error al cargar</div>
            </div>
          ) : (
            <div className="font-mono text-5xl md:text-7xl font-bold text-white">
              {blockHeight?.toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 