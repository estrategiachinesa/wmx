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

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        {...props}
    >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-1.1-6.62-2.95-1.74-1.8-2.58-4.2-2.43-6.66l.01-.24c.04-1.31.52-2.58 1.3-3.71 1.31-1.91 3.55-3.14 5.86-3.19.16-.01.32-.01.48-.01.01 2.37 0 4.73.01 7.1.01.16-.02.32-.02.48-.02.83-.24 1.64-.67 2.31-1.08 1.63-3.23 2.4-5.22 1.63-.59-.22-1.12-.55-1.57-1-.45-.45-.81-.96-1.07-1.53-.02-.04-.04-.08-.05-.12-.04-.12-.08-.24-.12-.36-.04-.15-.05-.3-.08-.45-.04-.2-.04-.4-.04-.6v-3.72c2.95 0 5.9-.01 8.85.02z"/>
    </svg>
);


export default function LinksPage() {
  const telegramLink = 'https://t.me/TraderChinesVIP';
  const instagramLink = 'https://www.instagram.com/trader.chines/';
  const tiktokLink = 'https://www.tiktok.com/@trader.chines';


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
                <a href={tiktokLink} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
                    <TikTokIcon className="h-7 w-7" />
                    <span className="sr-only">TikTok</span>
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
