import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-dog');
  
  return (
    <section className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg mt-4">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-12">
        <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-white max-w-2xl leading-tight drop-shadow-md">
          Seu cachorro não é agitado… ele só está <span className="text-white bg-primary/90 px-2 rounded-md">PRESO</span> dentro da própria mente.
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/90 max-w-xl drop-shadow-sm">Vamos libertá-lo juntos?</p>
      </div>
    </section>
  );
}
