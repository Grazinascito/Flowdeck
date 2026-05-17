import { CLIENTS_LIST, OWNERS_LIST, TAGS_LIST, PRIORITIES_LIST } from "../data/seed"
import type { Filters, Priority } from "../data/types"

type Props = {
  filters: Filters
  onQuery: (q: string) => void
  onToggle: (key: "clients" | "owners" | "tags" | "priorities", value: string) => void
  onReset: () => void
}

export function FilterBar({ filters, onQuery, onToggle, onReset }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <label htmlFor="flowdeck-search" className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-[var(--color-muted)]">
          Busca
        </label>
        <input
          id="flowdeck-search"
          placeholder="Título ou descrição"
          value={filters.query}
          onChange={(e) => onQuery(e.target.value)}
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-2 text-sm text-[var(--color-foreground)] outline-none ring-[var(--color-accent)] placeholder:text-[var(--color-muted)] focus:ring-2"
        />
      </div>
      <Group label="Clientes" items={CLIENTS_LIST} selected={filters.clients} onToggle={(v) => onToggle("clients", v)} />
      <Group label="Owners" items={OWNERS_LIST} selected={filters.owners} onToggle={(v) => onToggle("owners", v)} />
      <Group label="Tags" items={TAGS_LIST} selected={filters.tags} onToggle={(v) => onToggle("tags", v)} />
      <Group
        label="Prioridade"
        items={PRIORITIES_LIST as unknown as string[]}
        selected={filters.priorities}
        onToggle={(v) => onToggle("priorities", v as Priority)}
      />
      <button
        type="button"
        onClick={onReset}
        className="rounded-md border border-[var(--color-border)] py-2 text-xs font-medium text-[var(--color-muted)] transition hover:bg-[var(--color-surface)] hover:text-[var(--color-foreground)]"
      >
        Limpar filtros
      </button>
    </div>
  )
}

function Group({
  label,
  items,
  selected,
  onToggle,
}: {
  label: string
  items: readonly string[]
  selected: readonly string[]
  onToggle: (v: string) => void
}) {
  return (
    <fieldset className="rounded-md border border-[var(--color-border)] p-2">
      <legend className="px-1 text-[10px] font-medium uppercase tracking-wide text-[var(--color-muted)]">{label}</legend>
      <div className="mt-1 grid max-h-32 grid-cols-2 gap-1 overflow-y-auto text-xs">
        {items.map((it) => (
          <label key={it} className="flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 hover:bg-[var(--color-surface)]">
            <input
              type="checkbox"
              checked={selected.includes(it)}
              onChange={() => onToggle(it)}
              className="h-3.5 w-3.5 rounded border-[var(--color-border)] text-[var(--color-accent)]"
            />
            <span className="truncate text-[var(--color-foreground)]">{it}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
