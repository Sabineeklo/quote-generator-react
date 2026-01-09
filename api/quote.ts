import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch('https://zenquotes.io/api/random')
    if (!response.ok) throw new Error('Failed to fetch quote')

    const data = await response.json()

    const q = Array.isArray(data) ? data[0] : data

    res.status(200).json({
      _id: crypto.randomUUID(),
      content: q.q,
      author: q.a
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Impossible de récupérer la citation' })
  }
}
