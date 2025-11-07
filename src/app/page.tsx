'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Send } from 'lucide-react';
import Link from 'next/link';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function LinksPage() {
  const telegramLink = 'https://t.me/TraderChinesVIP';
  const instagramLink = 'https://www.instagram.com/trader.chines/';


  return (
    <>
      <div className="fixed inset-0 -z-10 h-full w-full bg-background"></div>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
          <div className="w-full max-w-xs space-y-8">
            
            <div className="flex flex-col space-y-4">
               <Button asChild size="lg" className="h-14 text-lg font-bold bg-green-600 hover:bg-green-700">
                <Link href="/vip">
                  Estratégia Chinesa
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="h-14 text-lg font-bold">
                <Link href="/sinais">
                  Sinais Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
               <Button asChild size="lg" className="h-14 text-lg font-bold bg-sky-500 hover:bg-sky-600">
                <a href={telegramLink} target="_blank" rel="noopener noreferrer">
                  Sessão Chinesa
                  <Send className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
            
            <div className="flex justify-center items-center space-x-6 pt-4">
                <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
                    <InstagramIcon className="h-7 w-7" />
                    <span className="sr-only">Instagram</span>
                </a>
            </div>

          </div>
        </main>
        <footer className="w-full text-center text-[0.6rem] text-foreground/50 p-4">
          <p>© 2025 ESTRATÉGIA CHINESA. </p>
          <p>Todos os direitos reservados.</p>
        </footer>
      </div>
    </>
  );
}
