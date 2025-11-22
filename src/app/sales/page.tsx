// src/app/sales/page.tsx
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

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
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/sales');
}


function SalesPageContent() {
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

// This is the main component for the page, which uses Suspense
export default function SalesPage() {
  return (
    <Suspense fallback={<div className="flex h-dvh items-center justify-center">Carregando página...</div>}>
      <SalesPageContent />
    </Suspense>
  );
}
