import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { TRPCProvider } from '@/lib/trpc/client';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import Navbar        from '@/components/Navbar';
import Footer        from '@/components/Footer';
import ChatbotButton from '@/components/ChatbotButton';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600', '700'],
  style:    ['normal', 'italic'],
  variable: '--font-cormorant',
  display:  'swap',
});

const inter = Inter({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600'],
  variable: '--font-inter',
  display:  'swap',
});

export const metadata: Metadata = {
  title:       'Best Kech Immo — Villas, Séjours & Immobilier à Marrakech',
  description: 'Location de villas et appartements prestige à Marrakech, location de voitures, conciergerie, vente et construction immobilière.',
  keywords:    'villa location marrakech, appartement marrakech, location voiture marrakech, immobilier marrakech, conciergerie marrakech',
  openGraph: {
    title:       'Best Kech Immo',
    description: 'Villas, Séjours & Immobilier à Marrakech',
    locale:      'fr_MA',
    type:        'website',
  },
};

const FOOTER_H = 360;

async function Providers({ children }: { children: React.ReactNode }) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (clerkKey?.startsWith('pk_')) {
    const { ClerkProvider } = await import('@clerk/nextjs');
    const { frFR } = await import('@clerk/localizations');
    return <ClerkProvider localization={frFR}>{children}</ClerkProvider>;
  }
  return <>{children}</>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" style={{ background: '#2C1810' }} className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased" style={{ background: 'transparent' }}>
        <Providers>
          <TRPCProvider>
            <SmoothScrollProvider>
              <Navbar />
              <ChatbotButton />
              <main
                style={{
                  position:     'relative',
                  zIndex:       100,
                  background:   'var(--cream)',
                  marginBottom: `${FOOTER_H}px`,
                  boxShadow:    '0 32px 80px 12px rgba(44,24,16,.7), 0 4px 20px rgba(44,24,16,.4)',
                  minHeight:    '100vh',
                }}
              >
                {children}
              </main>
            </SmoothScrollProvider>
          </TRPCProvider>
        </Providers>

        <Footer />
      </body>
    </html>
  );
}
