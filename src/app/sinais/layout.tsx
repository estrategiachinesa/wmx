import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estratégia Chinesa - Sinais',
  description: 'Receba sinais gratuitos da Estratégia Chinesa em tempo real',
};

export default function SinaisLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
