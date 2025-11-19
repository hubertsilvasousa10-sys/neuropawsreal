'use server';

import { getPersonalizedRecommendations, type QuizInput } from '@/ai/flows/personalized-recommendations';
import { redirect } from 'next/navigation';

export async function submitQuiz(data: QuizInput) {
  try {
    const result = await getPersonalizedRecommendations(data);
    const recommendation = result.recommendation;
    redirect(`/sales?recommendation=${encodeURIComponent(recommendation)}`);
  } catch (error) {
    console.error('Error submitting quiz:', error);
    // Redirect to sales page even if AI fails, but without recommendation
    redirect('/sales');
  }
}
