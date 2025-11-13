
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CurrencyFlags } from './currency-flags';
import { cn } from '@/lib/utils';
import { Timestamp } from 'firebase/firestore';

export type SignalHistory = {
  id: string;
  asset: string;
  expirationTime: '1m' | '5m';
  signal: 'CALL 🔼' | 'PUT 🔽';
  targetTime: string;
  status: 'pending' | 'win' | 'loss' | 'tie';
  createdAt: Timestamp;
};

type HistoryTableProps = {
  signals: SignalHistory[];
};

export function HistoryTable({ signals }: HistoryTableProps) {

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp || !timestamp.toDate) {
      return 'Data inválida';
    }
    const date = timestamp.toDate();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'win':
        return 'bg-success/20 text-success-foreground border-success/50';
      case 'loss':
        return 'bg-destructive/20 text-destructive-foreground border-destructive/50';
      case 'tie':
        return 'bg-muted/50 text-muted-foreground border-border';
      case 'pending':
      default:
        return 'bg-primary/20 text-primary-foreground border-primary/50';
    }
  };

  const getSignalColor = (signal: string) => {
      return signal.includes('CALL') ? 'text-success' : 'text-destructive';
  }

  return (
    <div className="rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Data</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Direção</TableHead>
              <TableHead>Expiração</TableHead>
              <TableHead className="text-right">Entrada</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {signals.map((signal) => (
              <TableRow key={signal.id} className="border-border/30">
                <TableCell className="font-medium text-muted-foreground whitespace-nowrap">{formatDate(signal.createdAt)}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <CurrencyFlags asset={signal.asset} />
                        <span className="font-bold">{signal.asset}</span>
                    </div>
                </TableCell>
                <TableCell className={cn("font-bold", getSignalColor(signal.signal))}>{signal.signal}</TableCell>
                <TableCell>{signal.expirationTime}</TableCell>
                <TableCell className="text-right font-mono">{signal.targetTime}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className={cn("font-bold", getStatusVariant(signal.status))}>
                    {signal.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
}

    