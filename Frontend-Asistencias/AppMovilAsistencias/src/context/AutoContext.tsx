import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Profesor } from '../types';

// ─── 1. Tipos ────────────────────────────────────────────────────────────────

type AuthContextType = {
  profesor: Profesor | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, profesor: Profesor) => Promise<void>;
  logout: () => Promise<void>;
};

// ─── 2. Creación del contexto ────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null);

// ─── 3. Provider ─────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [profesor, setProfesor] = useState<Profesor | null>(null);
  const [token, setToken]       = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const savedToken    = await AsyncStorage.getItem('token');
        const savedProfesor = await AsyncStorage.getItem('profesor');
        if (savedToken && savedProfesor) {
          setToken(savedToken);
          setProfesor(JSON.parse(savedProfesor));
        }
      } catch (error) {
        console.error('Error al cargar la sesión:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();
  }, []);

  const login = async (newToken: string, newProfesor: Profesor) => {
    try {
      await AsyncStorage.setItem('token', newToken);
      await AsyncStorage.setItem('profesor', JSON.stringify(newProfesor));
      setToken(newToken);
      setProfesor(newProfesor);
    } catch (error) {
      console.error('Error al guardar la sesión:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['token', 'profesor']);
      setToken(null);
      setProfesor(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ profesor, token, isAuthenticated: !!token, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── 4. Hook para consumir el contexto ───────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}