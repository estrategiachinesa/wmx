import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EstrategiaChinesaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8 text-center">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-6xl">
          Pronto, pode recriar o projeto aqui.
        </h1>
        <Link href="/" passHref>
          <Button
            variant="outline"
            className="border-primary/30 text-primary transition-colors hover:bg-primary/5"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Voltar à Página Inicial
          </Button>
        </Link>
      </div>
    </main>
  );
}
