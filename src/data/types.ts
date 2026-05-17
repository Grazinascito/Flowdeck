export type ColumnId = "backlog" | "todo" | "doing" | "review" | "done"
export type Priority = "low" | "medium" | "high" | "urgent"
export type Card = {
  id: string
  title: string
  description: string
  client: string
  owner: string
  tags: string[]
  priority: Priority
  estimateHours: number
  column: ColumnId
  createdAt: string
  startedAt?: string
  doneAt?: string
  dueAt?: string
}
export type Filters = {
  query: string
  clients: string[]
  owners: string[]
  tags: string[]
  priorities: Priority[]
}
