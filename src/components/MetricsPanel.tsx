import type { Metrics } from "../lib/metrics"
import { COLUMNS_LIST } from "../data/seed"

export function MetricsPanel({ metrics }: { metrics: Metrics }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">Métricas</h3>
      <ul className="mt-2 space-y-1 text-xs text-[var(--color-foreground)]">
        <li className="flex justify-between gap-2">
          <span className="text-[var(--color-muted)]">Total</span>
          <span className="tabular-nums font-medium">{metrics.total}</span>
        </li>
        <li className="flex justify-between gap-2">
          <span className="text-[var(--color-muted)]">Throughput 7d</span>
          <span className="tabular-nums font-medium">{metrics.throughputLast7d}</span>
        </li>
        <li className="flex justify-between gap-2">
          <span className="text-[var(--color-muted)]">Cycle médio</span>
          <span className="tabular-nums font-medium">{metrics.cycleTimeDaysAvg.toFixed(1)}d</span>
        </li>
        <li className="flex justify-between gap-2">
          <span className="text-[var(--color-muted)]">Cycle p90</span>
          <span className="tabular-nums font-medium">{metrics.cycleTimeDaysP90.toFixed(1)}d</span>
        </li>
      </ul>
      <h4 className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">WIP por coluna</h4>
      <ul className="mt-1 space-y-0.5 text-xs">
        {COLUMNS_LIST.map((k) => (
          <li key={k} className="flex justify-between gap-2">
            <span className="capitalize text-[var(--color-muted)]">{k}</span>
            <span className="tabular-nums text-[var(--color-foreground)]">{metrics.wipByColumn[k] ?? 0}</span>
          </li>
        ))}
      </ul>
      <h4 className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">Por owner</h4>
      <ul className="mt-1 max-h-40 space-y-1 overflow-y-auto text-xs">
        {metrics.byOwner.map((o) => (
          <li key={o.owner} className="flex justify-between gap-2 border-b border-[var(--color-border)] pb-1 last:border-0">
            <span className="truncate text-[var(--color-foreground)]">{o.owner}</span>
            <span className="shrink-0 tabular-nums text-[var(--color-muted)]">
              {o.done}/{o.total} · {o.avgCycleDays.toFixed(1)}d
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
