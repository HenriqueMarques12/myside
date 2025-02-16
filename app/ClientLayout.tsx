'use client';

import { usePerformanceMonitor } from '@/lib/hooks/usePerformanceMonitor';
import CartDrawer from '@/components/cart/CartDrawer';
import ThemeToggle from '@/components/ThemeToggle';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  usePerformanceMonitor();

  return (
    <>
      {children}
      <CartDrawer />
      <ThemeToggle />
    </>
  );
}