
'use client';

import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { HistoryTable, SignalHistory } from '@/components/app/history-table';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function HistoricoPage() {
  const { user, firestore, isUserLoading } = useFirebase();

  const historyQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'signalHistory'),
      orderBy('createdAt', 'desc')
    );
  }, [user, firestore]);

  const {
    data: signals,
    isLoading: isHistoryLoading,
    error,
  } = useCollection<SignalHistory>(historyQuery);

  const isLoading = isUserLoading || isHistoryLoading;

  return (
    <>
      <div className="fixed inset-0 -z-20 h-full w-full grid-bg" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background/80 to-background" />

      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex items-center gap-4 mb-8">
          <Link href="/analisador" className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-headline">
            Histórico de Sinais
          </h1>
        </header>

        <main>
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-3">Carregando histórico...</p>
            </div>
          )}

          {!isLoading && error && (
            <div className="text-center p-8 bg-destructive/10 border border-destructive/50 rounded-lg">
              <p className="font-bold text-destructive">Ocorreu um erro</p>
              <p className="text-sm text-destructive-foreground/80">
                Não foi possível carregar seu histórico de sinais. Tente novamente mais tarde.
              </p>
            </div>
          )}

          {!isLoading && !error && signals && (
            <HistoryTable signals={signals} />
          )}

          {!isLoading && !error && (!signals || signals.length === 0) && (
            <div className="text-center p-8 bg-muted/20 border border-border/50 rounded-lg">
              <p className="font-bold">Nenhum sinal no histórico</p>
              <p className="text-sm text-muted-foreground">
                Gere seu primeiro sinal na página do analisador para começar.
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

    