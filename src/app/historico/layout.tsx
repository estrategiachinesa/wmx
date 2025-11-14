import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estratégia Chinesa - Histórico de Sinais',
  description: 'Veja seu histórico de sinais gerados',
};

export default function HistoricoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
