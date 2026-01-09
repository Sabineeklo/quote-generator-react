import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri'
import { TbReload, TbShare } from 'react-icons/tb'
import { MdOutlineFavorite } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { useQuote } from '../hooks/useQuote'
import { BiMessageError } from 'react-icons/bi'
import toast from 'react-hot-toast'
import type { Quote } from '../types'

const QuoteCard = () => {
  const { quote, loading, error, getNewQuote } = useQuote()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    getNewQuote()
  }, [])

  useEffect(() => {
    if (!quote) return

    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    )

    const exists = favorites.some(
      (fav: Quote) => fav.content === quote.content
    )

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFavorite(exists)  // a corriger
  }, [quote])

  const handleFavorite = () => {
    if (!quote) return

    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    )

    if (isFavorite) {
      const updated = favorites.filter(
        (fav: Quote) => fav.content !== quote.content
      )
      localStorage.setItem('favorites', JSON.stringify(updated))
      setIsFavorite(false)
    } else {
      favorites.push(quote)
      localStorage.setItem('favorites', JSON.stringify(favorites))
      setIsFavorite(true)
    }
  }

  const handleShare = async () => {
    if (!quote) return

    const text = `"${quote.content}" — ${quote.author}`

    if (navigator.share) {
      await navigator.share({
        title: 'Citation inspirante',
        text,
      })
    } else {
      await navigator.clipboard.writeText(text)
      toast.success('Citation copiée dans le presse-papiers !')
    }
  }

  if (loading) {
    return (
      <div className="border-8 border-white border-t-amber-800 rounded-full w-24 h-24 animate-spin mx-auto" />
    )
  }

  if (error) {
    return (
      <div className="bg-white/60 text-red-900 text-2xl font-semibold text-center p-5 rounded-md">
        <BiMessageError size={60} className="animate-pulse mx-auto" />
        <br />
        Oups... une erreur est survenue
      </div>
    )
  }

  return (
    <div className="w-[90%] md:w-3/6 mx-auto bg-white/40 px-8 py-5 rounded shadow-2xl flex flex-col gap-4 md:gap-5 text-center">
      <p className="text-2xl md:text-4xl py-2 md:py-4">
        <RiDoubleQuotesL size={28} className="inline font-bold" />{' '}
        {quote?.content}{' '}
        <RiDoubleQuotesR size={28} className="inline font-bold" />
      </p>

      <hr className="border-red-950 w-1/2 mx-auto" />

      <p className="text-lg md:text-xl italic">{quote?.author}</p>

      <div className="flex justify-end gap-4 md:gap-6 mt-2">
        <button
          onClick={handleFavorite}
          className={`font-bold ${
            isFavorite ? 'text-red-700' : 'text-red-400'
          }`}
          title="Ajouter aux favoris"
        >
          <MdOutlineFavorite size={28} />
        </button>

        <button
          onClick={handleShare}
          className="text-green-600 font-bold"
          title="Partager"
        >
          <TbShare size={28} />
        </button>

        <button
          onClick={getNewQuote}
          className="text-blue-600 font-bold"
          title="Nouvelle citation"
        >
          <TbReload size={28} />
        </button>
      </div>
    </div>
  )
}

export default QuoteCard
