import type { Card, Filters } from "../data/types"

export function filterCards(cards: Card[], f: Filters): Card[] {
  const q = f.query.trim().toLowerCase()
  return cards.filter((c) => {
    if (q && !(c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))) return false
    if (f.clients.length && !f.clients.includes(c.client)) return false
    if (f.owners.length && !f.owners.includes(c.owner)) return false
    if (f.priorities.length && !f.priorities.includes(c.priority)) return false
    if (f.tags.length && !f.tags.some((t) => c.tags.includes(t))) return false
    return true
  })
}

export function groupByColumn<C extends { column: string }>(cards: C[]) {
  const out: Record<string, C[]> = {}
  for (const c of cards) (out[c.column] || (out[c.column] = [])).push(c)
  return out
}
