"use client"

import * as React from "react"

/* =========================
   Types
========================= */
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
  location?: string
  geo: GeoScope
  amountMin?: number
  amountMax?: number
  deadline?: string
  rolling?: boolean
  matchRequired?: boolean
  summary: string
  tags?: string[]
  link?: string
  status: "Open" | "Closing Soon" | "Closed"
}

interface Filters {
  q: string
  types: GrantType[]
  audience: Audience[]
  modalities: Modality[]
  geo: GeoScope[]
  minAmount?: number
  maxAmount?: number
  rollingOnly: boolean
  matchOnly: boolean
  deadlines: "all" | "30d" | "60d" | "90d" | "rolling"
}

/* =========================
   Icons
========================= */
const Icon = {
  Search: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  Grid: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  List: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  Filter: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
    </svg>
  ),
  Calendar: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  DollarSign: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  Users: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  BookOpen: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  ExternalLink: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Bookmark: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  X: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  ChevronDown: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <polyline points="6,9 12,15 18,9" />
    </svg>
  ),
  Sliders: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
}

/* =========================
   Mock Data
========================= */
const mockGrants: Grant[] = [
  {
    id: "1",
    title: "STEM Innovation Grant",
    sponsor: "National Science Foundation",
    type: "Grant",
    audience: ["K-12 Teachers", "School/District"],
    modalities: ["Curriculum", "Equipment"],
    geo: "US (National)",
    amountMin: 25000,
    amountMax: 50000,
    deadline: "2025-03-15",
    summary: "Support innovative STEM teaching methods and curriculum development in K-12 schools.",
    tags: ["STEM", "Innovation", "K-12"],
    status: "Open",
    link: "#",
  },
  {
    id: "2",
    title: "Technology Integration Fellowship",
    sponsor: "Gates Foundation",
    type: "Fellowship",
    audience: ["K-12 Teachers"],
    modalities: ["Professional Development", "Equipment"],
    geo: "US (National)",
    amountMin: 15000,
    amountMax: 25000,
    deadline: "2025-02-28",
    summary: "Fund technology integration projects that enhance student learning outcomes.",
    tags: ["Technology", "Integration", "Fellowship"],
    status: "Open",
    link: "#",
  },
  {
    id: "3",
    title: "Professional Development Scholarship",
    sponsor: "Education Excellence Foundation",
    type: "Scholarship",
    audience: ["K-12 Teachers"],
    modalities: ["Professional Development", "Conference Travel"],
    geo: "US (National)",
    amountMin: 3000,
    amountMax: 5000,
    deadline: "2025-01-31",
    summary: "Support educators pursuing advanced certifications and training programs.",
    tags: ["Professional Development", "Certification"],
    status: "Closing Soon",
    link: "#",
  },
  {
    id: "4",
    title: "Classroom Innovation Fund",
    sponsor: "Local Education Partnership",
    type: "Grant",
    audience: ["K-12 Teachers"],
    modalities: ["Classroom Project", "Equipment"],
    geo: "State/Local",
    location: "CA",
    amountMin: 5000,
    amountMax: 10000,
    deadline: "2025-04-30",
    summary: "Provide funding for innovative classroom projects and learning materials.",
    tags: ["Classroom", "Innovation", "Local"],
    status: "Open",
    link: "#",
  },
]

/* =========================
   Utilities
========================= */
const inDays = (iso?: string) => (iso ? Math.ceil((+new Date(iso) - Date.now()) / 86400000) : undefined)
const fmtUSD = (n?: number) =>
  typeof n === "number" ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : "—"
const fmtDeadline = (deadline?: string) =>
  deadline ? new Date(deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Rolling"

/* =========================
   Atoms
========================= */
const Badge: React.FC<{ children: React.ReactNode; variant?: "default" | "success" | "warning" | "info" | "muted" }> = ({
  children,
  variant = "default",
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    info: "bg-blue-100 text-blue-800",
    muted: "bg-gray-50 text-gray-500 border border-gray-200",
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}

// Card (note: we render {children})
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`relative rounded-2xl border border-gray-100 bg-white shadow-sm ${className}`}>
    {children}
  </div>
)


/* =========================
   Filter UI 
========================= */
// Section title: smaller, tighter
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-3">
    <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">{title}</div>
    {children}
  </div>
)

// Checkbox list: smaller labels
const CheckboxGroup: React.FC<{
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}> = ({ options, selected, onChange }) => (
  <div className="space-y-1">
    {options.map((option) => {
      const isChecked = selected.includes(option)
      return (
        <label key={option} className="flex items-center text-[11px]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onChange(e.target.checked ? [...selected, option] : selected.filter((x) => x !== option))}
            className="h-3.5 w-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            aria-checked={isChecked}
          />
          <span className="ml-2 text-gray-700">{option}</span>
        </label>
      )
    })}
  </div>
)

// Sidebar shell: smaller header text + compact inputs
const FilterSidebar: React.FC<{
  filters: Filters
  onChange: (filters: Filters) => void
  onClear: () => void
}> = ({ filters, onChange, onClear }) => (
  <div className="w-full md:max-w-[280px] rounded-2xl border border-gray-100 bg-white p-4 shadow-sm h-fit md:sticky md:top-6">
    <div className="flex items-center justify-between mb-3">
      <h5 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
        <Icon.Filter className="h-4 w-4" />
        Filters
      </h5>
      <button onClick={onClear} className="text-[6px] text-blue-600 hover:text-blue-700 font-small">
        Clear all
      </button>
    </div>

    <Section title="Grant Type">
      <CheckboxGroup
        options={["Grant", "Fellowship", "Scholarship", "Prize", "Stipend"]}
        selected={filters.types}
        onChange={(types) => onChange({ ...filters, types: types as GrantType[] })}
      />
    </Section>

    <Section title="Target Audience">
      <CheckboxGroup
        options={["K-12 Teachers","School/District","Researchers","EdTech Companies","Nonprofits","Higher Ed","Students"]}
        selected={filters.audience}
        onChange={(audience) => onChange({ ...filters, audience: audience as Audience[] })}
      />
    </Section>

    <Section title="Funding Focus">
      <CheckboxGroup
        options={["Professional Development","Classroom Project","Curriculum","Equipment","Conference Travel"]}
        selected={filters.modalities}
        onChange={(modalities) => onChange({ ...filters, modalities: modalities as Modality[] })}
      />
    </Section>

    <Section title="Geographic Scope">
      <CheckboxGroup
        options={["US (National)", "State/Local", "International"]}
        selected={filters.geo}
        onChange={(geo) => onChange({ ...filters, geo: geo as GeoScope[] })}
      />
    </Section>

    <Section title="Award Amount">
  {/* ⬅️ was: grid-cols-2 gap-2 */}
  <div className="grid grid-cols-2 gap-3 md:gap-4">
    <div>
      <label className="block text-[10px] text-gray-500 mb-1">Minimum</label>
      <input
        type="number"
        placeholder="$0"
        value={filters.minAmount ?? ""}
        onChange={(e) => onChange({ ...filters, minAmount: e.target.value ? Number(e.target.value) : undefined })}
        /* ⬅️ added placeholder size */
        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-[12px] placeholder:text-[11px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
    <div>
      <label className="block text-[10px] text-gray-500 mb-1">Maximum</label>
      <input
        type="number"
        placeholder="No limit"
        value={filters.maxAmount ?? ""}
        onChange={(e) => onChange({ ...filters, maxAmount: e.target.value ? Number(e.target.value) : undefined })}
        /* ⬅️ added placeholder size */
        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-[12px] placeholder:text-[11px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  </div>
</Section>


    <Section title="Application Deadline">
      <select
        value={filters.deadlines}
        onChange={(e) => onChange({ ...filters, deadlines: e.target.value as Filters["deadlines"] })}
      /* ⬇️ Reduced font size */
       className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-[10px] placeholder:text-[6px] focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      >
        <option value="all" className="text-[6px]">All deadlines</option>
        <option value="30d" className="text-[6px]">Next 30 days</option>
        <option value="60d" className="text-[6px]">Next 60 days</option>
        <option value="90d" className="text-[6px]">Next 90 days</option>
        <option value="rolling" className="text-[6px]">Rolling applications</option>
      </select>
    </Section>



    <div className="grid grid-cols-2 gap-2">
      <label className="flex items-center gap-2 text-[12px]">
        <input
          type="checkbox"
          className="h-3.5 w-3.5 rounded border-gray-300"
          checked={filters.rollingOnly}
          onChange={(e) => onChange({ ...filters, rollingOnly: e.target.checked })}
        />
        Rolling only
      </label>
      <label className="flex items-center gap-2 text-[12px]">
        <input
          type="checkbox"
          className="h-3.5 w-3.5 rounded border-gray-300"
          checked={filters.matchOnly}
          onChange={(e) => onChange({ ...filters, matchOnly: e.target.checked })}
        />
        Match required
      </label>
    </div>
  </div>
)


/* =========================
   Cards
========================= */
const SaveButton: React.FC<{ saved: boolean; onToggle: () => void }> = ({ saved, onToggle }) => (
  <button
    onClick={onToggle}
    aria-pressed={saved}
    className={`p-1.5 rounded-lg transition-colors ${saved ? "bg-amber-50" : "hover:bg-gray-100"}`}
    title={saved ? "Saved" : "Save"}
  >
    <Icon.Bookmark className={`h-4 w-4 ${saved ? "text-amber-600" : "text-gray-400"}`} />
  </button>
)

const AmountAndDeadline: React.FC<{ grant: Grant }> = ({ grant }) => (
  <div className="grid grid-cols-2 gap-3">
    <div className="flex items-center gap-2">
      <Icon.DollarSign className="h-4 w-4 text-green-600 flex-shrink-0" />
      <div className="min-w-0">
        <div className="text-sm font-semibold text-gray-900 leading-tight">
          {grant.amountMin || grant.amountMax
            ? `${fmtUSD(grant.amountMin)}${grant.amountMax && grant.amountMax !== grant.amountMin ? ` – ${fmtUSD(grant.amountMax)}` : ""}`
            : "Amount varies"}
        </div>
        <div className="text-xs text-gray-500">Award Amount</div>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Icon.Calendar className="h-4 w-4 text-blue-600 flex-shrink-0" />
      <div className="min-w-0">
        <div className="text-sm font-semibold text-gray-900 leading-tight">{fmtDeadline(grant.deadline)}</div>
        <div className="text-xs text-gray-500">Deadline</div>
      </div>
    </div>
  </div>
)

const GrantCard: React.FC<{ grant: Grant; saved: boolean; onSaveToggle: () => void }> = ({ grant, saved, onSaveToggle }) => {
  const days = inDays(grant.deadline)
  const statusBadge =
    grant.status === "Closing Soon" ? (
      <Badge variant="warning">Closing Soon{typeof days === "number" && days >= 0 ? ` · ${days}d` : ""}</Badge>
    ) : grant.status === "Open" ? (
      <Badge variant="success">Open</Badge>
    ) : (
      <Badge variant="muted">Closed</Badge>
    )

  return (
    <div className="h-full">
      <Card className="p-6 flex h-full flex-col hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h4 className="text-[1.25rem] font-semibold text-gray-900 leading-tight mb-1">{grant.title}</h4>
            <p className="text-sm text-gray-600">{grant.sponsor}</p>
          </div>
          <div className="flex items-center gap-2 ml-3 flex-shrink-0">
            {statusBadge}
            <SaveButton saved={saved} onToggle={onSaveToggle} />
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">{grant.summary}</p>

        <AmountAndDeadline grant={grant} />

        <div className="mt-4 flex flex-wrap gap-1.5">
          <Badge variant="info">{grant.type}</Badge>
          {grant.rolling && <Badge variant="success">Rolling</Badge>}
          {grant.matchRequired && <Badge variant="warning">Match required</Badge>}
          {grant.audience.slice(0, 1).map((aud) => (
            <Badge key={aud}>{aud}</Badge>
          ))}
          {grant.audience.length > 1 && <Badge>+{grant.audience.length - 1} more</Badge>}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {grant.tags?.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
          <a
            href={grant.link || "#"}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Apply Now
          </a>
        </div>
      </Card>
    </div>
  )
}

const GrantListItem: React.FC<{ grant: Grant; saved: boolean; onSaveToggle: () => void }> = ({
  grant,
  saved,
  onSaveToggle,
}) => {
  const days = inDays(grant.deadline)
  const statusBadge =
    grant.status === "Closing Soon" ? (
      <Badge variant="warning">Closing Soon{typeof days === "number" && days >= 0 ? ` · ${days}d` : ""}</Badge>
    ) : grant.status === "Open" ? (
      <Badge variant="success">Open</Badge>
    ) : (
      <Badge variant="muted">Closed</Badge>
    )

  return (
    <Card className="p-6 hover:shadow-md">
      <div className="flex items-start gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h4 className="text-[1.25rem] font-semibold text-gray-900 leading-tight mb-1">{grant.title}</h4>
              <p className="text-sm text-gray-600">{grant.sponsor}</p>
            </div>
            <div className="flex items-center gap-2 ml-4 flex-shrink-0">
              {statusBadge}
              <SaveButton saved={saved} onToggle={onSaveToggle} />
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-3 leading-relaxed">{grant.summary}</p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            <Badge variant="info">{grant.type}</Badge>
            {grant.rolling && <Badge variant="success">Rolling</Badge>}
            {grant.matchRequired && <Badge variant="warning">Match required</Badge>}
            {grant.audience.slice(0, 2).map((aud) => (
              <Badge key={aud}>{aud}</Badge>
            ))}
            {grant.audience.length > 2 && <Badge>+{grant.audience.length - 2} more</Badge>}
          </div>

          <div className="flex flex-wrap gap-1">
            {grant.tags?.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8 flex-shrink-0">
          <div className="text-center">
            <div className="flex items-center gap-1 mb-1">
              <Icon.DollarSign className="h-4 w-4 text-green-600" />
              <div className="text-sm font-semibold text-gray-900">
                {grant.amountMin || grant.amountMax
                  ? `${fmtUSD(grant.amountMin)}${grant.amountMax && grant.amountMax !== grant.amountMin ? ` – ${fmtUSD(grant.amountMax)}` : ""}`
                  : "Amount varies"}
              </div>
            </div>
            <div className="text-xs text-gray-500">Award Amount</div>
          </div>

          <div className="text-center">
            <div className="flex items-center gap-1 mb-1">
              <Icon.Calendar className="h-4 w-4 text-blue-600" />
              <div className="text-sm font-semibold text-gray-900">{fmtDeadline(grant.deadline)}</div>
            </div>
            <div className="text-xs text-gray-500">Deadline</div>
          </div>

          <a
            href={grant.link || "#"}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Apply Now
          </a>
        </div>
      </div>
    </Card>
  )
}

/* =========================
   Main
========================= */
export default function ModernFundingPage() {
  const [filters, setFilters] = React.useState<Filters>({
    q: "",
    types: [],
    audience: [],
    modalities: [],
    geo: [],
    minAmount: undefined,
    maxAmount: undefined,
    rollingOnly: false,
    matchOnly: false,
    deadlines: "all",
  })
  const [searchQuery, setSearchQuery] = React.useState("")
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid")
  const [sortBy, setSortBy] = React.useState<SortKey>("relevance")
  const [savedIds, setSavedIds] = React.useState<string[]>([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false)

  // Pagination
  const [page, setPage] = React.useState(1)
  const PAGE_SIZE_GRID = 9
  const PAGE_SIZE_LIST = 6
  const pageSize = viewMode === "grid" ? PAGE_SIZE_GRID : PAGE_SIZE_LIST
  React.useEffect(() => {
    setPage(1)
  }, [searchQuery, sortBy, viewMode, filters])

  // Persist saved
  React.useEffect(() => {
    if (typeof window === "undefined") return
    const raw = window.localStorage.getItem("funding_saved_ids_v2")
    if (raw) setSavedIds(JSON.parse(raw))
  }, [])
  React.useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem("funding_saved_ids_v2", JSON.stringify(savedIds))
  }, [savedIds])

  const activeFilterCount =
    filters.types.length +
    filters.audience.length +
    filters.modalities.length +
    filters.geo.length +
    (filters.minAmount ? 1 : 0) +
    (filters.maxAmount ? 1 : 0) +
    (filters.rollingOnly ? 1 : 0) +
    (filters.matchOnly ? 1 : 0) +
    (filters.deadlines !== "all" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0)

  // Filtering
  const filtered = mockGrants.filter((g) => {
    const q = searchQuery.trim().toLowerCase()
    const matchesSearch =
      !q ||
      g.title.toLowerCase().includes(q) ||
      g.sponsor.toLowerCase().includes(q) ||
      g.summary.toLowerCase().includes(q) ||
      (g.tags || []).some((t) => t.toLowerCase().includes(q))

    if (!matchesSearch) return false
    if (filters.types.length && !filters.types.includes(g.type)) return false
    if (filters.audience.length && !filters.audience.some((a) => g.audience.includes(a))) return false
    if (filters.modalities.length && !filters.modalities.some((m) => g.modalities.includes(m))) return false
    if (filters.geo.length && !filters.geo.includes(g.geo)) return false
    if (filters.minAmount && (g.amountMax ?? g.amountMin ?? 0) < filters.minAmount) return false
    if (filters.maxAmount && (g.amountMin ?? g.amountMax ?? 0) > filters.maxAmount) return false
    if (filters.rollingOnly && !g.rolling) return false
    if (filters.matchOnly && !g.matchRequired) return false

    if (filters.deadlines !== "all" && filters.deadlines !== "rolling") {
      if (!g.deadline) return false
      const days = inDays(g.deadline) ?? Infinity
      if (filters.deadlines === "30d" && days > 30) return false
      if (filters.deadlines === "60d" && days > 60) return false
      if (filters.deadlines === "90d" && days > 90) return false
    }
    if (filters.deadlines === "rolling" && !g.rolling) return false

    return true
  })

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "deadline") {
      const aT = a.deadline ? +new Date(a.deadline) : Number.POSITIVE_INFINITY
      const bT = b.deadline ? +new Date(b.deadline) : Number.POSITIVE_INFINITY
      return aT - bT
    }
    if (sortBy === "amount") {
      const aMax = a.amountMax ?? a.amountMin ?? 0
      const bMax = b.amountMax ?? b.amountMin ?? 0
      return bMax - aMax
    }
    const q = searchQuery.trim().toLowerCase()
    const score = (g: Grant) =>
      (q && g.title.toLowerCase().includes(q) ? 3 : 0) +
      (q && g.summary.toLowerCase().includes(q) ? 1 : 0) +
      (q && (g.tags || []).some((t) => t.toLowerCase().includes(q)) ? 1 : 0)
    return score(b) - score(a)
  })

  // Pagination slice
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const startIdx = (page - 1) * pageSize
  const endIdx = Math.min(sorted.length, startIdx + pageSize)
  const pageItems = sorted.slice(startIdx, endIdx)

  const clearFilters = () => {
    setFilters({
      q: "",
      types: [],
      audience: [],
      modalities: [],
      geo: [],
      minAmount: undefined,
      maxAmount: undefined,
      rollingOnly: false,
      matchOnly: false,
      deadlines: "all",
    })
    setSearchQuery("")
  }

  const toggleSave = (id: string) =>
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  return (
    <div className="min-h-screen bg-[radial-gradient(60%_40%_at_50%_-10%,#f4e8f7,transparent_60%),radial-gradient(60%_40%_at_120%_10%,#e8ecff,transparent_60%)]">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-indigo-900 to-fuchsia-900" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#ffffff33,transparent_40%),radial-gradient(circle_at_80%_0%,#ffffff22,transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
              Education Funding{" "}
              <span className="bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
                Opportunities
              </span>
            </h1>
            <p className="mt-4 text-lg text-indigo-100/90 max-w-2xl mx-auto">
              Discover grants, scholarships, and resources to power your next initiative.
            </p>

            {/* Search pill */}
            <div className="mt-8 flex justify-center">
              <div className="relative w-full max-w-2xl">
                <Icon.Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search grants, sponsors, tags…"
                  className="w-full rounded-full bg-white/10 text-white placeholder-white/70 backdrop-blur border border-white/20 pl-12 pr-28 py-3 outline-none focus:ring-2 focus:ring-fuchsia-300/40"
                  aria-label="Search funding opportunities"
                />
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-full bg-white/20 hover:bg-white/25 text-white px-4 py-1.5 text-sm"
                >
                  <Icon.Sliders className="h-4 w-4" /> Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-white text-indigo-900 text-xs font-semibold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* quick chips */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["STEM", "Professional Development", "Equipment", "Scholarship"].map((chip) => (
                <button
                  key={chip}
                  onClick={() => setSearchQuery(chip)}
                  className="rounded-full bg-white/10 text-white/90 px-3 py-1 text-xs hover:bg-white/15"
                >
                  #{chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === Opportunities + Filters (sidebar only in this row) === */}
      <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-3">
          <FilterSidebar filters={filters} onChange={setFilters} onClear={clearFilters} />
        </aside>

        {/* Mobile drawer */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-xl p-6 overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h6 className="text-lg font-semibold">Filters</h6>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="rounded-lg border border-gray-200 p-1.5 hover:bg-gray-50"
                  aria-label="Close filters"
                >
                  <Icon.X className="h-4 w-4" />
                </button>
              </div>
              <FilterSidebar filters={filters} onChange={setFilters} onClear={() => { clearFilters(); setMobileFiltersOpen(false) }} />
            </div>
          </div>
        )}

        {/* Results column */}
        <section className="col-span-12 md:col-span-9 lg:col-span-9 min-w-0">
          <div className="mb-4 text-sm text-gray-700 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="font-semibold">{sorted.length}</span> opportunities
              {searchQuery ? (
                <> · for “<span className="font-semibold">{searchQuery}</span>”</>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                  aria-pressed={viewMode === "grid"}
                >
                  <Icon.Grid className="h-4 w-4" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                  aria-pressed={viewMode === "list"}
                >
                  <Icon.List className="h-4 w-4" />
                  List
                </button>
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortKey)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Sort by"
                >
                  <option value="relevance">Sort: Relevance</option>
                  <option value="deadline">Sort: Deadline</option>
                  <option value="amount">Sort: Amount</option>
                </select>
                <Icon.ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Results */}
          {sorted.length === 0 ? (
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-10 text-center">
              <div className="text-5xl mb-3">🔎</div>
              <h3 className="text-lg font-semibold mb-1">No opportunities found</h3>
              <p className="text-gray-600 mb-4">Try broadening your search or clearing filters.</p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
              {pageItems.map((g) => (
                <GrantCard key={g.id} grant={g} saved={savedIds.includes(g.id)} onSaveToggle={() => toggleSave(g.id)} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {pageItems.map((g) => (
                <GrantListItem key={g.id} grant={g} saved={savedIds.includes(g.id)} onSaveToggle={() => toggleSave(g.id)} />
              ))}
            </div>
          )}

          {/* Pagination controls */}
          {sorted.length > pageSize && (
            <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{startIdx + 1}</span>–<span className="font-semibold">{endIdx}</span> of{" "}
                <span className="font-semibold">{sorted.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).slice(0, 7).map((_, i) => {
                  const n = i + 1
                  // Simple truncation for many pages
                  if (totalPages > 7 && n === 6) return <span key="dots" className="px-2">…</span>
                  if (totalPages > 7 && n > 6 && n !== totalPages) return null
                  const isActive = page === (n === 6 && totalPages > 7 ? totalPages : n)
                  const pageNumber = n === 6 && totalPages > 7 ? totalPages : n
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`px-3 py-2 text-sm rounded-lg border ${isActive ? "border-blue-600 text-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"}`}
                    >
                      {pageNumber}
                    </button>
                  )
                })}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* === Resources (full width, separate from sidebar) === */}
      <section className="pt-20 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Funding Resources & Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 text-center hover:shadow-md">
              <div className="flex justify-center mb-4">
                <Icon.BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Grant Writing Guide</h3>
              <p className="text-gray-600 mb-4">Learn how to write compelling grant proposals that get funded.</p>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Download Guide
              </button>
            </div>
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 text-center hover:shadow-md">
              <div className="flex justify-center mb-4">
                <Icon.Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Funding Calendar</h3>
              <p className="text-gray-600 mb-4">Stay on top of important deadlines with our funding calendar.</p>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                View Calendar
              </button>
            </div>
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 text-center hover:shadow-md">
              <div className="flex justify-center mb-4">
                <Icon.Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Success Stories</h3>
              <p className="text-gray-600 mb-4">Read about educators who successfully secured funding.</p>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Read Stories
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
