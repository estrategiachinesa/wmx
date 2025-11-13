
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Sinal Gratuito - Estratégia Chinesa',
  description: 'Receba um sinal gratuito da Estratégia Chinesa',
};

// This is a new layout file for the free analyzer page
export default function AnalisadorGratuitoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="theme-free">{children}</div>;
}
