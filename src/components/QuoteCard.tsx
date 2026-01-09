import { RiDislikeFill, RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri'
import { TbReload, TbShare } from 'react-icons/tb'
import { MdOutlineFavorite } from 'react-icons/md'
import toast from 'react-hot-toast'
import type { Quote } from '../types'

type QuoteCardProps = {
  quote: Quote
  isFavorite?: boolean
  hideReload?: boolean
  onToggleFavorite?: () => void
  onReload?: () => void
}

const QuoteCard = ({
  quote,
  isFavorite = false,
  hideReload = false,
  onToggleFavorite,
  onReload,
}: QuoteCardProps) => {
  const handleShare = async () => {
    const text = `"${quote.content}" — ${quote.author}`

    if (navigator.share) {
      await navigator.share({ title: 'Citation inspirante', text })
    } else {
      await navigator.clipboard.writeText(text)
      toast.success('Citation copiée dans le presse-papiers !')
    }
  }

  return (
    <div className="w-[85%] md:w-3/6 mx-auto bg-white/40 px-8 py-5 rounded shadow-2xl flex flex-col gap-4 md:gap-5 text-center">
      <p className="text-2xl md:text-4xl py-2 md:py-4">
        <RiDoubleQuotesL size={28} className="inline font-bold" />{' '}
        {quote.content}{' '}
        <RiDoubleQuotesR size={28} className="inline font-bold" />
      </p>

      <hr className="border-red-950 w-1/2 mx-auto" />

      <p className="text-lg md:text-xl italic">{quote.author}</p>

      <div className="flex justify-end gap-4 md:gap-6 mt-2">
        {onToggleFavorite && (
          <button
            onClick={onToggleFavorite}
            className={`font-bold ${
              isFavorite ? 'text-red-700' : 'text-red-400'
            }`}
            title={
              isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'
            }
          >
            {!isFavorite ? (
              <MdOutlineFavorite size={28} />
            ) : (
              <RiDislikeFill size={28} />
            )}
          </button>
        )}

        <button
          onClick={handleShare}
          className="text-green-600 font-bold"
          title="Partager"
        >
          <TbShare size={28} />
        </button>

        {onReload && !hideReload && (
          <button
            onClick={onReload}
            className="text-blue-600 font-bold"
            title="Nouvelle citation"
          >
            <TbReload size={28} />
          </button>
        )}
      </div>
    </div>
  )
}

export default QuoteCard
