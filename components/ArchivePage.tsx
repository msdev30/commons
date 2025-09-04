"use client"

import * as React from "react"

/** ---------- Types ---------- */
export type ViewMode = "grid" | "list"
export type SortKey = "recent" | "alpha"

export interface ArchiveItemBase {
  id: string
  title: string
  date?: string // ISO string when relevant
  tags?: string[]
  cover?: string // thumbnail
  summary?: string // short description
  link?: string // external or internal
}

export interface ArchiveColumn<T> {
  label: string
  render: (item: T) => React.ReactNode
  hideOnGrid?: boolean
}

export interface ArchiveActions<T> {
  primary: (item: T) => React.ReactNode // e.g., "Watch", "Download"
  secondary?: (item: T) => React.ReactNode // e.g., "View details"
}

export interface ArchiveTemplateProps<T extends ArchiveItemBase> {
  heading: string
  description?: string
  items: T[]
  columns: ArchiveColumn<T>[] // what metadata columns to show (esp. in list view)
  actions: ArchiveActions<T>
  sorts?: { key: SortKey; label: string; cmp: (a: T, b: T) => number }[]
  filters?: React.ReactNode // plug any custom filters you want
  emptyCta?: React.ReactNode // what to show when no items
  pageSize?: number
}

/** ---------- Small UI ---------- */
const Chip: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }> = ({
  active,
  className,
  ...p
}) => (
  <button
    {...p}
    className={[
      "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition",
      active ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50",
      className || "",
    ].join(" ")}
  />
)

const CardGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
)

function QuickTagFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const tags = ["STEM", "ELL", "Policy", "Funding", "Assessment"]
  return (
    <div className="flex items-center gap-2">
      {tags.map((t) => (
        <button
          key={t}
          onClick={() => onChange(value === t ? "" : t)}
          className={`text-xs rounded-full px-2.5 py-1 border ${value === t ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-800 border-gray-200"}`}
        >
          #{t}
        </button>
      ))}
    </div>
  )
}

/** ---------- Template ---------- */
export default function ArchivePage<T extends ArchiveItemBase>(props: ArchiveTemplateProps<T>) {
  const {
    heading,
    description,
    items,
    columns,
    actions,
    filters,
    sorts = [
      {
        key: "recent",
        label: "Most recent",
        cmp: (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime(),
      },
      { key: "alpha", label: "A → Z", cmp: (a, b) => a.title.localeCompare(b.title) },
    ],
    emptyCta,
    pageSize = 12,
  } = props

  const [q, setQ] = React.useState("")
  const [view, setView] = React.useState<ViewMode>("grid")
  const [sortKey, setSortKey] = React.useState<SortKey>(sorts[0]?.key || "recent")
  const sort = sorts.find((s) => s.key === sortKey) ?? sorts[0]

  const filtered = React.useMemo(() => {
    const text = q.toLowerCase()
    return items
      .filter((i) => [i.title, i.summary, ...(i.tags || [])].filter(Boolean).join(" ").toLowerCase().includes(text))
      .sort(sort.cmp)
  }, [items, q, sort])

  // Simple pagination
  const [page, setPage] = React.useState(1)
  React.useEffect(() => setPage(1), [q, sortKey, view, items.length])
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div>
            <div className="font-semibold">{heading}</div>
            {description && <div className="text-xs text-gray-500 -mt-0.5">{description}</div>}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Search ${heading.toLowerCase()}…`}
              className="w-[360px] rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
            />
            {filters}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Toolbar */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">{filtered.length}</span> results
            {q ? (
              <>
                {" "}
                · for "<span className="font-semibold">{q}</span>"
              </>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <Chip active={view === "grid"} onClick={() => setView("grid")}>
              Grid
            </Chip>
            <Chip active={view === "list"} onClick={() => setView("list")}>
              List
            </Chip>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm"
            >
              {sorts.map((s) => (
                <option key={s.key} value={s.key}>
                  Sort: {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {pageItems.length === 0 ? (
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-10 text-center">
            <div className="text-5xl mb-2">🗂️</div>
            <h3 className="text-lg font-semibold mb-2">No items yet</h3>
            {emptyCta || <p className="text-gray-600">Try adjusting your search.</p>}
          </div>
        ) : view === "list" ? (
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Title</th>
                  {columns.map((c, i) => (
                    <th key={i} className="px-4 py-3 text-left font-medium">
                      {c.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((item) => (
                  <tr key={item.id} className="border-t last:border-b">
                    <td className="px-4 py-3">
                      <div className="font-medium">{item.title}</div>
                      {item.summary && <div className="text-xs text-gray-500">{item.summary}</div>}
                      {!!item.tags?.length && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {item.tags!.map((t) => (
                            <span key={t} className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    {columns.map((c, i) => (
                      <td key={i} className="px-4 py-3">
                        {c.render(item)}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      {actions.primary(item)}
                      {actions.secondary ? <div className="mt-1">{actions.secondary(item)}</div> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <CardGrid>
            {pageItems.map((item) => (
              <article key={item.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                {item.cover && (
                  <div className="mb-3 rounded-xl overflow-hidden border border-gray-100 aspect-video">
                    <img src={item.cover || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
                  </div>
                )}
                <h3 className="text-base font-semibold">{item.title}</h3>
                {item.date && (
                  <div className="text-xs text-gray-500 mt-0.5">{new Date(item.date).toLocaleDateString()}</div>
                )}
                {item.summary && <p className="mt-2 text-sm text-gray-800 line-clamp-3">{item.summary}</p>}
                {!!item.tags?.length && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.tags!.map((t) => (
                      <span key={t} className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
                {/* show columns that aren't hidden for grid */}
                <div className="mt-3 grid grid-cols-1 gap-1 text-sm text-gray-700">
                  {columns
                    .filter((c) => !c.hideOnGrid)
                    .map((c, i) => (
                      <div key={i}>
                        <span className="text-gray-500 mr-1">{c.label}:</span>
                        {c.render(item)}
                      </div>
                    ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {actions.primary(item)}
                  {actions.secondary?.(item)}
                </div>
              </article>
            ))}
          </CardGrid>
        )}

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <div className="text-sm text-gray-600">
            Page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
          </div>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
