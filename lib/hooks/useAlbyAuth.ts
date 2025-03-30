import { useState, useEffect } from 'react';

interface AlbyAuth {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (method: 'alby' | 'privateKey') => Promise<void>;
  logout: () => Promise<void>;
}

export function useAlbyAuth(): AlbyAuth {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      setIsAuthenticated(data.isAuthenticated);
    } catch (error) {
      console.error('Error checking auth:', error);
      setError('Error al verificar la autenticación');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (method: 'alby' | 'privateKey') => {
    try {
      setIsLoading(true);
      setError(null);

      if (method === 'alby') {
        // Check if Alby is installed
        if (!window.alby) {
          window.open('https://getalby.com', '_blank');
          throw new Error('Por favor, instala la extensión Alby para continuar');
        }
      }

      // Request authentication
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method,
          pubkey: process.env.NEXT_PUBLIC_ADMIN_PUBKEY
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Error al cerrar sesión');
      }

      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
      setError('Error al cerrar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout
  };
} 