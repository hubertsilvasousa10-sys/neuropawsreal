import { Suspense } from 'react';
import { Header } from './components/header';
import { Hero } from './components/hero';
import { VSL } from './components/vsl';
import { Recommendation } from './components/recommendation';
import { WhatYouGet } from './components/what-you-get';
import { Benefits } from './components/benefits';
import { Bonuses } from './components/bonuses';
import { Testimonials } from './components/testimonials';
import { FAQ } from './components/faq';
import { CTA } from './components/cta';
import { Separator } from '@/components/ui/separator';

export default function SalesPage({ searchParams }: { searchParams?: { recommendation?: string } }) {
  const recommendation = searchParams?.recommendation || '';

  return (
    <div className="flex flex-col items-center bg-background">
      <Header />
      <main className="w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Hero />
        <SectionSeparator />
        <VSL />
        
        <Suspense fallback={<div className="text-center py-10">Carregando recomendação...</div>}>
          {recommendation && <Recommendation recommendation={recommendation} />}
        </Suspense>
        
        <SectionSeparator />
        <WhatYouGet />
        <SectionSeparator />
        <Benefits />
        <SectionSeparator />
        <Bonuses />
        <SectionSeparator />
        <Testimonials />
        <SectionSeparator />
        <FAQ />
        <SectionSeparator />
        <CTA />
      </main>
      <footer className="w-full bg-primary/10 py-6 text-center text-sm text-foreground/80">
        <p>© {new Date().getFullYear()} Neuropaws. Todos os direitos reservados.</p>
        <p className="text-xs mt-2">Este site não faz parte do Facebook ou de qualquer entidade do Facebook. Além disso, este site não é endossado pelo Facebook de forma alguma. FACEBOOK é uma marca comercial da FACEBOOK, Inc.</p>
      </footer>
    </div>
  );
}

function SectionSeparator() {
    return <Separator className="my-12 md:my-20" />;
}
