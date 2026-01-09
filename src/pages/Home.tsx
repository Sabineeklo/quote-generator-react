import { useEffect, useState } from 'react'
import QuoteCard from '../components/QuoteCard'
import Footer from '../components/Footer'
import bg from '../assets/bg.jpg'
import { MdOutlineFavorite } from 'react-icons/md'
import { useQuote } from '../hooks/useQuote'
import type { Quote } from '../types'
import { useNavigate } from 'react-router-dom'
import { BiMessageError } from 'react-icons/bi'

const getFavorites = (): Quote[] =>
  JSON.parse(localStorage.getItem('favorites') || '[]')

const Home = () => {
  const { quote, loading, error, getNewQuote } = useQuote()
  const [favoritesCount, setFavoritesCount] = useState(getFavorites().length)
  const navigate = useNavigate()

  useEffect(() => {
    getNewQuote()
  }, [])

  useEffect(() => {
    const updateCount = () => {
      setFavoritesCount(getFavorites().length)
    }

    window.addEventListener('favoritesUpdated', updateCount)
    return () =>
      window.removeEventListener('favoritesUpdated', updateCount)
  }, [])

  const favorites = getFavorites()
  const isFavorite =
    quote && favorites.some(fav => fav.content === quote.content)

  const toggleFavorite = () => {
    if (!quote) return

    const updated = isFavorite
      ? favorites.filter(fav => fav.content !== quote.content)
      : [...favorites, quote]

    localStorage.setItem('favorites', JSON.stringify(updated))
    window.dispatchEvent(new Event('favoritesUpdated'))
  }

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Bouton favoris */}
      <button
        onClick={() => navigate('/favorites')}
        className="
          fixed top-6 right-6 z-50
          w-12 h-12 rounded-full
          text-red-600/80 bg-white/50
          flex items-center justify-center
          shadow-2xl
          hover:bg-white/70 hover:scale-105
          transition
        "
        title="Favoris"
      >
        <MdOutlineFavorite size={24} />
        {favoritesCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {favoritesCount}
          </span>
        )}
      </button>

      {/* SLOT CARD (toujours à la même place) */}
      <div className="w-full h-full flex items-center justify-center">
        {loading && (
          <div className="flex items-center justify-center">
            <div className="border-8 border-white border-t-amber-800 rounded-full w-24 h-24 animate-spin" />
          </div>
        )}

        {!loading && error && (
          <div className="w-[85%] md:w-3/6 bg-white/60 p-8 rounded shadow-2xl text-center text-red-900">
            <BiMessageError size={60} className="animate-pulse mx-auto" />
            <p className="mt-4 text-xl font-semibold">
              Oups… une erreur est survenue
            </p>
          </div>
        )}

        {!loading && !error && quote && (
          <QuoteCard
            quote={quote}
            isFavorite={!!isFavorite}
            onToggleFavorite={toggleFavorite}
            onReload={getNewQuote}
          />
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Home
