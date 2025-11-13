
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SignalForm } from '@/components/app/signal-form';
import { isMarketOpenForAsset } from '@/lib/market-hours';
import type { Asset, FormData } from '@/app/analisador/page';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// This is a new page for the free analyzer
export default function AnalisadorGratuitoPage() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    asset: 'EUR/JPY',
    expirationTime: '1m',
  });
  const [showOTC, setShowOTC] = useState(false);
  const isMarketOpen = isMarketOpenForAsset(formData.asset);

  const handleAnalyze = async () => {
    setIsSubmitting(true);
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowPopup(true);
    setIsSubmitting(false);
  };
  
  const handleBackToHome = () => {
    router.push('/');
  }

  return (
    <>
      <div className="fixed inset-0 -z-20 h-full w-full grid-bg" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background/80 to-background" />

      <div className="flex flex-col min-h-screen">
        <header className="p-4 flex justify-between items-center">
          <div className="px-3 py-1 text-sm font-bold bg-primary text-primary-foreground rounded-full shadow-lg">
            FREE
          </div>
          <button
            onClick={handleBackToHome}
            className="text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90 px-3 py-1.5 rounded-md font-semibold"
          >
            Sair
          </button>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center p-4 space-y-6">
          <div className="w-full max-w-md bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl shadow-2xl shadow-primary/10 p-8">
            <SignalForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleAnalyze}
              isLoading={isSubmitting}
              showOTC={showOTC}
              setShowOTC={setShowOTC}
              isMarketOpen={isMarketOpen}
              // These props are for the premium version, so we pass down dummy/default values
              hasReachedLimit={false}
              user={null}
              firestore={undefined as any}
              isVip={false}
              isVipModalOpen={false}
              setVipModalOpen={() => {}}
              isFreeSignalPage={true}
            />
          </div>
        </main>
        
        <footer className="p-4 text-center text-[0.6rem] text-foreground/30">
          <p>© 2025 Estratégia Chinesa. </p>
          <p>Todos os direitos reservados.</p>
          <p className="max-w-xl mx-auto">Aviso Legal: Todas as estratégias e investimentos envolvem risco de perda. Nenhuma informação contida neste produto deve ser interpretada como uma garantia de resultados.</p>
        </footer>
      </div>

      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Falha ao analisar ❌</DialogTitle>
            <DialogDescription>
              Não encontramos seu cadastro no sistema. É preciso se cadastrar e realizar um depósito de qualquer valor para gerar os sinais.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button asChild>
                <Link href="https://pay.hotmart.com/E101943327K" target="_blank">Adquirir uma Licença</Link>
            </Button>
            <Button asChild>
              <Link href="https://exnova.com/lp/start-trading/?aff=198544&aff_model=revenue&afftrack=" target="_blank">Cadastrar agora</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
