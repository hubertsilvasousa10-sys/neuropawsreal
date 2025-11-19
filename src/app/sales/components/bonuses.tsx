import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, ArrowRight, ListChecks, Music, ShieldCheck, Zap } from 'lucide-react';

const bonuses = [
    { icon: ListChecks, title: "Checklist Diário de Calma", value: "R$ 49,90" },
    { icon: Activity, title: "Guia de Ativação do Nervo Vago", value: "R$ 69,90" },
    { icon: Music, title: "Playlist de Sons Calmantes", value: "R$ 39,90" },
];

export function Bonuses() {
  return (
    <section className="bg-primary/10 rounded-xl p-8 md:p-12 text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">E de presente... 3 Bônus Exclusivos!</h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
        Ao garantir seu acesso hoje, você leva também estes materiais incríveis para acelerar seus resultados.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {bonuses.map((bonus) => (
          <Card key={bonus.title} className="shadow-lg transform hover:scale-105 transition-transform">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <bonus.icon className="h-12 w-12 text-primary" />
                </div>
              <CardTitle>{bonus.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg font-semibold">Valor: <span className="line-through text-muted-foreground">{bonus.value}</span></p>
                <p className="text-2xl font-bold text-primary mt-1">Hoje: GRÁTIS!</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12">
        <p className="text-xl text-foreground/90">Leve o método completo + todos os bônus por apenas:</p>
        <p className="text-4xl font-bold text-green-600 my-2">R$ 24,90</p>
        <div className="bg-yellow-200/50 text-yellow-800 border-l-4 border-yellow-500 p-3 rounded-md max-w-md mx-auto my-4 text-sm flex items-center justify-center gap-2">
            <Zap className="h-5 w-5" />
            <span><span className="font-bold">Oferta Rápida:</span> Os 20 primeiros ganham um guia extra de socialização!</span>
        </div>
        <Button size="lg" className="mt-6 text-lg h-16 px-10 w-full sm:w-auto animate-pulse">
            Garantir Acesso Imediato
            <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mt-4">
            <div className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <span>Compra 100% Segura</span>
            </div>
            <div className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <span>Garantia de 7 Dias</span>
            </div>
        </div>
      </div>
    </section>
  );
}
