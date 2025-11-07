import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sessão Chinesa - Acesso',
  description: 'Cadastre-se para ter acesso à Sessão Chinesa.',
};

export default function SessaoChinesaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
