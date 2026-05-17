import { useState } from "react"
import { generateCards } from "./data/seed"
import { useFilters } from "./hooks/useFilters"
import { filterCards } from "./lib/filter"
import { computeMetrics } from "./lib/metrics"
import { Board } from "./components/Board"
import { FilterBar } from "./components/FilterBar"
import { MetricsPanel } from "./components/MetricsPanel"

const SEED = generateCards(500)

export default function App() {
  const { filters, setQuery, toggle, reset } = useFilters()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const filtered = filterCards(SEED, filters)
  const metrics = computeMetrics(filtered)

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"))

  return (
    <div
      className={`flex h-full min-h-0 flex-col bg-[var(--color-surface)] text-[var(--color-foreground)] ${theme === "dark" ? "dark" : ""}`}
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--color-border)] px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-muted)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-foreground)]"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {sidebarOpen ? <path d="M15 19l-7-7 7-7" /> : <path d="M9 5l7 7-7 7" />}
            </svg>
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold tracking-tight">FlowDeck</h1>
            <p className="truncate text-xs text-[var(--color-muted)]">Design agency board</p>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] transition hover:text-[var(--color-foreground)]"
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside
          className={`shrink-0 overflow-hidden border-[var(--color-border)] bg-[var(--color-surface-elevated)] transition-[width,opacity] duration-200 ease-out ${
            sidebarOpen ? "w-80 border-r opacity-100" : "w-0 border-0 opacity-0"
          }`}
        >
          <div className="flex h-full w-80 flex-col gap-4 overflow-y-auto p-4">
            <FilterBar filters={filters} onQuery={setQuery} onToggle={toggle} onReset={reset} />
            <MetricsPanel metrics={metrics} />
          </div>
        </aside>

        <main className="min-h-0 min-w-0 flex-1 overflow-auto p-4">
          <Board cards={filtered} />
        </main>
      </div>
    </div>
  )
}
