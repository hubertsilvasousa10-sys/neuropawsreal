import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
    { q: "Esse método serve para filhotes?", a: "Sim! O método é adaptável e altamente benéfico para filhotes, ajudando a construir uma base sólida de calma e confiança desde cedo." },
    { q: "Preciso de materiais caros?", a: "Não. A maioria dos exercícios utiliza itens que você já tem em casa. O foco está na técnica e na interação, não em equipamentos." },
    { q: "Funciona para cachorros agressivos?", a: "O método foca em reduzir a ansiedade e reatividade, que são muitas vezes a raiz da agressividade. No entanto, recomendamos que casos de agressividade severa sejam sempre acompanhados por um profissional de comportamento canino qualificado." },
    { q: "Em quanto tempo vejo resultados?", a: "Muitos tutores relatam ver uma melhora no comportamento já na primeira semana. Resultados mais consolidados aparecem com 2 a 4 semanas de prática consistente." },
    { q: "E se eu não tiver tempo?", a: "O método foi pensado para rotinas ocupadas! Com apenas 10-15 minutos por dia, você consegue aplicar as técnicas e ver uma grande diferença." },
    { q: "E se meu cachorro for muito agitado?", a: "Perfeito! O método é especialmente eficaz para cães com alta energia, pois ensina a canalizar essa energia de forma positiva e a encontrar momentos de calma." },
    { q: "Preciso entender de adestramento?", a: "Absolutamente não. Nosso passo a passo é para tutores comuns, com uma linguagem simples e didática. Você não precisa de nenhuma experiência prévia." },
    { q: "Vou precisar dar remédios?", a: "Não. Nosso método é 100% natural, baseado em estímulos comportamentais e no fortalecimento do vínculo. Não envolve medicação." },
    { q: "Quantos minutos por dia?", a: "A consistência é mais importante que a duração. Recomendamos de 10 a 20 minutos diários para obter os melhores resultados." },
    { q: "Posso aplicar em mais de um cachorro?", a: "Sim, você pode aplicar as técnicas em todos os cães da sua casa. O acesso ao programa é seu e pode ser usado para quantos pets você tiver." },
    { q: "Tem garantia?", a: "Sim! Oferecemos uma garantia de satisfação de 7 dias. Se você não ficar satisfeito com o programa por qualquer motivo, basta pedir o reembolso e devolvemos 100% do seu investimento." },
];

export function FAQ() {
  return (
    <section className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl font-headline">Perguntas Frequentes</h2>
      <Accordion type="single" collapsible className="w-full mt-10">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-left text-lg hover:no-underline">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
