import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estratégia Chinesa - VIP',
  description: 'Alcance a consistência que você sempre buscou no trading.',
};

export default function VIPLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
