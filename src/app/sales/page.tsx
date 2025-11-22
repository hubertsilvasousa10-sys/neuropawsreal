'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from './components/header';
import { Hero } from './components/hero';
import { VSL } from './components/vsl';
import { Recommendation } from './components/recommendation';
import { Benefits } from './components/benefits';
import { WhatYouGet } from './components/what-you-get';
import { Testimonials } from './components/testimonials';
import { Bonuses } from './components/bonuses';
import { FAQ } from './components/faq';
import { CTA } from './components/cta';
import { SocialProofToast } from './components/social-proof-toast';

interface PageProps {
  searchParams?: { recommendation?: string };
}

// Este componente lê a recomendação da URL
function SalesPageContent({ searchParams }: PageProps) {
  const recommendation = searchParams?.recommendation;

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-8 space-y-16 md:space-y-24">
        <Hero />
        {recommendation && <Recommendation recommendation={decodeURIComponent(recommendation)} />}
        <VSL />
        <Benefits />
        <WhatYouGet />
        <Testimonials />
        <Bonuses />
        <FAQ />
        <CTA />
      </main>
      <SocialProofToast />
    </div>
  );
}


export default function SalesPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center">Carregando...</div>}>
      <SalesPageContent {...props} />
    </Suspense>
  );
}