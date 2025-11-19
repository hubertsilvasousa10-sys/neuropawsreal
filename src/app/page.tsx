import { Quiz } from '@/components/quiz';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <Suspense fallback={<div className="text-center">Carregando Quiz...</div>}>
        <Quiz />
      </Suspense>
    </main>
  );
}
