import type { Card } from "../data/types"

const day = 86_400_000

export type Metrics = {
  total: number
  wipByColumn: Record<string, number>
  cycleTimeDaysAvg: number
  cycleTimeDaysP90: number
  throughputLast7d: number
  byOwner: { owner: string; total: number; done: number; avgCycleDays: number }[]
}

export function computeMetrics(cards: Card[]): Metrics {
  const wipByColumn: Record<string, number> = {}
  for (const c of cards) wipByColumn[c.column] = (wipByColumn[c.column] ?? 0) + 1
  const cycles: number[] = []
  const now = Date.now()
  let throughputLast7d = 0
  const byOwnerAcc: Record<string, { total: number; done: number; cycles: number[] }> = {}
  for (const c of cards) {
    let acc = byOwnerAcc[c.owner]
    if (!acc) {
      acc = { total: 0, done: 0, cycles: [] }
      byOwnerAcc[c.owner] = acc
    }
    acc.total++
    if (c.doneAt) {
      acc.done++
      const doneTime = new Date(c.doneAt).getTime()
      const startTime = new Date(c.startedAt ?? c.createdAt).getTime()
      const cycle = (doneTime - startTime) / day
      cycles.push(cycle)
      acc.cycles.push(cycle)
      if (now - doneTime <= 7 * day) throughputLast7d++
    }
  }
  cycles.sort((a, b) => a - b)
  const avg = cycles.length ? cycles.reduce((s, n) => s + n, 0) / cycles.length : 0
  const p90 = cycles.length ? cycles[Math.floor(cycles.length * 0.9)] : 0
  return {
    total: cards.length,
    wipByColumn,
    cycleTimeDaysAvg: avg,
    cycleTimeDaysP90: p90,
    throughputLast7d,
    byOwner: Object.entries(byOwnerAcc)
      .map(([owner, v]) => ({
        owner,
        total: v.total,
        done: v.done,
        avgCycleDays: v.cycles.length ? v.cycles.reduce((s, n) => s + n, 0) / v.cycles.length : 0,
      }))
      .sort((a, b) => b.total - a.total),
  }
}

/** Expensive on purpose — for future optimization exercises in the PDF. */
export function buildSearchIndex(cards: Card[]) {
  const map = new Map<string, Set<string>>()
  for (const c of cards) {
    const text = `${c.title} ${c.description} ${c.client} ${c.owner} ${c.tags.join(" ")}`.toLowerCase()
    for (let i = 0; i < text.length - 2; i++) {
      const tri = text.slice(i, i + 3)
      let set = map.get(tri)
      if (!set) {
        set = new Set()
        map.set(tri, set)
      }
      set.add(c.id)
    }
  }
  return map
}
