'use server';
// src/ai/flows/personalized-recommendations.ts

/**
 * @fileOverview A flow that provides personalized product recommendations based on the quiz answers.
 *
 * - getPersonalizedRecommendations - A function that handles the recommendation process.
 * - QuizInput - The input type for the getPersonalizedRecommendations function.
 * - RecommendationOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuizInputSchema = z.object({
  dogName: z.string().describe('The name of the dog.'),
  ownerEmail: z.string().email().describe('The email of the dog owner.'),
  anxiety: z.enum(['Sim, com frequência', 'Às vezes', 'Não']).describe('Does the dog demonstrate anxiety?'),
  noiseReaction: z.enum(['Late muito / fica em alerta', 'Apenas observa', 'Não liga']).describe('How does the dog react to noises?'),
  destructiveBehavior: z.enum(['Sim, demais', 'Raramente', 'Nunca']).describe('Has the dog destroyed objects?'),
  vagusNerveKnowledge: z.enum(['Sim', 'Não', 'Não tenho certeza']).describe('Is the owner familiar with the vagus nerve?'),
  timeDedicated: z.enum(['Menos de 10 minutos', '10 a 20 minutos', 'Mais de 20 minutos']).describe('How much time can the owner dedicate?'),
  guidedMethodInterest: z.enum(['Sim, quero', 'Talvez', 'Não']).describe('Is the owner interested in a guided method?'),
});

export type QuizInput = z.infer<typeof QuizInputSchema>;

const RecommendationOutputSchema = z.object({
  recommendation: z.string().describe('Personalized product recommendations based on the quiz answers.'),
});

export type RecommendationOutput = z.infer<typeof RecommendationOutputSchema>;

export async function getPersonalizedRecommendations(input: QuizInput): Promise<RecommendationOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: QuizInputSchema},
  output: {schema: RecommendationOutputSchema},
  prompt: `You are an AI assistant specialized in providing personalized product recommendations for dog calming solutions based on a quiz. The quiz captures information about the dog's anxiety levels, reaction to noises, destructive behavior, the owner's knowledge of the vagus nerve, time dedicated to the dog's well-being, and interest in a guided method.

  Based on the following quiz answers, provide a concise and helpful product recommendation:

  Dog's Name: {{{dogName}}}
  Owner's Email: {{{ownerEmail}}}
  Anxiety: {{{anxiety}}}
  Noise Reaction: {{{noiseReaction}}}
  Destructive Behavior: {{{destructiveBehavior}}}
  Vagus Nerve Knowledge: {{{vagusNerveKnowledge}}}
  Time Dedicated: {{{timeDedicated}}}
  Guided Method Interest: {{{guidedMethodInterest}}}
  `,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: QuizInputSchema,
    outputSchema: RecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
