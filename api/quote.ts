import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch('https://zenquotes.io/api/random')
    if (!response.ok) throw new Error('Impossible de récupérer la citation')

    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur lors de la récupération de la citation' })
  }
}
