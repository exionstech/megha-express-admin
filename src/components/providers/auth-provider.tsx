// components/AuthProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/signup', '/forgot-password', '/', '/about'];

  useEffect(() => {
    // Check localStorage for token on initial load
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);

      // Set the token in a cookie so middleware can access it
      document.cookie = `token=${storedToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
    }
  }, []);

  useEffect(() => {
    // Handle route protection on client-side
    const isPublicRoute = publicRoutes.some(
      (route) => pathname === route || pathname?.startsWith(`${route}/`)
    );

    if (!isPublicRoute && !isAuthenticated) {
      router.push(`/?from=${pathname}`);
    }

    if ((pathname === '/' || pathname === '/signup') && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [pathname, isAuthenticated, router]);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    document.cookie = `token=${newToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; max-age=0';
    setToken(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
