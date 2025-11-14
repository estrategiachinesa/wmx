import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Termos e Políticas - Estratégia Chinesa',
  description: 'Leia nossos Termos de Uso, Política de Privacidade e Política de Cookies.',
};

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed inset-0 -z-20 h-full w-full grid-bg" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background/80 to-background" />

      <div className="flex flex-col min-h-screen">
         <header className="p-4 flex justify-center items-center sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border/50 z-10">
          <Link href="/" className="font-headline text-2xl font-bold text-primary">
            Estratégia Chinesa
          </Link>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
            {children}
        </main>
        
        <footer className="p-4 text-center text-xs text-foreground/30">
          <p>© 2025 Estratégia Chinesa. Todos os direitos reservados.</p>
        </footer>
      </div>
    </>
  );
}
