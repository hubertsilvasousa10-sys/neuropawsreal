import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  { name: "Juliana & Pipoca", text: "O Pipoca era outro cachorro! Não parava quieto. Hoje ele é super tranquilo, até as visitas se surpreendem. Mudou nossa vida.", imageId: "testimonial-1" },
  { name: "Marcos & Thor", text: "Eu não conseguia mais sair de casa, o Thor destruía tudo. O método foi um divisor de águas. Ele fica calmo e eu fico em paz.", imageId: "testimonial-2" },
  { name: "Carla & Luna", text: "Pensei que era caso perdido, a Luna latia pra tudo. Agora nossos passeios são um sonho. Recomendo de olhos fechados!", imageId: "testimonial-3" },
];

export function Testimonials() {
  const images = PlaceHolderImages;

  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Donos de pets calmos e felizes</h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
        Veja o que outros tutores estão dizendo sobre a transformação Neuropaws.
      </p>
      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {testimonials.map((testimonial) => {
          const image = images.find(img => img.id === testimonial.imageId);
          return (
            <Card key={testimonial.name} className="flex flex-col shadow-sm">
              <CardContent className="pt-6 flex-grow">
                <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.text}"</p>
              </CardContent>
              <CardHeader className="flex-row items-center gap-4 pt-2">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    width={56}
                    height={56}
                    className="rounded-full object-cover"
                    data-ai-hint={image.imageHint}
                  />
                )}
                <div>
                  <p className="font-semibold text-left">{testimonial.name}</p>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
