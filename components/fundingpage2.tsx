"use client"

import * as React from "react"

/* =========================
   Types
========================= */
type ViewMode = "grid" | "list"
type SortKey = "relevance" | "deadline" | "amount"
type GrantType = "Grant" | "Fellowship" | "Scholarship" | "Prize" | "Stipend"
type Audience = "K-12 Teachers" | "School/District" | "Researchers" | "EdTech Companies" | "Nonprofits" | "Higher Ed" | "Students"
type Modality = "Professional Development" | "Classroom Project" | "Curriculum" | "Equipment" | "Conference Travel"
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
    status: "Open"
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
    status: "Open"
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
    status: "Closing Soon"
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
    status: "Open"
  }
]

/* =========================
   Utility Components
========================= */
const Badge: React.FC<{ children: React.ReactNode; variant?: "default" | "success" | "warning" | "info" }> = ({ 
  children, variant = "default" 
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    info: "bg-blue-100 text-blue-800"
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${className}`}>
    {children}
  </div>
)

/* =========================
   Filter Components
========================= */
const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
    {children}
  </div>
)

const CheckboxGroup: React.FC<{ 
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}> = ({ options, selected, onChange }) => (
  <div className="space-y-2">
    {options.map((option) => (
      <label key={option} className="flex items-center text-sm">
        <input
          type="checkbox"
          checked={selected.includes(option)}
          onChange={(e) => {
            if (e.target.checked) {
              onChange([...selected, option])
            } else {
              onChange(selected.filter(item => item !== option))
            }
          }}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="ml-2 text-gray-700">{option}</span>
      </label>
    ))}
  </div>
)

const FilterSidebar: React.FC<{ 
  filters: Filters
  onChange: (filters: Filters) => void
  onClear: () => void
}> = ({ filters, onChange, onClear }) => (
  <div className="w-80 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit sticky top-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Icon.Filter className="h-5 w-5" />
        Filters
      </h2>
      <button 
        onClick={onClear}
        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        Clear all
      </button>
    </div>

    <FilterSection title="Grant Type">
      <CheckboxGroup
        options={["Grant", "Fellowship", "Scholarship", "Prize", "Stipend"]}
        selected={filters.types}
        onChange={(types) => onChange({ ...filters, types: types as GrantType[] })}
      />
    </FilterSection>

    <FilterSection title="Target Audience">
      <CheckboxGroup
        options={["K-12 Teachers", "School/District", "Researchers", "EdTech Companies", "Nonprofits", "Higher Ed", "Students"]}
        selected={filters.audience}
        onChange={(audience) => onChange({ ...filters, audience: audience as Audience[] })}
      />
    </FilterSection>

    <FilterSection title="Funding Focus">
      <CheckboxGroup
        options={["Professional Development", "Classroom Project", "Curriculum", "Equipment", "Conference Travel"]}
        selected={filters.modalities}
        onChange={(modalities) => onChange({ ...filters, modalities: modalities as Modality[] })}
      />
    </FilterSection>

    <FilterSection title="Geographic Scope">
      <CheckboxGroup
        options={["US (National)", "State/Local", "International"]}
        selected={filters.geo}
        onChange={(geo) => onChange({ ...filters, geo: geo as GeoScope[] })}
      />
    </FilterSection>

    <FilterSection title="Award Amount">
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Minimum</label>
          <input
            type="number"
            placeholder="$0"
            value={filters.minAmount || ""}
            onChange={(e) => onChange({ ...filters, minAmount: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Maximum</label>
          <input
            type="number"
            placeholder="No limit"
            value={filters.maxAmount || ""}
            onChange={(e) => onChange({ ...filters, maxAmount: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </FilterSection>

    <FilterSection title="Application Deadline">
      <select
        value={filters.deadlines}
        onChange={(e) => onChange({ ...filters, deadlines: e.target.value as any })}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="all">All deadlines</option>
        <option value="30d">Next 30 days</option>
        <option value="60d">Next 60 days</option>
        <option value="90d">Next 90 days</option>
        <option value="rolling">Rolling applications</option>
      </select>
    </FilterSection>
  </div>
)

/* =========================
   Grant Card Component
========================= */
const GrantCard: React.FC<{ grant: Grant }> = ({ grant }) => {
  const formatAmount = (min?: number, max?: number) => {
    if (!min && !max) return "Amount varies"
    if (min && max && min === max) return `$${min.toLocaleString()}`
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`
    if (min) return `$${min.toLocaleString()}+`
    if (max) return `Up to $${max.toLocaleString()}`
    return "Amount varies"
  }

  const formatDeadline = (deadline?: string) => {
    if (!deadline) return "Rolling"
    const date = new Date(deadline)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "success"
      case "Closing Soon": return "warning"
      case "Closed": return "default"
      default: return "default"
    }
  }

  return (
    <Card className="p-5 hover:shadow-lg transition-all duration-200 cursor-pointer group h-fit">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-1">
            {grant.title}
          </h3>
          <p className="text-sm text-gray-600">{grant.sponsor}</p>
        </div>
        <div className="flex items-center gap-2 ml-3 flex-shrink-0">
          <Badge variant={getStatusColor(grant.status)}>{grant.status}</Badge>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon.Bookmark className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-4 leading-relaxed">{grant.summary}</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Icon.DollarSign className="h-4 w-4 text-green-600 flex-shrink-0" />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900 leading-tight">
              {formatAmount(grant.amountMin, grant.amountMax)}
            </div>
            <div className="text-xs text-gray-500">Award Amount</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Icon.Calendar className="h-4 w-4 text-blue-600 flex-shrink-0" />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900 leading-tight">
              {formatDeadline(grant.deadline)}
            </div>
            <div className="text-xs text-gray-500">Deadline</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <Badge variant="info">{grant.type}</Badge>
        {grant.audience.slice(0, 1).map((aud) => (
          <Badge key={aud} variant="default">{aud}</Badge>
        ))}
        {grant.audience.length > 1 && (
          <Badge variant="default">+{grant.audience.length - 1} more</Badge>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {grant.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-1 flex-shrink-0">
          Apply Now
          <Icon.ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </Card>
  )
}

/* =========================
   Grant List Item Component
========================= */
const GrantListItem: React.FC<{ grant: Grant }> = ({ grant }) => {
  const formatAmount = (min?: number, max?: number) => {
    if (!min && !max) return "Amount varies"
    if (min && max && min === max) return `$${min.toLocaleString()}`
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`
    if (min) return `$${min.toLocaleString()}+`
    if (max) return `Up to $${max.toLocaleString()}`
    return "Amount varies"
  }

  const formatDeadline = (deadline?: string) => {
    if (!deadline) return "Rolling"
    const date = new Date(deadline)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "success"
      case "Closing Soon": return "warning"
      case "Closed": return "default"
      default: return "default"
    }
  }

  return (
    <Card className="p-5 hover:shadow-lg transition-all duration-200 cursor-pointer group">
      <div className="flex items-start gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-1">
                {grant.title}
              </h3>
              <p className="text-sm text-gray-600">{grant.sponsor}</p>
            </div>
            <div className="flex items-center gap-2 ml-4 flex-shrink-0">
              <Badge variant={getStatusColor(grant.status)}>{grant.status}</Badge>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Icon.Bookmark className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
          
          <p className="text-sm text-gray-700 mb-3 leading-relaxed">{grant.summary}</p>
          
          <div className="flex flex-wrap gap-1.5 mb-3">
            <Badge variant="info">{grant.type}</Badge>
            {grant.audience.slice(0, 2).map((aud) => (
              <Badge key={aud} variant="default">{aud}</Badge>
            ))}
            {grant.audience.length > 2 && (
              <Badge variant="default">+{grant.audience.length - 2} more</Badge>
            )}
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
                {formatAmount(grant.amountMin, grant.amountMax)}
              </div>
            </div>
            <div className="text-xs text-gray-500">Award Amount</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center gap-1 mb-1">
              <Icon.Calendar className="h-4 w-4 text-blue-600" />
              <div className="text-sm font-semibold text-gray-900">
                {formatDeadline(grant.deadline)}
              </div>
            </div>
            <div className="text-xs text-gray-500">Deadline</div>
          </div>
          
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-1">
            Apply Now
            <Icon.ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>
    </Card>
  )
}

/* =========================
   Main Component
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
    deadlines: "all"
  })

  const [searchQuery, setSearchQuery] = React.useState("")
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid")
  const [sortBy, setSortBy] = React.useState<SortKey>("relevance")

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
      deadlines: "all"
    })
    setSearchQuery("")
  }

  const filteredGrants = mockGrants.filter(grant => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = 
        grant.title.toLowerCase().includes(searchLower) ||
        grant.sponsor.toLowerCase().includes(searchLower) ||
        grant.summary.toLowerCase().includes(searchLower) ||
        grant.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      if (!matchesSearch) return false
    }

    if (filters.types.length > 0 && !filters.types.includes(grant.type)) return false
    if (filters.audience.length > 0 && !filters.audience.some(aud => grant.audience.includes(aud))) return false
    if (filters.modalities.length > 0 && !filters.modalities.some(mod => grant.modalities.includes(mod))) return false
    if (filters.geo.length > 0 && !filters.geo.includes(grant.geo)) return false
    if (filters.minAmount && grant.amountMax && grant.amountMax < filters.minAmount) return false
    if (filters.maxAmount && grant.amountMin && grant.amountMin > filters.maxAmount) return false

    return true
  })

  const activeFilterCount = 
    filters.types.length + 
    filters.audience.length + 
    filters.modalities.length + 
    filters.geo.length + 
    (filters.minAmount ? 1 : 0) + 
    (filters.maxAmount ? 1 : 0) + 
    (filters.rollingOnly ? 1 : 0) + 
    (filters.matchOnly ? 1 : 0) + 
    (filters.deadlines !== "all" ? 1 : 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-10 py-32">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Education Funding{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Opportunities
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover grants, scholarships, and funding resources to support your educational initiatives
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Icon.Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search funding opportunities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        <div className="flex gap-8">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onClear={clearFilters}
          />

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {filteredGrants.length} Opportunities Found
                </h2>
                {activeFilterCount > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge variant="info">{activeFilterCount} filters applied</Badge>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Icon.X className="h-3 w-3" />
                      Clear
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "grid"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Icon.Grid className="h-4 w-4" />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "list"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Icon.List className="h-4 w-4" />
                    List
                  </button>
                </div>
                
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortKey)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            {filteredGrants.length === 0 ? (
              <Card className="p-12 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No opportunities found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Clear all filters
                </button>
              </Card>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredGrants.map((grant) => (
                  <GrantCard key={grant.id} grant={grant} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredGrants.map((grant) => (
                  <GrantListItem key={grant.id} grant={grant} />
                ))}
              </div>
            )}
          </div>
        </div>

        <section className="mt-28 my-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Funding Resources & Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-200">
              <div className="flex justify-center mb-4">
                <Icon.BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Grant Writing Guide</h3>
              <p className="text-gray-600 mb-4">Learn how to write compelling grant proposals that get funded.</p>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Download Guide
              </button>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-200">
              <div className="flex justify-center mb-4">
                <Icon.Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Funding Calendar</h3>
              <p className="text-gray-600 mb-4">Stay on top of important deadlines with our funding calendar.</p>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                View Calendar
              </button>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-200">
              <div className="flex justify-center mb-4">
                <Icon.Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Success Stories</h3>
              <p className="text-gray-600 mb-4">Read about educators who successfully secured funding.</p>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Read Stories
              </button>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}