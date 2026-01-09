import { useState } from "react";
import type { Quote } from "../types";
import { fetchRandomQuote } from "../api/quoteApi"; 

export const useQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); 

    const getNewQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const newQuote = await fetchRandomQuote();
      console.log("newQuote:", newQuote);
        setQuote(newQuote);
    } catch (err) {
        setError((err as Error).message);
    } finally {
      setLoading(false);
    }  

    };
    return { quote, loading, error, getNewQuote };
};