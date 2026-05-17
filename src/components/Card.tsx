import type { Card as TCard, Priority } from "../data/types"

const PRIORITY_BORDER: Record<Priority, string> = {
  low: "border-l-emerald-500/80",
  medium: "border-l-amber-500/80",
  high: "border-l-orange-500/80",
  urgent: "border-l-rose-500",
}

export function Card({ card }: { card: TCard }) {
  return (
    <li
      className={`list-none rounded-md border border-[var(--color-border)] border-l-4 bg-[var(--color-surface)] p-3 shadow-sm ${PRIORITY_BORDER[card.priority]}`}
    >
      <strong className="block text-sm font-medium leading-snug text-[var(--color-foreground)]">{card.title}</strong>
      <div className="mt-1.5 flex flex-wrap items-center gap-1 text-xs text-[var(--color-muted)]">
        <span>{card.client}</span>
        <span aria-hidden>·</span>
        <span>{card.owner}</span>
        <span aria-hidden>·</span>
        <span className="tabular-nums">{card.estimateHours}h</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {card.tags.map((t) => (
          <span
            key={t}
            className="rounded bg-[var(--color-surface-elevated)] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--color-muted)] ring-1 ring-[var(--color-border)]"
          >
            #{t}
          </span>
        ))}
      </div>
    </li>
  )
}
