'use server';
/**
 * @fileOverview FAQ generator AI agent.
 *
 * - generateFaq - A function that generates FAQs based on input questions and answers.
 * - FaqGeneratorInput - The input type for the generateFaq function.
 * - FaqGeneratorOutput - The return type for the generateFaq function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FaqGeneratorInputSchema = z.object({
  productDescription: z
    .string()
    .describe('The description of the product for which FAQs are generated.'),
  userQuestions: z.array(z.string()).describe('An array of user questions about the product.'),
});
export type FaqGeneratorInput = z.infer<typeof FaqGeneratorInputSchema>;

const FaqGeneratorOutputSchema = z.array(
  z.object({
    question: z.string().describe('The FAQ question.'),
    answer: z.string().describe('The answer to the FAQ question.'),
  })
);
export type FaqGeneratorOutput = z.infer<typeof FaqGeneratorOutputSchema>;

export async function generateFaq(input: FaqGeneratorInput): Promise<FaqGeneratorOutput> {
  return faqGeneratorFlow(input);
}

const faqGeneratorPrompt = ai.definePrompt({
  name: 'faqGeneratorPrompt',
  input: {schema: FaqGeneratorInputSchema},
  output: {schema: FaqGeneratorOutputSchema},
  prompt: `You are an expert in creating FAQs for products.

  Based on the product description and a list of user questions, generate a list of frequently asked questions with detailed answers.

  Product Description: {{{productDescription}}}
  User Questions: {{#each userQuestions}}- {{{this}}}{{/each}}

  Format the output as a JSON array of objects, where each object has a question and answer field.
  The output should directly answer the user questions based on the provided product description.
  `,
});

const faqGeneratorFlow = ai.defineFlow(
  {
    name: 'faqGeneratorFlow',
    inputSchema: FaqGeneratorInputSchema,
    outputSchema: FaqGeneratorOutputSchema,
  },
  async input => {
    const {output} = await faqGeneratorPrompt(input);
    return output!;
  }
);
