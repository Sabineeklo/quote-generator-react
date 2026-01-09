import { useState } from 'react'
import type { Quote } from '../types'

export const useQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getNewQuote = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/quote')
      if (!res.ok) throw new Error('Erreur lors de la récupération de la citation')

      const data = await res.json()

      const newQuote = Array.isArray(data) ? data[0] : data
      setQuote(newQuote)
    } catch (err) {
      console.error(err as Error)
      setError((err as Error).message);
    } finally {
      setLoading(false)
    }
  }

  return { quote, loading, error, getNewQuote }
}
