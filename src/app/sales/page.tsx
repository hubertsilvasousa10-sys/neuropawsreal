// src/app/sales/page.tsx
'use client';

import { Suspense } from 'react';
import { useSearchParams, redirect } from 'next/navigation';

import { Header } from './components/header';
import { Hero } from './components/hero';
import { VSL } from './components/vsl';
import { Benefits } from './components/benefits';
import { WhatYouGet } from './components/what-you-get';
import { Testimonials } from './components/testimonials';
import { Bonuses } from './components/bonuses';
import { FAQ } from './components/faq';
import { CTA } from './components/cta';
import { Recommendation } from './components/recommendation';
import { SocialProofToast } from './components/social-proof-toast';
import { Logo } from '@/components/logo';

// REMOVIDO O PRIMEIRO EXPORT DEFAULT
function HomeRedirect() {
  redirect('/sales');
}

function SalesPageContent(props: any) {
  const searchParams = useSearchParams();
  const recommendation = searchParams.get('recommendation');

  return (
    <div className="bg-background text-foreground">
      <Header />
      <SocialProofToast />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="space-y-16 md:space-y-24">
          <Hero />
          {recommendation && <Recommendation recommendation={recommendation} />}
          <VSL />
          <Benefits />
          <WhatYouGet />
          <Testimonials />
          <Bonuses />
          <FAQ />
          <CTA />
        </div>
      </main>

      <footer className="py-8 text-center text-muted-foreground">
        <div className="container">
          <Logo className="justify-center mb-4" />
          <p>&copy; {new Date().getFullYear()} Neuropaws. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

// AGORA SIM — APENAS UM EXPORT DEFAULT CORRETO
export default function Page(props: any) {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SalesPageContent {...props} />
    </Suspense>
  );
}


