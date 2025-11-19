import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
    { title: "Módulo 1: A Base da Calma", description: "Entenda a psicologia canina e a ciência por trás do estresse e da ansiedade." },
    { title: "Módulo 2: Ativação do Nervo Vago", description: "Aprenda exercícios práticos e massagens para estimular o sistema de relaxamento do seu cão." },
    { title: "Módulo 3: Enriquecimento Ambiental", description: "Transforme sua casa em um ambiente tranquilo e estimulante, que promove o bem-estar." },
    { title: "Módulo 4: Rotinas de Equilíbrio", description: "Crie uma rotina diária que diminui a reatividade e aumenta a previsibilidade para seu cachorro." },
    { title: "Módulo 5: Comunicação e Vínculo", description: "Fortaleça a conexão com seu pet através de técnicas de comunicação não-verbal." },
    { title: "E muito mais...", description: "Acesso a uma comunidade exclusiva, suporte de especialistas e atualizações constantes." }
];

export function WhatYouGet() {
  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">O que você vai receber?</h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
        Nosso programa é um passo a passo completo, em vídeo, para transformar a vida do seu cachorro (e a sua).
      </p>
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <Card key={index} className="text-left shadow-md hover:shadow-xl transition-shadow bg-card/80">
            <CardHeader className="flex flex-row items-start gap-4">
                <CheckCircle2 className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
                <div>
                  <CardTitle>{step.title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="pl-14 -mt-4">
                <p className="text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
