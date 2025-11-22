import { ArrowRight, ShieldCheck } from 'lucide-react';
import { CheckoutButton } from './checkout-button';

export function CTA() {
  return (
    <section className="text-center py-12">
        <div className="bg-card p-8 rounded-xl shadow-2xl max-w-3xl mx-auto border border-primary/20">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl font-headline">Pronto para começar a transformação?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
            Dê ao seu cachorro o presente da calma e fortaleça o vínculo entre vocês. Acesso imediato e garantia de satisfação.
            </p>
            <CheckoutButton>
                Quero meu cachorro calmo — começar agora
            </CheckoutButton>
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
