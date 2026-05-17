import type { Card as TCard } from "../data/types"
import { COLUMNS_LIST } from "../data/seed"
import { groupByColumn } from "../lib/filter"
import { Column } from "./Column"

export function Board({ cards }: { cards: TCard[] }) {
  const byColumn = groupByColumn(cards)
  return (
    <div className="grid min-h-full auto-rows-fr grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {COLUMNS_LIST.map((id) => (
        <Column key={id} id={id} cards={byColumn[id] ?? []} />
      ))}
    </div>
  )
}
