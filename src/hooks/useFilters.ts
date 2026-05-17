import { useState } from "react"
import type { Filters } from "../data/types"

const initial: Filters = { query: "", clients: [], owners: [], tags: [], priorities: [] }

export function useFilters() {
  const [filters, setFilters] = useState<Filters>(initial)
  const setQuery = (query: string) => setFilters((f) => ({ ...f, query }))
  const toggle = (key: "clients" | "owners" | "tags" | "priorities", value: string) =>
    setFilters((f) => {
      const arr = f[key] as string[]
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
      return { ...f, [key]: next } as Filters
    })
  const reset = () => setFilters(initial)
  return { filters, setQuery, toggle, reset }
}
