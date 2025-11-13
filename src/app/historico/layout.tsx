
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Histórico - Estratégia Chinesa',
  description: 'Veja o seu histórico de sinais gerados.',
};

export default function HistoricoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

    