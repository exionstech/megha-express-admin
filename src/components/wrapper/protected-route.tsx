// components/ProtectedRoute.tsx
'use client';

import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
  children
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // If not authenticated, show nothing or a loading state
  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  // If authenticated, show the protected content
  return <>{children}</>;
}
