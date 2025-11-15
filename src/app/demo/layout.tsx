
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Demonstração - Estratégia Chinesa',
  description: 'Receba um sinal gratuito da Estratégia Chinesa',
};

export default function DemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="theme-free">{children}</div>;
}
