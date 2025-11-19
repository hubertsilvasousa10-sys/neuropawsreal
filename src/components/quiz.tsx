"use client";

import { useState } from 'react';
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
import { submitQuiz } from '@/app/actions';
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

const questions = [
  { id: 'dogName', title: 'Qual o nome do seu cachorro?', type: 'text' },
  { id: 'ownerEmail', title: 'E qual o seu melhor e-mail?', type: 'email' },
  { id: 'anxiety', title: 'O seu cachorro demonstra ansiedade, agitação ou dificuldade para relaxar?', options: ['Sim, com frequência', 'Às vezes', 'Não'] },
  { id: 'noiseReaction', title: 'Seu cachorro reage muito a barulhos ou movimentos?', options: ['Late muito / fica em alerta', 'Apenas observa', 'Não liga'] },
  { id: 'destructiveBehavior', title: 'Ele já destruiu objetos da casa? (sofá, chinelo, móveis…)', options: ['Sim, demais', 'Raramente', 'Nunca'] },
  { id: 'vagusNerveKnowledge', title: 'Você já ouviu falar sobre o nervo vago do cachorro?', options: ['Sim', 'Não', 'Não tenho certeza'] },
  { id: 'timeDedicated', title: 'Quanto tempo por dia você consegue dedicar ao bem-estar do seu cachorro?', options: ['Menos de 10 minutos', '10 a 20 minutos', 'Mais de 20 minutos'] },
  { id: 'guidedMethodInterest', title: 'Você gostaria de um método guiado passo a passo para deixar seu cachorro calmo e equilibrado?', options: ['Sim, quero', 'Talvez', 'Não'] },
] as const;


export function Quiz() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[step];
  const totalQuestions = questions.length;

  const form = useForm<z.infer<typeof QuizInputSchema>>({
    resolver: zodResolver(QuizInputSchema),
    defaultValues: {
      dogName: '',
      ownerEmail: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof QuizInputSchema>> = async (data) => {
    setIsSubmitting(true);
    await submitQuiz(data);
    // The server action handles redirection
  };
  
  const handleNextStep = async () => {
    const field = currentQuestion.id;
    const isValid = await form.trigger(field);
    if (isValid) {
      if (step < totalQuestions - 1) {
        setStep((prev) => prev + 1);
      }
    }
  };
  
  // Need to use a form's submit handler for the last step
  const handleFinalStep = async () => {
    const field = currentQuestion.id;
    const isValid = await form.trigger(field);
    if (isValid) {
      form.handleSubmit(onSubmit)();
    }
  }

  const progress = ((step + 1) / totalQuestions) * 100;

  return (
    <Card className="w-full max-w-xl shadow-2xl">
      <CardHeader className="items-center text-center">
        <Logo className="mb-4" />
        <CardTitle className="text-2xl font-bold">Quiz da Calma Canina</CardTitle>
        <CardDescription>Responda para descobrirmos a melhor solução para seu pet.</CardDescription>
        <Progress value={progress} className="w-full mt-4" />
      </CardHeader>
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()}>
          <CardContent className="min-h-[220px]">
            {step < totalQuestions && (
              <FormField
                control={form.control}
                name={currentQuestion.id}
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-lg text-center block font-semibold">{currentQuestion.title}</FormLabel>
                    <FormControl>
                      {currentQuestion.type === 'text' || currentQuestion.type === 'email' ? (
                        <Input {...field} type={currentQuestion.type} placeholder={`Digite aqui...`} className="max-w-md mx-auto" />
                      ) : (
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col items-center gap-2">
                          {currentQuestion.options?.map((option) => (
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
          <CardFooter className="flex justify-center">
            {step < totalQuestions - 1 ? (
              <Button type="button" onClick={handleNextStep} size="lg">
                Continuar <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" onClick={handleFinalStep} size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  "Ver resultado e solução"
                )}
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
