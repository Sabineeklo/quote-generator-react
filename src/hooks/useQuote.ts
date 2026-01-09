import { useState } from "react";
import type { Quote } from "../types";

export const useQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getNewQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/quote");
      if (!res.ok) throw new Error("Impossible de récupérer la citation");

      const data: Quote = await res.json();
      setQuote(data);
    } catch (err) {
      console.error(err);
     setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { quote, loading, error, getNewQuote };
};
