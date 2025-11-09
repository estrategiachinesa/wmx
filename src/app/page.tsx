'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Loader2 } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, type User } from 'firebase/auth';
import { doc, serverTimestamp, getDoc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Separator } from '@/components/ui/separator';


const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

type FormFields = z.infer<typeof formSchema>;

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.021,35.816,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);


export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/analisador');
    }
  }, [user, isUserLoading, router]);

 const ensureUserProfile = async (user: User) => {
    if (!firestore) return;
    const userDocRef = doc(firestore, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // User profile doesn't exist, create it.
      const userProfile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email?.split('@')[0] || '',
        createdAt: serverTimestamp(),
      };
      // Use the non-blocking update which handles its own errors
      setDocumentNonBlocking(userDocRef, userProfile, { merge: true });
    }
  };

  const handleAuthAction: SubmitHandler<FormFields> = async ({ email, password }) => {
    setIsLoading(true);
    try {
      if (isRegistering) {
        // --- Registration Flow ---
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await ensureUserProfile(userCredential.user);
        toast({
          title: 'Cadastro bem-sucedido!',
          description: 'Você agora pode fazer login.',
        });
        setIsRegistering(false); // Switch back to login view
      } else {
        // --- Login Flow ---
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: 'Login bem-sucedido!',
          description: 'Redirecionando para o analisador.',
        });
        // The useEffect will handle the redirect
      }
    } catch (error: any) {
      console.error("Firebase auth error:", error);
      let description = 'Ocorreu um erro. Tente novamente.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          description = 'Este e-mail já está em uso por outra conta.';
          break;
        case 'auth/invalid-email':
          description = 'O endereço de e-mail fornecido não é válido.';
          break;
        case 'auth/operation-not-allowed':
          description = 'Login com e-mail e senha não está habilitado.';
          break;
        case 'auth/weak-password':
          description = 'A senha fornecida é muito fraca.';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          description = 'E-mail ou senha incorretos.';
          break;
        default:
          description = `Ocorreu um erro inesperado.`;
      }
      toast({
        variant: 'destructive',
        title: isRegistering ? 'Falha no Cadastro' : 'Falha no Login',
        description,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    if (!auth) {
        toast({ variant: 'destructive', title: 'Erro', description: 'Serviço de autenticação não está pronto.' });
        setIsLoading(false);
        return;
    }
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        await ensureUserProfile(result.user);
        toast({
            title: 'Login com Google bem-sucedido!',
            description: 'Redirecionando para o analisador.',
        });
        // useEffect will handle redirection
    } catch (error: any) {
        console.error("Google sign-in error:", error);
        toast({
            variant: 'destructive',
            title: 'Falha no Login com Google',
            description: 'Não foi possível fazer login. Tente novamente.',
        });
    } finally {
        setIsLoading(false);
    }
  };

  if (isUserLoading || user) {
      return (
          <div className="flex h-screen w-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      )
  }

  return (
    <>
      <div className="fixed inset-0 -z-10 h-full w-full bg-background"></div>
      <div className="flex flex-col min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
               <div className="p-2 bg-primary/10 rounded-full">
                  <LineChart className="h-8 w-8 text-primary" />
               </div>
            </div>
            <CardTitle className="font-headline text-2xl">Estratégia Chinesa</CardTitle>
            <CardDescription>{isRegistering ? 'Crie sua conta para continuar' : 'Acesse sua conta para continuar'}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleAuthAction)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...register('email')}
                  disabled={isLoading}
                />
                {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  {...register('password')}
                  disabled={isLoading}
                />
                {errors.password && <p className="text-destructive text-xs">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isRegistering ? 'Cadastrar' : 'Entrar'}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou continue com
                </span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon className="mr-2" />}
                Google
            </Button>

            <div className="mt-4 text-center text-sm">
              {isRegistering ? 'Já tem uma conta?' : 'Não tem uma conta?'}
              <Button variant="link" onClick={() => setIsRegistering(!isRegistering)} className="pl-1">
                {isRegistering ? 'Faça login' : 'Cadastre-se'}
              </Button>
            </div>
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
