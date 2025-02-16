import './globals.css';
import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import { Providers } from '@/lib/providers';
import CartDrawer from '@/components/cart/CartDrawer';
import ThemeToggle from '@/components/ThemeToggle';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Myside',
  description: 'Sua loja completa para todos os estilos',
  keywords: 'moda, roupas, acessórios, compras online',
  authors: [{ name: 'Equipe Myside' }],
  openGraph: {
    title: 'MySide - Seu Destino de Moda',
    description: 'Descubra as últimas tendências da moda na StyleStore',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fakestoreapi.com" />
      </head>
      <body>
        <StyledComponentsRegistry>
        <Toaster position="top-right" />

          <Providers>
            {children}
            <CartDrawer />
            <ThemeToggle />
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}