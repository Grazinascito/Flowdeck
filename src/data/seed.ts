import type { Card, ColumnId, Priority } from "./types"

export const CLIENTS_LIST = [
  "Acme",
  "Globex",
  "Initech",
  "Umbrella",
  "Wayne",
  "Stark",
  "Hooli",
  "Pied Piper",
] as const
export const OWNERS_LIST = [
  "Ana",
  "Bruno",
  "Camila",
  "Diego",
  "Elis",
  "Fábio",
  "Gabi",
  "Hugo",
] as const
export const TAGS_LIST = [
  "design",
  "research",
  "copy",
  "frontend",
  "review",
  "client-call",
  "polish",
  "spec",
  "asset",
] as const
export const COLUMNS_LIST: ColumnId[] = ["backlog", "todo", "doing", "review", "done"]
export const PRIORITIES_LIST: Priority[] = ["low", "medium", "high", "urgent"]

function mulberry32(a: number) {
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(42)
const pick = <T,>(a: readonly T[]) => a[Math.floor(rand() * a.length)]
const pickMany = <T,>(a: readonly T[], min: number, max: number) => {
  const n = min + Math.floor(rand() * (max - min + 1))
  const copy = [...a]
  const out: T[] = []
  for (let i = 0; i < n && copy.length; i++) out.push(copy.splice(Math.floor(rand() * copy.length), 1)[0])
  return out
}

const now = Date.now()
const day = 86_400_000

export function generateCards(n = 500): Card[] {
  const cards: Card[] = []
  for (let i = 0; i < n; i++) {
    const column = pick(COLUMNS_LIST)
    const createdOffset = Math.floor(rand() * 60) * day
    const createdAt = new Date(now - createdOffset).toISOString()
    let startedAt: string | undefined
    let doneAt: string | undefined
    if (column !== "backlog" && column !== "todo")
      startedAt = new Date(now - createdOffset + Math.floor(rand() * 5) * day).toISOString()
    if (column === "done") doneAt = new Date(now - createdOffset + Math.floor(rand() * 20 + 5) * day).toISOString()
    cards.push({
      id: `card-${i + 1}`,
      title: `Tarefa ${i + 1} — ${pick(["Wireframe", "Hi-fi", "Brief", "Audit", "Sprint review"])}`,
      description: "Lorem ipsum dolor sit amet.",
      client: pick(CLIENTS_LIST),
      owner: pick(OWNERS_LIST),
      tags: pickMany(TAGS_LIST, 1, 3),
      priority: pick(PRIORITIES_LIST),
      estimateHours: 1 + Math.floor(rand() * 16),
      column,
      createdAt,
      startedAt,
      doneAt,
      dueAt: new Date(now + Math.floor(rand() * 30 - 5) * day).toISOString(),
    })
  }
  return cards
}
