import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
      <div className="flex flex-col items-center justify-center space-y-10 text-center">
        <h1 className="font-headline text-5xl font-bold text-primary animate-fade-in-down md:text-7xl">
          TRADER CHINÊS <span className="inline-block">🀄</span>
        </h1>
        <div className="flex animate-fade-in-up flex-col gap-6 sm:flex-row">
          <Link href="/EstrategiaChinesa">
            <Button
              size="lg"
              className="w-72 rounded-md bg-accent px-6 py-7 text-xl font-semibold text-accent-foreground shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-accent/90 hover:shadow-xl"
            >
              📈 Estratégia Chinesa
            </Button>
          </Link>
          <a
            href="https://t.me/TraderChinesVIP"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="w-72 rounded-md bg-accent px-6 py-7 text-xl font-semibold text-accent-foreground shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-accent/90 hover:shadow-xl"
            >
              🕒 Sessão Chinesa
            </Button>
          </a>
        </div>
      </div>
    </main>
  );
}
