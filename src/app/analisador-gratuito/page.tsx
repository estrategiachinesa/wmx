
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SignalForm } from '@/components/app/signal-form';
import { isMarketOpenForAsset } from '@/lib/market-hours';
import type { Asset, FormData, SignalData } from '@/app/analisador/page';
import { FreeSignalResult } from '@/components/app/free-signal-result';

export default function AnalisadorGratuitoPage() {
  const router = useRouter();
  const [appState, setAppState] = useState<'form' | 'loading' | 'result'>('form');
  const [formData, setFormData] = useState<FormData>({
    asset: 'EUR/JPY',
    expirationTime: '1m',
  });
  const [showOTC, setShowOTC] = useState(false);
  const isMarketOpen = isMarketOpenForAsset(formData.asset);
  
  // Seeded pseudo-random number generator to have some consistency
  function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  // This function generates a *fake* target time to show on the result page.
  // The actual signal (CALL/PUT) is never generated or sent to the client.
  const generateFakeSignalTime = (expirationTime: '1m' | '5m') => {
      const now = new Date();
      let targetTime: Date;

      if (expirationTime === '1m') {
          const nextMinute = new Date(now);
          nextMinute.setSeconds(0, 0);
          nextMinute.setMinutes(nextMinute.getMinutes() + 1);
          targetTime = nextMinute;
      } else { // 5 minutes
          const minutes = now.getMinutes();
          const remainder = minutes % 5;
          const minutesToAdd = 5 - remainder;
          targetTime = new Date(now.getTime());
          targetTime.setMinutes(minutes + minutesToAdd, 0, 0);
          if (targetTime.getTime() < now.getTime()) {
              targetTime.setMinutes(targetTime.getMinutes() + 5);
          }
      }
      
      return {
        targetTime: targetTime.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
        }),
      };
  }

  const handleAnalyze = async () => {
    setAppState('loading');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setAppState('result');
  };
  
  const handleReset = () => {
    setAppState('form');
  };

  const handleBackToHome = () => {
    router.push('/');
  }

  const { targetTime } = generateFakeSignalTime(formData.expirationTime);

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
          {appState === 'result' && (
             <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                    ESTRATÉGIA CHINESA
                </h1>
             </div>
          )}
          <div className="w-full max-w-md bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl shadow-2xl shadow-primary/10 p-8">
            {appState !== 'result' ? (
              <SignalForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleAnalyze}
                isLoading={appState === 'loading'}
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
            ) : (
              <FreeSignalResult
                asset={formData.asset}
                expirationTime={formData.expirationTime}
                targetTime={targetTime}
                onReset={handleReset}
              />
            )}
          </div>
        </main>
        
        <footer className="p-4 text-center text-[0.6rem] text-foreground/30">
          <p>© 2025 Estratégia Chinesa. </p>
          <p>Todos os direitos reservados.</p>
          <p className="max-w-xl mx-auto">Aviso Legal: Todas as estratégias e investimentos envolvem risco de perda. Nenhuma informação contida neste produto deve ser interpretada como uma garantia de resultados.</p>
        </footer>
      </div>
    </>
  );
}
