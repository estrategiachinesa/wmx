
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Loader2, ArrowLeft } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type SignalHistoryItem = {
    id: string;
    asset: string;
    expirationTime: string;
    signal: 'CALL 🔼' | 'PUT 🔽';
    source: string;
    targetTime: string;
    generatedAt: {
        seconds: number;
        nanoseconds: number;
    };
};

export default function HistoricoPage() {
    const { user, isUserLoading, firestore } = useFirebase();

    const historyQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return query(
            collection(firestore, `users/${user.uid}/history`),
            orderBy('generatedAt', 'desc'),
            limit(50)
        );
    }, [user, firestore]);

    const { data: history, isLoading: isHistoryLoading } = useCollection<SignalHistoryItem>(historyQuery);

    const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp.seconds * 1000);
        return `${date.toLocaleDateString('pt-BR')} ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    };

    const getSignalVariant = (signal: string) => {
        return signal.includes('CALL') ? 'success' : 'destructive';
    };

    if (isUserLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="ml-2">Carregando...</p>
            </div>
        );
    }
    
    if (!user) {
        return (
            <div className="flex h-screen w-full items-center justify-center text-center p-4">
                 <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Acesso Negado</CardTitle>
                        <CardDescription>Você precisa estar logado para ver o histórico.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href="/">
                                Ir para a página de Login
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <>
            <div className="fixed inset-0 -z-20 h-full w-full grid-bg" />
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background/80 to-background" />

            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <header className="flex items-center gap-4 mb-6">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/analisador">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Histórico de Sinais</h1>
                        <p className="text-muted-foreground text-sm sm:text-base">Seus últimos 50 sinais gerados.</p>
                    </div>
                </header>

                <main>
                    <Card>
                        <CardContent className="p-0">
                             <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="hidden sm:table-cell">Gerado em</TableHead>
                                            <TableHead>Ativo</TableHead>
                                            <TableHead>Entrada</TableHead>
                                            <TableHead>Expiração</TableHead>
                                            <TableHead className="text-right">Sinal</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {isHistoryLoading && (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center h-24">
                                                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {!isHistoryLoading && (!history || history.length === 0) && (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                                    Nenhum sinal encontrado no seu histórico.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {!isHistoryLoading && history && history.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="hidden sm:table-cell text-muted-foreground text-xs">
                                                    {formatDate(item.generatedAt)}
                                                </TableCell>
                                                <TableCell className="font-medium">{item.asset}</TableCell>
                                                <TableCell>{item.targetTime}</TableCell>
                                                <TableCell>{item.expirationTime}</TableCell>
                                                <TableCell className="text-right">
                                                    <Badge variant={getSignalVariant(item.signal)} className="font-bold">
                                                        {item.signal}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                             </div>
                        </CardContent>
                    </Card>
                </main>
                 <footer className="w-full text-center text-[0.6rem] text-foreground/50 p-4 mt-8">
                  <p>© 2025 ESTRATÉGIA CHINESA. </p>
                  <p>Todos os direitos reservados.</p>
                </footer>
            </div>
        </>
    );
}

