import type { Card as TCard, ColumnId } from "../data/types"
import { Card } from "./Card"

const COLUMN_LABEL: Record<ColumnId, string> = {
  backlog: "Backlog",
  todo: "Todo",
  doing: "Doing",
  review: "Review",
  done: "Done",
}

export function Column({ id, cards }: { id: ColumnId; cards: TCard[] }) {
  return (
    <section className="flex min-h-[12rem] flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
      <header className="flex items-center justify-between border-b border-[var(--color-border)] px-3 py-2">
        <h2 className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">{COLUMN_LABEL[id]}</h2>
        <span className="rounded-md bg-[var(--color-surface)] px-2 py-0.5 text-xs tabular-nums text-[var(--color-foreground)]">
          {cards.length}
        </span>
      </header>
      <ul className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-2">
        {cards.map((c) => (
          <Card key={c.id} card={c} />
        ))}
      </ul>
    </section>
  )
}
