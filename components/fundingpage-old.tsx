"use client"

import * as React from "react"

/* =========================================
   Types
========================================= */
type ViewMode = "grid" | "list"
type SortKey = "relevance" | "deadline" | "amount"
type GrantType = "Grant" | "Fellowship" | "Scholarship" | "Prize" | "Stipend"
type Audience =
  | "K-12 Teachers"
  | "School/District"
  | "Researchers"
  | "EdTech Companies"
  | "Nonprofits"
  | "Higher Ed"
  | "Students"
type Modality =
  | "Professional Development"
  | "Classroom Project"
  | "Curriculum"
  | "Equipment"
  | "Conference Travel"
type GeoScope = "US (National)" | "State/Local" | "International"

interface Grant {
  id: string
  title: string
  sponsor: string
  type: GrantType
  audience: Audience[]
  modalities: Modality[]
  location?: string // e.g., "FL", "NY", "Remote"
  geo: GeoScope
  amountMin?: number // USD
  amountMax?: number // USD
  deadline?: string // ISO date
  rolling?: boolean
  matchRequired?: boolean
  summary: string
  tags?: string[]
  link?: string
}

/* =========================================
   Mock data (replace with API)
========================================= */
const GRANTS: Grant[] = [
  {
    id: "g1",
    title: "Title I: Classroom Innovation Micro-Grants",
    sponsor: "Erudyte Foundation",
    type: "Grant",
    audience: ["K-12 Teachers", "School/District"],
    modalities: ["Classroom Project", "Equipment", "Curriculum"],
    geo: "US (National)",
    amountMin: 2000,
    amountMax: 10000,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 28).toISOString(), // ~4 weeks
    matchRequired: false,
    summary:
      "Supports high-impact projects that raise achievement for multilingual learners and students with learning differences. Funds materials, small equipment, or co-developed curriculum pilots.",
    tags: ["Multilingual Learners", "Inclusion", "STEM"],
    link: "#",
  },
  {
    id: "g2",
    title: "ELL / MLL Professional Growth Fellowship",
    sponsor: "Future Educators Collaborative",
    type: "Fellowship",
    audience: ["K-12 Teachers", "Higher Ed"],
    modalities: ["Professional Development", "Conference Travel"],
    geo: "US (National)",
    amountMin: 5000,
    amountMax: 15000,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
    matchRequired: false,
    summary:
      "One-year fellowship to scale culturally responsive, bilingual classroom strategies. Includes PD stipend, travel support, and a peer learning network.",
    tags: ["PD", "Bilingual", "Equity"],
    link: "#",
  },
  {
    id: "g3",
    title: "State STEM Lab Upgrade (Florida)",
    sponsor: "Florida Department of Education",
    type: "Grant",
    audience: ["School/District"],
    modalities: ["Equipment", "Curriculum"],
    location: "FL",
    geo: "State/Local",
    amountMin: 25000,
    amountMax: 100000,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 16).toISOString(),
    matchRequired: true,
    summary:
      "Capital and materials funding for district STEM labs modernizing equipment aligned to state standards (BEST) with priority for Title I schools.",
    tags: ["Florida", "STEM", "BEST"],
    link: "#",
  },
  {
    id: "g4",
    title: "Open Research Prize: K-12 Data Interoperability",
    sponsor: "Education Data Trust",
    type: "Prize",
    audience: ["Researchers", "EdTech Companies"],
    modalities: ["Curriculum", "Professional Development"],
    geo: "International",
    amountMin: 0,
    amountMax: 50000,
    rolling: true,
    summary:
      "Annual rolling prize for open-source tools that improve K-12 data contracts, interoperability, and privacy-preserving analytics.",
    tags: ["Open Source", "Data Contracts", "Privacy"],
    link: "#",
  },
  {
    id: "g5",
    title: "Teacher Scholarship—STEM Conference Travel",
    sponsor: "National STEM Council",
    type: "Scholarship",
    audience: ["K-12 Teachers", "Students"],
    modalities: ["Conference Travel", "Professional Development"],
    geo: "US (National)",
    amountMin: 1200,
    amountMax: 3000,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8).toISOString(), // ~1 week
    summary:
      "Travel and lodging support for educators presenting on multilingual STEM or inclusive pedagogy at national conferences.",
    tags: ["Travel", "STEM", "Inclusion"],
    link: "#",
  },
]

/* =========================================
   Utilities
========================================= */
const toUSD = (n?: number) =>
  typeof n === "number"
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
    : "—"

const dateLabel = (iso?: string, rolling?: boolean) => {
  if (rolling) return "Rolling"
  if (!iso) return "—"
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
}

const daysUntil = (iso?: string) => {
  if (!iso) return undefined
  const diff = Math.ceil((new Date(iso).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  return diff
}

function fileDownload(filename: string, data: string, type = "text/calendar") {
  const blob = new Blob([data], { type })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
}

function makeICS(grant: Grant) {
  // If you already have a UTC string, normalize and keep Z
  const dt = grant.deadline
    ? new Date(grant.deadline).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    : undefined;

  // Escape TEXT per RFC 5545: backslash, comma, semicolon, newline
  const icsEscape = (s: string) =>
    (s || "")
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
      .replace(/\r?\n/g, "\\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Erudyte//Funding//EN",
    "BEGIN:VEVENT",
    `UID:${grant.id}@erudyte-funding`,
    dt ? `DTSTART:${dt}` : undefined,
    dt ? `DTEND:${dt}` : undefined,
    `SUMMARY:${icsEscape(`${grant.title} — Deadline`)}`,
    `DESCRIPTION:${icsEscape(`${grant.sponsor} | ${grant.summary || ""}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean) as string[];

  return lines.join("\r\n");
}


/* =========================================
   Small UI pieces
========================================= */
const Badge: React.FC<{ children: React.ReactNode; tone?: "default" | "success" | "warning" | "danger" }> = ({
  children,
  tone = "default",
}) => {
  const base = "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold"
  const map = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-green-50 text-green-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-rose-50 text-rose-700",
  } as const
  return <span className={`${base} ${map[tone]}`}>{children}</span>
}

const Chip: React.FC<{ active?: boolean; onClick?: () => void; children: React.ReactNode }> = ({
  active,
  onClick,
  children,
}) => (
  <button
    onClick={onClick}
    className={[
      "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition",
      active ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50",
    ].join(" ")}
  >
    {children}
  </button>
)

const Icon = {
  Search: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="11" cy="11" r="7" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" strokeWidth="2" />
    </svg>
  ),
  Grid: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" strokeWidth="2" />
    </svg>
  ),
  List: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M8 6h13M3 6h.01M8 12h13M3 12h.01M8 18h13M3 18h.01" strokeWidth="2" />
    </svg>
  ),
  Calendar: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="2" />
      <path d="M16 3v4M8 3v4M3 10h18" strokeWidth="2" />
    </svg>
  ),
  Star: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ),
  Dollar: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M12 1v22M17 5.5a4.5 4.5 0 00-9 0c0 2.485 2.015 4.5 4.5 4.5h1a4.5 4.5 0 110 9H7" strokeWidth="2" />
    </svg>
  ),
  Filter: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M3 5h18l-7 8v4l-4 2v-6L3 5z" strokeWidth="2" />
    </svg>
  ),
  Bell: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeWidth="2" />
    </svg>
  ),
  External: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M14 3h7v7M21 3l-9 9" strokeWidth="2" />
      <path d="M10 7H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-5" strokeWidth="2" />
    </svg>
  ),
}

/* =========================================
   Filter Panel
========================================= */
interface Filters {
  q: string
  types: GrantType[]
  audience: Audience[]
  modalities: Modality[]
  geo: GeoScope[]
  states: string[] // state codes
  minAmount?: number
  maxAmount?: number
  rollingOnly: boolean
  matchOnly: boolean
  deadlines: "all" | "30d" | "60d" | "90d" | "rolling"
}

const defaultFilters: Filters = {
  q: "",
  types: [],
  audience: [],
  modalities: [],
  geo: [],
  states: [],
  minAmount: undefined,
  maxAmount: undefined,
  rollingOnly: false,
  matchOnly: false,
  deadlines: "all",
}

const MultiCheck: React.FC<{
  label: string
  options: string[]
  value: string[]
  onChange: (next: string[]) => void
  columns?: 1 | 2 | 3
}> = ({ label, options, value, onChange, columns = 2 }) => {
  const gridCols = columns === 1 ? "grid-cols-1" : columns === 2 ? "grid-cols-2" : "grid-cols-3" // Tailwind-safe
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">{label}</div>
      <div className={`grid ${gridCols} gap-2`}>
        {options.map((opt) => {
          const checked = value.includes(opt)
          return (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={checked}
                onChange={(e) => {
                  if (e.target.checked) onChange([...value, opt])
                  else onChange(value.filter((v) => v !== opt))
                }}
                aria-checked={checked}
              />
              <span>{opt}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

const NumberRange: React.FC<{
  label: string
  min?: number
  max?: number
  onMin: (n?: number) => void
  onMax: (n?: number) => void
}> = ({ label, min, max, onMin, onMax }) => (
  <div>
    <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">{label}</div>
    <div className="flex items-center gap-2">
      <input
        type="number"
        inputMode="numeric"
        placeholder="Min"
        value={min ?? ""}
        onChange={(e) => onMin(e.target.value === "" ? undefined : Number(e.target.value))}
        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
        aria-label="Minimum amount"
      />
      <span className="text-gray-400">—</span>
      <input
        type="number"
        inputMode="numeric"
        placeholder="Max"
        value={max ?? ""}
        onChange={(e) => onMax(e.target.value === "" ? undefined : Number(e.target.value))}
        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
        aria-label="Maximum amount"
      />
    </div>
  </div>
)

/* =========================================
   Toast (lightweight)
========================================= */
type Toast = { id: number; title: string; message?: string }
const Toaster: React.FC<{ toasts: Toast[]; onDismiss: (id: number) => void }> = ({ toasts, onDismiss }) => (
  <div className="fixed bottom-6 right-6 z-50 space-y-2">
    {toasts.map((t) => (
      <div
        key={t.id}
        className="rounded-xl border border-gray-200 bg-white/90 backdrop-blur px-4 py-3 shadow-lg animate-[fadeIn_150ms_ease-out]"
      >
        <div className="flex items-start gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2" />
          <div className="text-sm">
            <div className="font-semibold text-gray-900">{t.title}</div>
            {t.message && <div className="text-gray-600">{t.message}</div>}
          </div>
          <button className="ml-2 text-gray-400 hover:text-gray-600" onClick={() => onDismiss(t.id)} aria-label="Dismiss">
            ×
          </button>
        </div>
      </div>
    ))}
  </div>
)

/* =========================================
   Cards & Drawer
========================================= */
const GrantCard: React.FC<{
  g: Grant
  view: ViewMode
  onSave: (id: string) => void
  saved: boolean
  onOpen: (g: Grant) => void
  onCalendar: (g: Grant) => void
}> = ({ g, view, onSave, saved, onOpen, onCalendar }) => {
  const amt =
    g.amountMin || g.amountMax
      ? `${toUSD(g.amountMin)}${g.amountMax && g.amountMax !== g.amountMin ? ` – ${toUSD(g.amountMax)}` : ""}`
      : "Varies"
  const dueIn = daysUntil(g.deadline)
  const dueBadge = !g.rolling && typeof dueIn === "number" ? (
  <Badge tone={dueIn <= 7 ? "danger" : dueIn <= 21 ? "warning" : "default"}>
    {dueIn >= 0 ? `Due in ${dueIn}d` : "Past deadline"}
  </Badge>
) : g.rolling ? (
  <Badge tone="success">Rolling</Badge>
) : null

  const meta = (
    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
      <span className="inline-flex items-center gap-1">
        <Icon.Calendar className="h-3.5 w-3.5" /> {dateLabel(g.deadline, g.rolling)}
      </span>
      <span className="inline-flex items-center gap-1">
        <Icon.Dollar className="h-3.5 w-3.5" /> {amt}
      </span>
      <span>
        {g.geo}
        {g.location ? ` · ${g.location}` : ""}
      </span>
      {g.matchRequired && <Badge tone="warning">Match required</Badge>}
      {dueBadge}
    </div>
  )

  const tags = (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {(g.tags || []).map((t) => (
        <span key={t} className="rounded-full bg-gray-100 px-2 py-1 text-[11px] text-gray-700">
          #{t}
        </span>
      ))}
    </div>
  )

  const actions = (
    <div className="mt-3 flex flex-wrap gap-2">
      <button
        onClick={() => onOpen(g)}
        className="inline-flex items-center rounded-xl bg-gray-900 text-white px-3 py-2 text-sm hover:bg-black"
      >
        View details
      </button>
      <a
        href={g.link || "#"}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50"
      >
        Apply <Icon.External className="h-4 w-4" />
      </a>
      <button
        onClick={() => onCalendar(g)}
        className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50"
      >
        Add deadline <Icon.Calendar className="h-4 w-4" />
      </button>
      <button
        onClick={() => onSave(g.id)}
        className={`inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm ${saved ? "border border-gray-200 bg-white" : "bg-amber-500 text-white hover:bg-amber-600"}`}
        aria-pressed={saved}
      >
        {saved ? "Saved" : "Save"}
      </button>
    </div>
  )

  if (view === "list") {
    return (
      <article className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{g.type}</Badge>
            <h3 className="text-base font-semibold">{g.title}</h3>
          </div>
          <div className="text-sm text-gray-600">{g.sponsor}</div>
          <p className="mt-2 text-sm text-gray-800">{g.summary}</p>
          {meta}
          {tags}
          {actions}
        </div>
        <aside className="md:w-56">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
            <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Audience</div>
            <div className="flex flex-wrap gap-1">
              {g.audience.map((a) => (
                <Badge key={a}>{a}</Badge>
              ))}
            </div>
            <div className="text-xs uppercase tracking-wide text-gray-500 mt-3 mb-1">Supports</div>
            <div className="flex flex-wrap gap-1">
              {g.modalities.map((m) => (
                <Badge key={m}>{m}</Badge>
              ))}
            </div>
          </div>
        </aside>
      </article>
    )
  }

  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm h-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-center gap-2">
        <Badge>{g.type}</Badge>
        <h3 className="text-base font-semibold">{g.title}</h3>
      </div>
      <div className="text-sm text-gray-600">{g.sponsor}</div>
      <p className="mt-2 text-sm text-gray-800 line-clamp-4">{g.summary}</p>
      <div className="mt-2">{meta}</div>
      {tags}
      {actions}
    </article>
  )
}

const Drawer: React.FC<{ grant?: Grant; onClose: () => void }> = ({ grant, onClose }) => {
  if (!grant) return null
  const amt =
    grant.amountMin || grant.amountMax
      ? `${toUSD(grant.amountMin)}${grant.amountMax && grant.amountMax !== grant.amountMin ? ` – ${toUSD(grant.amountMax)}` : ""}`
      : "Varies"
  const dueIn = daysUntil(grant.deadline)
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge>{grant.type}</Badge>
                {grant.rolling && <Badge tone="success">Rolling</Badge>}
                {grant.matchRequired && <Badge tone="warning">Match required</Badge>}
                {!grant.rolling && typeof dueIn === "number" && (
                  <Badge tone={dueIn <= 7 ? "danger" : dueIn <= 21 ? "warning" : "default"}>
                    {dueIn >= 0 ? `Due in ${dueIn}d` : "Past deadline"}
                  </Badge>
                )}
              </div>
              <h2 className="mt-2 text-2xl font-bold">{grant.title}</h2>
              <div className="text-gray-600">{grant.sponsor}</div>
            </div>
            <button onClick={onClose} className="rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">
              Close
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Deadline</span>
                <div className="font-medium">{dateLabel(grant.deadline, grant.rolling)}</div>
              </div>
              <div>
                <span className="text-gray-500">Amount</span>
                <div className="font-medium">{amt}</div>
              </div>
              <div>
                <span className="text-gray-500">Geography</span>
                <div className="font-medium">
                  {grant.geo}
                  {grant.location ? ` · ${grant.location}` : ""}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Audience</span>
                <div className="font-medium">{grant.audience.join(", ")}</div>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">Supports</span>
                <div className="font-medium">{grant.modalities.join(", ")}</div>
              </div>
            </div>
          </section>

          <section>
            <div className="text-gray-500 text-sm">Overview</div>
            <p className="mt-1 text-gray-800">{grant.summary}</p>
            {grant.tags && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {grant.tags.map((t) => (
                  <span key={t} className="rounded-full bg-gray-100 px-2 py-1 text-[11px] text-gray-700">
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </section>

          <section className="grid grid-cols-2 gap-3">
            <a
              href={grant.link || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-3 text-white hover:bg-black"
            >
              Go to application
            </a>
            <button
              onClick={() => fileDownload(`${grant.title}-deadline.ics`, makeICS(grant))}
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-3 hover:bg-gray-50"
            >
              Add deadline to calendar
            </button>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Tips</div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Align your outcomes with the funder’s stated priorities (use their language).</li>
              <li>Quantify student impact and implementation timeline.</li>
              <li>Include sustainability (what happens after the grant period?).</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

/* =========================================
   Page
========================================= */
export default function FundingPage() {
  // STATE
  const [filters, setFilters] = React.useState<Filters>(defaultFilters)
  const [view, setView] = React.useState<ViewMode>("grid")
  const [sort, setSort] = React.useState<SortKey>("relevance")
  const [saved, setSaved] = React.useState<string[]>([])
  const [drawer, setDrawer] = React.useState<Grant | undefined>(undefined)
  const [showSavedOnly, setShowSavedOnly] = React.useState(false)

  // Toasts
  const [toasts, setToasts] = React.useState<Toast[]>([])
  const pushToast = React.useCallback((title: string, message?: string) => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    setToasts((t) => [...t, { id, title, message }])
    const timeout = setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600)
    return () => clearTimeout(timeout)
  }, [])

  // Debounced search + URL sync (modern feel)
  const [qInput, setQInput] = React.useState("")
  React.useEffect(() => {
    const t = setTimeout(() => setFilters((f) => ({ ...f, q: qInput })), 150)
    return () => clearTimeout(t)
  }, [qInput])

  React.useEffect(() => {
    // hydrate from URL once
    if (typeof window === "undefined") return
    const sp = new URLSearchParams(window.location.search)
    const q = sp.get("q") || ""
    const srt = (sp.get("sort") as SortKey | null) || null
    const vw = (sp.get("view") as ViewMode | null) || null
    if (q) {
      setQInput(q)
      setFilters((f) => ({ ...f, q }))
    }
    if (srt) setSort(srt)
    if (vw) setView(vw)
    // saved list
    const s = window.localStorage.getItem("funding_saved_ids")
    if (s) setSaved(JSON.parse(s))
  }, [])

  React.useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem("funding_saved_ids", JSON.stringify(saved))
  }, [saved])

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const sp = new URLSearchParams()
    if (filters.q) sp.set("q", filters.q)
    if (sort !== "relevance") sp.set("sort", sort)
    if (view !== "grid") sp.set("view", view)
    const qs = sp.toString()
    const url = `${window.location.pathname}${qs ? `?${qs}` : ""}`
    window.history.replaceState({}, "", url)
  }, [filters.q, sort, view])

  // SEARCH + FILTER + SORT
  const baseFiltered = GRANTS.filter((g) => {
    const q = filters.q.trim().toLowerCase()
    const qpass =
      !q ||
      [g.title, g.sponsor, g.summary, ...(g.tags || []), ...g.audience, ...g.modalities]
        .join(" ")
        .toLowerCase()
        .includes(q)

    const typePass = !filters.types.length || filters.types.includes(g.type)
    const audiencePass = !filters.audience.length || g.audience.some((a) => filters.audience.includes(a))
    const modalityPass = !filters.modalities.length || g.modalities.some((m) => filters.modalities.includes(m))
    const geoPass = !filters.geo.length || filters.geo.includes(g.geo)
    const statePass = !filters.states.length || (g.location ? filters.states.includes(g.location) : false)

    const minPass =
      filters.minAmount === undefined ||
      (g.amountMin ?? 0) >= filters.minAmount ||
      (g.amountMax ?? 0) >= filters.minAmount
    const maxPass =
      filters.maxAmount === undefined ||
      (g.amountMax ?? 0) <= filters.maxAmount ||
      (g.amountMin ?? 0) <= filters.maxAmount

    const rollingPass = !filters.rollingOnly || !!g.rolling
    const matchPass = !filters.matchOnly || !!g.matchRequired

    const deadlinePass =
      filters.deadlines === "all"
        ? true
        : filters.deadlines === "rolling"
        ? !!g.rolling
        : (() => {
            if (!g.deadline) return false
            const now = Date.now()
            const diffDays = (new Date(g.deadline).getTime() - now) / (1000 * 60 * 60 * 24)
            if (filters.deadlines === "30d") return diffDays <= 30
            if (filters.deadlines === "60d") return diffDays <= 60
            if (filters.deadlines === "90d") return diffDays <= 90
            return true
          })()

    return (
      qpass &&
      typePass &&
      audiencePass &&
      modalityPass &&
      geoPass &&
      statePass &&
      minPass &&
      maxPass &&
      rollingPass &&
      matchPass &&
      deadlinePass
    )
  })

  const filtered = baseFiltered
    .filter((g) => (showSavedOnly ? saved.includes(g.id) : true))
    .sort((a, b) => {
      if (sort === "deadline") {
        const aT = a.rolling ? Number.POSITIVE_INFINITY : new Date(a.deadline || 0).getTime()
        const bT = b.rolling ? Number.POSITIVE_INFINITY : new Date(b.deadline || 0).getTime()
        return aT - bT
      }
      if (sort === "amount") {
        const aMax = a.amountMax ?? a.amountMin ?? 0
        const bMax = b.amountMax ?? b.amountMin ?? 0
        return bMax - aMax // highest first
      }
      // relevance (simple heuristic)
      const q = filters.q.toLowerCase()
      const score = (g: Grant) =>
        (q && g.title.toLowerCase().includes(q) ? 3 : 0) +
        (q && g.summary.toLowerCase().includes(q) ? 1 : 0) +
        (q && (g.tags || []).some((t) => t.toLowerCase().includes(q)) ? 1 : 0)
      return score(b) - score(a)
    })

  // Stats
  const totalPotential = filtered.reduce((sum, g) => sum + (g.amountMax ?? g.amountMin ?? 0), 0)

  // PAGINATION (simple)
  const pageSize = 9
  const [page, setPage] = React.useState(1)
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  React.useEffect(() => setPage(1), [filters, sort, view, showSavedOnly]) // reset on change
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize)

  // HANDLERS
  const toggleSave = (id: string) => {
    setSaved((s) => {
      const next = s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
      pushToast(s.includes(id) ? "Removed from Saved" : "Saved", s.includes(id) ? "Item removed" : "Item saved")
      return next
    })
  }

  const exportCSV = () => {
    const rows = [
      [
        "Title",
        "Sponsor",
        "Type",
        "Audience",
        "Modality",
        "Geography",
        "Location",
        "Min",
        "Max",
        "Deadline",
        "Rolling",
        "MatchRequired",
        "Link",
      ],
      ...filtered.map((g) => [
        g.title,
        g.sponsor,
        g.type,
        g.audience.join("; "),
        g.modalities.join("; "),
        g.geo,
        g.location ?? "",
        g.amountMin ?? "",
        g.amountMax ?? "",
        g.deadline ? dateLabel(g.deadline) : "",
        g.rolling ? "Yes" : "No",
        g.matchRequired ? "Yes" : "No",
        g.link ?? "",
      ]),
    ]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n")
    fileDownload("funding-results.csv", rows, "text/csv;charset=utf-8")
    pushToast("Export complete", "funding-results.csv saved")
  }

  const clearFilters = () => {
    setFilters(defaultFilters)
    setQInput("")
    pushToast("Filters cleared")
  }

  const shareSearch = () => {
    if (typeof window === "undefined") return
    const url = window.location.href
    navigator.clipboard?.writeText(url)
    pushToast("Link copied", "Your current search was copied to clipboard")
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(60%_40%_at_50%_-10%,#f4e8f7,transparent_60%),radial-gradient(60%_40%_at_120%_10%,#e8ecff,transparent_60%)]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
              EH
            </div>
            <span className="font-semibold tracking-tight">Funding</span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative w-[360px]">
              <Icon.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={qInput}
                onChange={(e) => setQInput(e.target.value)}
                placeholder="Search grants, sponsors, tags…"
                className="w-full rounded-xl border border-gray-200 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 bg-white/80"
                aria-label="Search grants"
              />
            </div>
            <button
              onClick={() => pushToast("Alerts coming soon", "We’ll notify you when new matches arrive.")}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white hover:bg-gray-50"
            >
              <Icon.Bell className="h-4 w-4" /> Create alert
            </button>
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white hover:bg-gray-50"
            >
              Export CSV
            </button>
            <button
              onClick={shareSearch}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white hover:bg-gray-50"
            >
              Share
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-12 gap-6">
        {/* Filters */}
        <aside className="col-span-12 md:col-span-3 space-y-4">
          <div className="rounded-2xl bg-white/90 backdrop-blur border border-gray-100 shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Filters</div>
              <button onClick={clearFilters} className="text-sm text-gray-600 hover:underline">
                Clear all
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Icon.Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Refine results</span>
            </div>

            <MultiCheck
              label="Type"
              options={["Grant", "Fellowship", "Scholarship", "Prize", "Stipend"]}
              value={filters.types}
              onChange={(v) => setFilters({ ...filters, types: v as GrantType[] })}
            />

            <MultiCheck
              label="Audience"
              options={[
                "K-12 Teachers",
                "School/District",
                "Researchers",
                "EdTech Companies",
                "Nonprofits",
                "Higher Ed",
                "Students",
              ]}
              value={filters.audience}
              onChange={(v) => setFilters({ ...filters, audience: v as Audience[] })}
            />

            <MultiCheck
              label="Supports"
              options={[
                "Professional Development",
                "Classroom Project",
                "Curriculum",
                "Equipment",
                "Conference Travel",
              ]}
              value={filters.modalities}
              onChange={(v) => setFilters({ ...filters, modalities: v as Modality[] })}
            />

            <MultiCheck
              label="Geography"
              options={["US (National)", "State/Local", "International"]}
              value={filters.geo}
              onChange={(v) => setFilters({ ...filters, geo: v as GeoScope[] })}
              columns={1}
            />

            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">State</div>
              <input
                placeholder="e.g., FL, NY"
                value={filters.states.join(",")}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    states: e.target.value
                      .split(",")
                      .map((s) => s.trim().toUpperCase())
                      .filter((s) => /^[A-Z]{2}$/.test(s)),
                  })
                }
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
              />
            </div>

            <NumberRange
              label="Amount (USD)"
              min={filters.minAmount}
              max={filters.maxAmount}
              onMin={(n) => setFilters({ ...filters, minAmount: n })}
              onMax={(n) => setFilters({ ...filters, maxAmount: n })}
            />

            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Deadlines</div>
              <select
                value={filters.deadlines}
                onChange={(e) => setFilters({ ...filters, deadlines: e.target.value as Filters["deadlines"] })}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white"
              >
                <option value="all">All</option>
                <option value="30d">Within 30 days</option>
                <option value="60d">Within 60 days</option>
                <option value="90d">Within 90 days</option>
                <option value="rolling">Rolling only</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={filters.rollingOnly}
                  onChange={(e) => setFilters({ ...filters, rollingOnly: e.target.checked })}
                />
                Rolling only
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={filters.matchOnly}
                  onChange={(e) => setFilters({ ...filters, matchOnly: e.target.checked })}
                />
                Match required
              </label>
            </div>
          </div>

          {/* Saved search & tips */}
          <div className="rounded-2xl bg-white/90 backdrop-blur border border-gray-100 shadow-sm p-4 space-y-3">
            <div className="font-semibold">Saved search</div>
            <button
              onClick={() => pushToast("Search saved", "We’ll remember these filters on this device.")}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
            >
              Save current filters
            </button>
            <button
              onClick={() => pushToast("Email digest enabled", "Weekly summary will be sent.")}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
            >
              <Icon.Bell className="h-4 w-4" /> Create email digest
            </button>
          </div>

          <div className="rounded-2xl bg-white/90 backdrop-blur border border-gray-100 shadow-sm p-4">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Grant writing tips</div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Mirror the funder’s priority language in your objectives.</li>
              <li>Attach a timeline, budget, and evaluation plan.</li>
              <li>Highlight equity & access for multilingual learners.</li>
            </ul>
          </div>
        </aside>

        {/* Results */}
        <section className="col-span-12 md:col-span-9">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-gray-600 flex items-center gap-3">
              <span><span className="font-semibold">{filtered.length}</span> opportunities{filters.q ? (<><span> · for “</span><span className="font-semibold">{filters.q}</span>”</>) : null}</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-gray-200 px-3 py-1.5">
                <Icon.Dollar className="h-3.5 w-3.5" /> Total potential: <span className="font-semibold">{toUSD(totalPotential)}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Chip active={showSavedOnly} onClick={() => setShowSavedOnly((v) => !v)}>
                <Icon.Star className="h-4 w-4" /> Saved only
              </Chip>
              <Chip active={view === "grid"} onClick={() => setView("grid")}>
                <Icon.Grid className="h-4 w-4" /> Grid
              </Chip>
              <Chip active={view === "list"} onClick={() => setView("list")}>
                <Icon.List className="h-4 w-4" /> List
              </Chip>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm"
                aria-label="Sort by"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="deadline">Sort: Deadline (soonest)</option>
                <option value="amount">Sort: Funding (highest)</option>
              </select>
            </div>
          </div>

          {pageItems.length === 0 ? (
            <div className="rounded-2xl bg-white/80 backdrop-blur border border-gray-100 shadow-sm p-10 text-center">
              <div className="text-5xl mb-2">🔎</div>
              <h3 className="text-lg font-semibold mb-2">No results</h3>
              <p className="text-gray-600">Try broadening your filters or clearing the search.</p>
            </div>
          ) : view === "list" ? (
            <div className="grid gap-4">
              {pageItems.map((g) => (
                <GrantCard
                  key={g.id}
                  g={g}
                  view="list"
                  onSave={toggleSave}
                  saved={saved.includes(g.id)}
                  onOpen={setDrawer}
                  onCalendar={(gr) => fileDownload(`${gr.title}-deadline.ics`, makeICS(gr))}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pageItems.map((g) => (
                <GrantCard
                  key={g.id}
                  g={g}
                  view="grid"
                  onSave={toggleSave}
                  saved={saved.includes(g.id)}
                  onOpen={setDrawer}
                  onCalendar={(gr) => fileDownload(`${gr.title}-deadline.ics`, makeICS(gr))}
                />
              ))}
            </div>
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
        </section>
      </div>

      {/* Drawer */}
      <Drawer grant={drawer} onClose={() => setDrawer(undefined)} />

      {/* Toaster */}
      <Toaster toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />
    </div>
  )
}
