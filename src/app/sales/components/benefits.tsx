import { Heart, Moon, Shield, Home, Users, Smile } from 'lucide-react';

const benefits = [
  { icon: Shield, title: "Redução de ansiedade", description: "Técnicas que acalmam o sistema nervoso do seu cão, diminuindo o estresse diário." },
  { icon: Moon, title: "Melhora no sono", description: "Um cão mais relaxado dorme melhor, o que é vital para sua saúde física e mental." },
  { icon: Home, title: "Menos destruição", description: "Um cão equilibrado não precisa extravasar sua ansiedade destruindo seus pertences." },
  { icon: Heart, title: "Vínculo mais forte", description: "O processo de cuidado conjunto cria uma conexão mais profunda e de confiança entre vocês." },
  { icon: Users, title: "Passeios tranquilos", description: "Tenha passeios mais prazerosos, sem puxões e latidos excessivos a outros cães." },
  { icon: Smile, title: "Mais felicidade", description: "Um cachorro calmo é um cachorro feliz, e um dono feliz. É um ciclo de bem-estar." },
];

export function Benefits() {
  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Principais Benefícios</h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
        Veja como a vida do seu melhor amigo (e a sua) vai mudar para melhor.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-sm border border-border/50">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
              <benefit.icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">{benefit.title}</h3>
            <p className="mt-2 text-muted-foreground">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
