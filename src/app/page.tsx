
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Simple in-memory "database" for credentials.
// In a real static site, this is just for show or a simple gate.
const SHARED_USER = 'admin';
const SHARED_PASSWORD = 'admin';


export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({ user: '', password: '' });

  useEffect(() => {
    // Check if user is already logged in via local storage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginTime = localStorage.getItem('loginTimestamp');
    let sessionExpired = false;

    if (loginTime) {
      const hoursSinceLogin = (Date.now() - parseInt(loginTime)) / (1000 * 60 * 60);
      if (hoursSinceLogin >= 1) {
        sessionExpired = true;
      }
    } else {
      sessionExpired = true;
    }
    
    if (isLoggedIn && !sessionExpired) {
        router.push('/analisador');
    } else {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loginTimestamp');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setIsLoading(true);

    if (!credentials.user || !credentials.password) {
        toast({
            variant: 'destructive',
            title: 'Campos Vazios',
            description: 'Por favor, preencha o usuário e a senha.',
        });
        setIsLoading(false);
        return;
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      if (credentials.user === SHARED_USER && credentials.password === SHARED_PASSWORD) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loginTimestamp', Date.now().toString());
        toast({
          title: 'Login bem-sucedido!',
          description: 'Redirecionando para o analisador...',
        });
        router.push('/analisador');
      } else {
        toast({
          variant: 'destructive',
          title: 'Falha no Login',
          description: 'Usuário ou senha incorretos.',
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        variant: 'destructive',
        title: 'Erro no Login',
        description: error.message || 'Ocorreu um erro inesperado.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 h-full w-full grid-bg">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background/80 to-background" />
      </div>

      <div className="flex flex-col min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-sm bg-background/50 backdrop-blur-sm border-border/50">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
               <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
                  <LineChart className="h-8 w-8 text-primary" />
               </div>
            </div>
            <CardTitle className="font-headline text-3xl">Estratégia Chinesa</CardTitle>
            <CardDescription>Acesse com as credenciais compartilhadas</CardDescription>
             <Button variant="link" size="sm" className="w-full text-blue-400" asChild>
                <Link href="https://t.me/Trader_Chines" target="_blank">
                  Solicite o acesso pelo Telegram
                </Link>
              </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user">Usuário</Label>
              <Input
                id="user"
                name="user"
                type="text"
                placeholder="Compartilhado no Telegram"
                value={credentials.user}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                value={credentials.password}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            <Button onClick={handleLogin} disabled={isLoading} className="w-full bg-primary/90 hover:bg-primary text-primary-foreground font-bold">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Entrar
            </Button>
          </CardContent>
        </Card>
        <footer className="w-full text-center text-[0.6rem] text-foreground/50 p-4 mt-8">
          <p>© 2025 ESTRATÉGIA CHINESA. </p>
          <p>Todos os direitos reservados.</p>
        </footer>
      </div>
    </>
  );
}
