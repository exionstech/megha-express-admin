import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { AuthProvider } from '@/components/providers/auth-provider';
import ProtectedRoute from '@/components/wrapper/protected-route';

export const metadata: Metadata = {
  title: 'Megha Express | Dashboard',
  description: `Megha Express is here to revolutionize your shipping experience with speed, reliability, and convenience. With Megha Express, enjoy peace of mind knowing your shipments are in capable hands, no matter where they're headed.`,
  icons: {
    icon: '/fav.svg'
  }
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${lato.className}`} suppressHydrationWarning>
      <body className={'overflow-hidden'}>
        <AuthProvider>
          <NextTopLoader showSpinner={false} />
          <NuqsAdapter>
            <Providers>
              <Toaster />
              {children}
            </Providers>
          </NuqsAdapter>
        </AuthProvider>
      </body>
    </html>
  );
}
