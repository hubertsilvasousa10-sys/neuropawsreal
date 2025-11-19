import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  { name: "Juliana & Pipoca", text: "O Pipoca era outro cachorro! Não parava quieto. Hoje ele é super tranquilo, até as visitas se surpreendem. Mudou nossa vida.", imageId: "testimonial-1" },
  { name: "Marcos & Thor", text: "Eu não conseguia mais sair de casa, o Thor destruía tudo. O método foi um divisor de águas. Ele fica calmo e eu fico em paz.", imageId: "testimonial-2" },
  { name: "Carla & Luna", text: "Pensei que era caso perdido, a Luna latia pra tudo. Agora nossos passeios são um sonho. Recomendo de olhos fechados!", imageId: "testimonial-3" },
  { name: "Ana & Fred", text: "O Fred era muito medroso, se assustava com tudo. Agora ele é um cão confiante, até faz amizade com outros pets no parque. Incrível!", imageId: "testimonial-4" },
  { name: "Pedro & Belinha", text: "Minha cachorrinha sofria muito com ansiedade de separação. Depois de aplicar o método, ela fica super bem sozinha. Recomendo demais!", imageId: "testimonial-5" },
  { name: "Sofia & Max", text: "Max era super reativo em passeios, era um estresse. Hoje ele anda do meu lado, tranquilo. O método é simples e funciona de verdade.", imageId: "testimonial-6" },
  { name: "Lucas & Cacau", text: "Eu não sabia mais o que fazer com a energia da Cacau. Ela não parava! Com as técnicas, ela aprendeu a relaxar e agora temos momentos de paz.", imageId: "testimonial-7" },
  { name: "Beatriz & Bidu", text: "O Bidu roía todos os móveis. Achei que era mania, mas era ansiedade. O programa me ensinou a entender ele melhor e o comportamento sumiu.", imageId: "testimonial-8" },
  { name: "Gabriel & Mel", text: "A Mel chorava a noite toda, não nos deixava dormir. Com as dicas de enriquecimento ambiental, ela agora dorme tranquila e nós também!", imageId: "testimonial-9" },
];

export function Testimonials() {
  const images = PlaceHolderImages;

  return (
    <section className="w-full text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Donos de pets calmos e felizes</h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
        Veja o que outros tutores estão dizendo sobre a transformação Neuropaws.
      </p>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto mt-10"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => {
            const image = images.find(img => img.id === testimonial.imageId);
            return (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="flex flex-col shadow-sm h-full">
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
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
