import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PlayCircle } from 'lucide-react';

export function VSL() {
  const vslImage = PlaceHolderImages.find(p => p.id === 'vsl-placeholder');
  
  return (
    <section className="flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Descubra o Segredo para um Cão Calmo</h2>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Assista ao vídeo abaixo para entender como nosso método inovador pode transformar o comportamento do seu cachorro em poucos dias.
      </p>
      <div className="mt-8 relative w-full max-w-sm aspect-[9/16] rounded-xl overflow-hidden shadow-2xl group cursor-pointer border-4 border-card">
        {vslImage && (
          <Image
            src={vslImage.imageUrl}
            alt={vslImage.description}
            fill
            className="object-cover"
            data-ai-hint={vslImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="h-20 w-20 text-white/80 group-hover:text-white group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </section>
  );
}
