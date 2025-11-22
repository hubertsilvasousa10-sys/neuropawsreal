"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getPersonalizedRecommendations, type QuizInput } from '@/ai/flows/personalized-recommendations';
import { Logo } from './logo';

const QuizInputSchema = z.object({
  dogName: z.string().min(1, 'O nome do cachorro é obrigatório.'),
  ownerEmail: z.string().email('Por favor, insira um e-mail válido.'),
  anxiety: z.enum(['Sim, com frequência', 'Às vezes', 'Não'], { required_error: 'Selecione uma opção.' }),
  noiseReaction: z.enum(['Late muito / fica em alerta', 'Apenas observa', 'Não liga'], { required_error: 'Selecione uma opção.' }),
  destructiveBehavior: z.enum(['Sim, demais', 'Raramente', 'Nunca'], { required_error: 'Selecione uma opção.' }),
  vagusNerveKnowledge: z.enum(['Sim', 'Não', 'Não tenho certeza'], { required_error: 'Selecione uma opção.' }),
  timeDedicated: z.enum(['Menos de 10 minutos', '10 a 20 minutos', 'Mais de 20 minutos'], { required_error: 'Selecione uma opção.' }),
  guidedMethodInterest: z.enum(['Sim, quero', 'Talvez', 'Não'], { required_error: 'Selecione uma opção.' }),
});

const getQuestions = (dogName: string) => [
    { id: 'dogName', title: 'Primeiro, qual o nome do seu cachorro?', type: 'text' },
    { id: 'anxiety', title: `O(a) ${dogName || 'seu cachorro'} demonstra ansiedade, agitação ou dificuldade para relaxar?`, options: ['Sim, com frequência', 'Às vezes', 'Não'] },
    { id: 'noiseReaction', title: `${dogName ? `Como ${dogName} reage` : 'Como ele reage'} a barulhos ou movimentos (campainha, pessoas chegando, etc)?`, options: ['Late muito / fica em alerta', 'Apenas observa', 'Não liga'] },
    { id: 'destructiveBehavior', title: 'Ele(a) já destruiu objetos da casa? (sofá, chinelo, móveis…)', options: ['Sim, demais', 'Raramente', 'Nunca'] },
    { id: 'vagusNerveKnowledge', title: 'Você já ouviu falar sobre o nervo vago e como ele pode acalmar seu cão?', options: ['Sim', 'Não', 'Não tenho certeza'] },
    { id: 'timeDedicated', title: `Quanto tempo por dia você consegue dedicar para aplicar um método e acalmar o(a) ${dogName || 'seu cachorro'}?`, options: ['Menos de 10 minutos', '10 a 20 minutos', 'Mais de 20 minutos'] },
    { id: 'guidedMethodInterest', title: `E você, gostaria de seguir um método claro, passo a passo, para deixar ${dogName || 'seu cachorro'} calmo e equilibrado?`, options: ['Sim, quero', 'Talvez', 'Não'] },
    { id: 'ownerEmail', title: `Para finalizar, qual o seu melhor e-mail para receber a análise completa e uma oferta especial?`, type: 'email' },
] as const;

const commonEmailDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];

export function Quiz() {
  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  
  const form = useForm<z.infer<typeof QuizInputSchema>>({
    resolver: zodResolver(QuizInputSchema),
    defaultValues: {
      dogName: '',
      ownerEmail: '',
    },
    mode: 'onChange',
  });

  const dogName = form.watch('dogName');
  const ownerEmail = form.watch('ownerEmail');
  const questions = getQuestions(dogName);

  const currentQuestion = questions[step];
  const totalQuestions = questions.length;


  const onSubmit: SubmitHandler<QuizInput> = async (data) => {
    startTransition(async () => {
      try {
        const result = await getPersonalizedRecommendations(data);
        const recommendation = result.recommendation;
        router.push(`/sales/?recommendation=${encodeURIComponent(recommendation)}`);
      } catch (error) {
        console.error('Error submitting quiz:', error);
        // Redirect to sales page even if AI fails, but without recommendation
        router.push('/sales/');
      }
    });
  };
  
  const goToNextStep = () => {
    if (step < totalQuestions - 1) {
      setStep((prev) => prev + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const handleNextStepClick = async () => {
    const field = currentQuestion.id;
    const isValid = await form.trigger(field);
    if (isValid) {
      goToNextStep();
    }
  };

  const handleRadioChange = (value: string) => {
    const field = currentQuestion.id;
    // @ts-ignore
    form.setValue(field, value, { shouldValidate: true });
    setTimeout(() => {
        goToNextStep();
    }, 200);
  }

  const handleEmailDomainClick = (domain: string) => {
    const currentEmail = form.getValues('ownerEmail');
    const atIndex = currentEmail.indexOf('@');
    const baseEmail = atIndex !== -1 ? currentEmail.substring(0, atIndex) : currentEmail;
    form.setValue('ownerEmail', `${baseEmail}@${domain}`, { shouldValidate: true, shouldDirty: true });
  }

  const progress = ((step) / (totalQuestions - 1)) * 100;
  const showButton =
    "type" in currentQuestion &&
    (currentQuestion.type === "text" || currentQuestion.type === "email");

  return (
    <Card className="w-full max-w-xl shadow-2xl">
      <CardHeader className="items-center text-center">
        <Logo className="mb-4" />
        <CardTitle className="text-2xl font-bold">Quiz da Calma Canina</CardTitle>
        <CardDescription>Responda para descobrirmos a melhor solução para seu pet.</CardDescription>
        <Progress value={progress} className="w-full mt-4" />
      </CardHeader>
      <Form {...form}>
        <form onSubmit={(e) => { e.preventDefault(); if(showButton) handleNextStepClick(); }}>
          <CardContent className="min-h-[220px]">
            {step < totalQuestions && (
              <FormField
                control={form.control}
                name={currentQuestion.id}
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-lg text-center block font-semibold">{currentQuestion.title.replace('{dogName}', dogName || 'seu cachorro')}</FormLabel>
                    <FormControl>
                      {('type' in currentQuestion && (currentQuestion.type === 'text' || currentQuestion.type === 'email')) ? (
                        <div className="max-w-md mx-auto">
                          <Input {...field} type={currentQuestion.type} placeholder={`Digite aqui...`} />
                           {currentQuestion.id === 'ownerEmail' && ownerEmail && !ownerEmail.includes('@') && (
                            <div className="flex flex-wrap gap-2 mt-2 justify-center">
                              {commonEmailDomains.map((domain) => (
                                <Button
                                  key={domain}
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-auto py-1 px-2"
                                  onClick={() => handleEmailDomainClick(domain)}
                                >
                                  @{domain}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <RadioGroup onValueChange={handleRadioChange} value={field.value} className="flex flex-col items-center gap-2">
                          {'options' in currentQuestion && currentQuestion.options?.map((option) => (
                            <FormItem key={option} className="w-full max-w-md">
                              <FormControl>
                                <RadioGroupItem value={option} id={option} className="sr-only" />
                              </FormControl>
                              <Label htmlFor={option} className="flex items-center justify-center p-4 rounded-lg border-2 border-border cursor-pointer transition-colors hover:bg-accent has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary">
                                {option}
                              </Label>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      )}
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-center h-16">
            {showButton && (
                <Button type="submit" size="lg" disabled={isPending}>
                {isPending && step === totalQuestions - 1 ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analisando...
                    </>
                ) : (
                    step < totalQuestions - 1 ? (
                    <>
                        Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                    ) : (
                    "Ver resultado e solução"
                    )
                )}
                </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
