'use server';

import { z } from 'zod';

export type Asset = 
  | 'EUR/USD' | 'EUR/USD (OTC)'
  | 'EUR/JPY' | 'EUR/JPY (OTC)';

export type ExpirationTime = '1m' | '5m';

const GenerateSignalInputSchema = z.object({
    asset: z.enum(['EUR/USD', 'EUR/USD (OTC)', 'EUR/JPY', 'EUR/JPY (OTC)']),
    expirationTime: z.enum(['1m', '5m']),
    isPremium: z.boolean(),
    correlationChance: z.number().min(0).max(1)
});

type GenerateSignalInput = z.infer<typeof GenerateSignalInputSchema>;

export type GenerateSignalOutput = {
  signal: 'CALL 🔼' | 'PUT 🔽';
  targetTime: string;
  source: 'IA' | 'Estratégia' | 'Aleatório';
  targetDate: Date;
};

// Seeded pseudo-random number generator
function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

export async function generateSignal(input: GenerateSignalInput): Promise<GenerateSignalOutput> {
    const { asset, expirationTime, isPremium, correlationChance } = GenerateSignalInputSchema.parse(input);

    const now = new Date();
    
    // The seed is based on the current minute, making the signal consistent for all users within that same minute.
    const minuteSeed = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()).getTime();

    // --- Signal Generation Logic ---
    let finalSignal: 'CALL 🔼' | 'PUT 🔽';
    let source: 'IA' | 'Estratégia' | 'Aleatório' = 'Aleatório';

    if (isPremium) {
        // Premium users get AI-based signals
        source = 'IA';
        // More complex logic can be added here for AI signals
        const aiSeed = minuteSeed + 1;
        const aiRandom = seededRandom(aiSeed);
        finalSignal = aiRandom < 0.55 ? 'CALL 🔼' : 'PUT 🔽'; // Slightly biased for AI
    } else {
        // Standard users get strategy-based signals with some randomness
        source = 'Estratégia';
        const marketTrendSeed = minuteSeed;
        const marketTrendRandom = seededRandom(marketTrendSeed);
        const generalMarketSignal = marketTrendRandom < 0.5 ? 'CALL 🔼' : 'PUT 🔽';

        const assetSpecificSeed = minuteSeed + asset.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const assetRandom = seededRandom(assetSpecificSeed);
        const independentSignal = assetRandom < 0.5 ? 'CALL 🔼' : 'PUT 🔽';
        
        const correlationRandom = seededRandom(minuteSeed + 2); // Use a different seed for correlation

        if (correlationRandom < correlationChance) {
            finalSignal = generalMarketSignal; // Correlated with the general market
        } else {
            finalSignal = independentSignal; // Independent asset movement
        }
    }

    // --- Target Time Calculation ---
    let targetTime: Date;
    if (expirationTime === '1m') {
        const nextMinute = new Date(now);
        nextMinute.setSeconds(0, 0);
        nextMinute.setMinutes(nextMinute.getMinutes() + 1);
        targetTime = nextMinute;
    } else { // 5m
        const minutes = now.getMinutes();
        const remainder = minutes % 5;
        const minutesToAdd = 5 - remainder;
        targetTime = new Date(now.getTime());
        targetTime.setMinutes(minutes + minutesToAdd, 0, 0);
        if (targetTime.getTime() < now.getTime()) {
            targetTime.setMinutes(targetTime.getMinutes() + 5);
        }
    }

    const targetTimeString = targetTime.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
    });

    return {
        signal: finalSignal,
        targetTime: targetTimeString,
        source,
        targetDate: targetTime,
    };
}
