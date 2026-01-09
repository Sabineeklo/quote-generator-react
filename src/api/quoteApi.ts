import type { Quote } from '../types';

export const fetchRandomQuote = async (): Promise<Quote> => {
  const response = await fetch('/api/api/random');
  if (!response.ok) {
    throw new Error('Failed to fetch quote');
  }

  const data = await response.json();

  return {
    _id: crypto.randomUUID(),
    content: data[0].q,
    author: data[0].a,
  };
};
