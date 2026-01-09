import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import QuoteCard from '../components/QuoteCard'
import type { Quote } from '../types'
import bg from '../assets/bg.jpg'
import { RiDislikeFill } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { IoArrowBackOutline } from 'react-icons/io5'

const getFavorites = (): Quote[] =>
  JSON.parse(localStorage.getItem('favorites') || '[]')

const Favorites = () => {
  const [favorites, setFavorites] = useState<Quote[]>(getFavorites())
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateFavorites = () => {
      setFavorites(getFavorites())
    }

    window.addEventListener('favoritesUpdated', updateFavorites)
    return () =>
      window.removeEventListener('favoritesUpdated', updateFavorites)
  }, [])

  const removeFavorite = (quote: Quote) => {
    const updated = favorites.filter(
      fav => fav.content !== quote.content
    )
    localStorage.setItem('favorites', JSON.stringify(updated))
    window.dispatchEvent(new Event('favoritesUpdated'))
    setFavorites(updated)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center pt-20 pb-10 gap-8 overflow-y-auto scroll-smooth"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Bouton retour Home */}
      <button
        onClick={() => navigate('/')}
        className="
          fixed top-6 left-6 z-50
          w-12 h-12 rounded-full
          bg-white/60 text-amber-950
          flex items-center justify-center
          shadow-2xl
          hover:bg-white/80 hover:scale-105
          transition
        "
        title="Retour à l'accueil"
      >
        <IoArrowBackOutline size={24} />
      </button>

      {/* Aucun favori */}
      {favorites.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center text-xl text-gray-700">
          <RiDislikeFill
            size={60}
            className="mb-4 text-red-700 animate-pulse"
          />
          <p className="mt-4 font-semibold bg-white/50 px-6 py-3 rounded">
            Aucune citation en favori pour le moment
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6">
          {favorites.map((quote, index) => (
            <motion.div
              key={quote.content}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <QuoteCard
                quote={quote}
                isFavorite
                onToggleFavorite={() => removeFavorite(quote)}
                hideReload
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
