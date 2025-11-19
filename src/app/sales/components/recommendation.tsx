import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export function Recommendation({ recommendation }: { recommendation: string }) {
  return (
    <section className="mt-12 md:mt-20">
      <Card className="bg-accent border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-headline">
            <Sparkles className="text-primary" />
            Uma solução para o seu cachorro
          </CardTitle>
          <CardDescription className="text-base">Com base nas suas respostas, aqui está a nossa recomendação personalizada:</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-foreground/90">{recommendation}</p>
        </CardContent>
      </Card>
    </section>
  );
}
