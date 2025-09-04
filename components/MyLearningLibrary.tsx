"use client"

import * as React from "react"

/** ---------- Types ---------- */
type TabKey = "saved" | "progress" | "completed" | "certs"
type ViewMode = "grid" | "list"

interface Stats {
  completed: number
  inProgress: number
  hours: number
  certs: number
}

interface ResourceItem {
  id: string
  title: string
  provider?: string
  cover?: string
  duration?: string
  progress?: number // 0–100 (if present, shows a progress bar)
  lastActive?: string // e.g., "2d ago"
  earnedOn?: string // for certifications
  startUrl?: string
  resumeUrl?: string
  certificateUrl?: string
  viewUrl?: string
}

/** ---------- Inline Icons (no external deps) ---------- */
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
  Star: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ),
  Clock: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="12" cy="12" r="9" strokeWidth="2" />
      <path d="M12 7v6l4 2" strokeWidth="2" />
    </svg>
  ),
  CheckBadge: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M8 21l4-2 4 2 4-2V5l-4-2-4 2-4-2-4 2v14z" strokeWidth="2" />
      <path d="M9 12l2 2 4-4" strokeWidth="2" />
    </svg>
  ),
  Bookmark: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M6 3h12v18l-6-3-6 3z" strokeWidth="2" />
    </svg>
  ),
  Dots: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  ),
  Funnel: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M3 5h18l-7 8v4l-4 2v-6L3 5z" strokeWidth="2" />
    </svg>
  ),
  Sort: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M3 6h13M3 12h9M3 18h5" strokeWidth="2" />
      <path d="M18 7l3 3-3 3" strokeWidth="2" />
    </svg>
  ),
  Play: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  Eye: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" strokeWidth="2" />
    </svg>
  ),
  Download: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeWidth="2" />
    </svg>
  ),
}

/** ---------- Small UI helpers ---------- */
const Chip: React.FC<{
  active?: boolean
  onClick?: () => void
  children: React.ReactNode
}> = ({ active, onClick, children }) => (
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

const KPICard: React.FC<{
  color: string // Tailwind color (e.g. "primary" -> but we pass classes directly)
  icon: React.ReactNode
  value: React.ReactNode
  label: string
}> = ({ icon, value, label }) => (
  <div className="rounded-2xl bg-white shadow-sm border border-gray-100 h-full">
    <div className="p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700">{icon}</div>
        <div>
          <div className="font-semibold text-xl leading-none">{value}</div>
          <div className="text-gray-500 text-sm">{label}</div>
        </div>
      </div>
    </div>
  </div>
)

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
  <div className="h-2 w-full rounded-full bg-gray-100">
    <div
      className="h-2 rounded-full bg-green-600 transition-[width] duration-300"
      style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
    />
  </div>
)

const ResourceActions: React.FC<{
  tab: TabKey
  item: ResourceItem
}> = ({ tab, item }) => {
  const base = "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition"
  if (tab === "completed" || item.progress === 100) {
    return (
      <div className="flex gap-2">
        <a className={base + " bg-gray-900 text-white hover:bg-black w-full"} href={item.certificateUrl || "#"}>
          <Icon.Download className="mr-2 h-4 w-4" /> Certificate
        </a>
        <button className={base + " border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"}>
          <Icon.Bookmark className="h-4 w-4" />
        </button>
        <button className={base + " border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"}>
          <Icon.Dots className="h-4 w-4" />
        </button>
      </div>
    )
  }
  if (tab === "progress") {
    return (
      <div className="flex gap-2">
        <a className={base + " bg-gray-900 text-white hover:bg-black w-full"} href={item.resumeUrl || "#"}>
          <Icon.Play className="mr-2 h-4 w-4" /> Resume
        </a>
        <button className={base + " border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"}>
          <Icon.Bookmark className="h-4 w-4" />
        </button>
        <button className={base + " border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"}>
          <Icon.Dots className="h-4 w-4" />
        </button>
      </div>
    )
  }
  if (tab === "saved") {
    return (
      <div className="flex gap-2">
        <a className={base + " bg-gray-900 text-white hover:bg-black w-full"} href={item.startUrl || "#"}>
          <Icon.Play className="mr-2 h-4 w-4" /> Start
        </a>
        <button className={base + " border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"}>
          <Icon.Bookmark className="h-4 w-4" />
        </button>
        <button className={base + " border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"}>
          <Icon.Dots className="h-4 w-4" />
        </button>
      </div>
    )
  }
  // certs
  return (
    <div className="flex gap-2">
      <a className={base + " bg-gray-900 text-white hover:bg-black w-full"} href={item.viewUrl || "#"}>
        <Icon.Eye className="mr-2 h-4 w-4" /> View
      </a>
      <button className={base + " border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"}>
        <Icon.Bookmark className="h-4 w-4" />
      </button>
      <button className={base + " border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"}>
        <Icon.Dots className="h-4 w-4" />
      </button>
    </div>
  )
}

const ResourceCard: React.FC<{
  item: ResourceItem
  tab: TabKey
  view: ViewMode
}> = ({ item, tab, view }) => {
  const body = (
    <div className="p-4">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-tight">{item.title}</h3>
        {item.duration && (
          <span className="rounded-full bg-green-50 text-green-700 text-xs font-semibold px-2 py-1">
            {item.duration}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500 mb-3">{item.provider || "Erudyte"}</p>

      {typeof item.progress === "number" ? (
        <>
          <ProgressBar value={item.progress} />
          <div className="mt-2 mb-3 flex items-center justify-between text-xs text-gray-500">
            <span>{item.progress}% complete</span>
            <span>Last active: {item.lastActive || "—"}</span>
          </div>
        </>
      ) : item.earnedOn ? (
        <div className="mb-3 inline-flex items-center text-green-700 text-xs font-medium">
          <Icon.CheckBadge className="mr-1 h-4 w-4" /> Earned {item.earnedOn}
        </div>
      ) : null}

      <ResourceActions tab={tab} item={item} />
    </div>
  )

  if (view === "list") {
    return (
      <article className="grid grid-cols-[160px,1fr] gap-4 rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="relative">
          <img src={item.cover || "/images/library/placeholder.jpg"} alt="" className="h-full w-full object-cover" />
        </div>
        {body}
      </article>
    )
  }

  return (
    <article className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden h-full">
      <div className="relative aspect-video">
        <img src={item.cover || "/images/library/placeholder.jpg"} alt="" className="h-full w-full object-cover" />
      </div>
      {body}
    </article>
  )
}

/** ---------- Main Page ---------- */
export default function MyLearningLibrary() {
  // Replace these with real data from your API
  const [stats] = React.useState<Stats>({ completed: 12, inProgress: 3, hours: 48, certs: 4 })
  const [tab, setTab] = React.useState<TabKey>("saved")
  const [view, setView] = React.useState<ViewMode>("grid")
  const [q, setQ] = React.useState("")

  // Mock collections
  const saved: ResourceItem[] = [
    {
      id: "s1",
      title: "Culturally Relevant SEL Practices",
      provider: "Erudyte",
      duration: "6 weeks",
      cover: "/images/library/sel.jpg",
      startUrl: "#",
    },
    {
      id: "s2",
      title: "Data-Driven Instruction",
      provider: "Erudyte",
      duration: "4 weeks",
      cover: "/images/library/data-driven.jpg",
      startUrl: "#",
    },
  ]
  const inProgress: ResourceItem[] = [
    {
      id: "p1",
      title: "Advanced React Development",
      provider: "Erudyte",
      progress: 62,
      lastActive: "2d ago",
      duration: "8 weeks",
      cover: "/images/library/react-advanced.jpg",
      resumeUrl: "#",
    },
    {
      id: "p2",
      title: "Leadership in Tech",
      provider: "Professional Institute",
      progress: 35,
      lastActive: "5d ago",
      duration: "6 weeks",
      cover: "/images/library/leadership-tech.jpg",
      resumeUrl: "#",
    },
  ]
  const completed: ResourceItem[] = [
    {
      id: "c1",
      title: "Data Science Fundamentals",
      provider: "Erudyte",
      progress: 100,
      duration: "12 weeks",
      cover: "/images/library/data-science-fundamentals.jpg",
      certificateUrl: "#",
    },
  ]
  const certifications: ResourceItem[] = [
    {
      id: "cert1",
      title: "Erudyte — Data Science Fundamentals (Certificate)",
      earnedOn: "Jul 10, 2025",
      cover: "/images/library/cert-dsf.jpg",
      viewUrl: "#",
    },
  ]

  const collection =
    tab === "progress" ? inProgress : tab === "completed" ? completed : tab === "certs" ? certifications : saved

  const filtered = collection.filter(
    (item) =>
      item.title.toLowerCase().includes(q.toLowerCase()) ||
      (item.provider || "").toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
              EH
            </div>
            <span className="font-semibold">E-Hubs</span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative w-[360px]">
              <Icon.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search your library…"
                className="w-full rounded-xl border border-gray-200 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
              />
            </div>
            <a
              href="/library"
              className="hidden lg:inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white hover:bg-gray-50"
            >
              Explore Catalog
            </a>
            <img src="/images/avatar-placeholder.png" alt="" className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="py-6 md:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="uppercase text-xs tracking-widest text-gray-500 font-semibold mb-1">Dashboard</p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">My Learning Library</h1>
              <p className="text-gray-600 mt-2">
                Track progress, pick up where you left off, and access your saved resources.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white hover:bg-gray-50">
                <Icon.Funnel className="h-4 w-4" /> Filter
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white hover:bg-gray-50">
                <Icon.Sort className="h-4 w-4" /> Sort
              </button>
              <div className="inline-flex rounded-xl overflow-hidden border border-gray-200">
                <button
                  onClick={() => setView("grid")}
                  className={`px-3 py-2 text-sm ${view === "grid" ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50"}`}
                  aria-label="Grid view"
                >
                  <Icon.Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`px-3 py-2 text-sm ${view === "list" ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50"}`}
                  aria-label="List view"
                >
                  <Icon.List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
            <KPICard icon={<Icon.Bookmark className="h-5 w-5" />} value={stats.completed} label="Courses Completed" />
            <KPICard icon={<Icon.Play className="h-5 w-5" />} value={stats.inProgress} label="In Progress" />
            <KPICard icon={<Icon.Clock className="h-5 w-5" />} value={`${stats.hours}h`} label="Learning Hours" />
            <KPICard icon={<Icon.CheckBadge className="h-5 w-5" />} value={stats.certs} label="Certifications" />
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            <Chip active={tab === "saved"} onClick={() => setTab("saved")}>
              Saved
            </Chip>
            <Chip active={tab === "progress"} onClick={() => setTab("progress")}>
              In Progress
            </Chip>
            <Chip active={tab === "completed"} onClick={() => setTab("completed")}>
              Completed
            </Chip>
            <Chip active={tab === "certs"} onClick={() => setTab("certs")}>
              Certifications
            </Chip>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-10 text-center">
              <div className="text-5xl mb-2">📚</div>
              <h3 className="text-lg font-semibold mb-2">Nothing here yet</h3>
              <p className="text-gray-600 mb-4">Save courses and resources to build your personal library.</p>
              <a
                href="/library"
                className="inline-flex items-center rounded-xl bg-gray-900 text-white px-4 py-2 text-sm hover:bg-black"
              >
                Browse Courses
              </a>
            </div>
          ) : view === "list" ? (
            <div className="grid gap-4">
              {filtered.map((item) => (
                <ResourceCard key={item.id} item={item} tab={tab} view="list" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item) => (
                <ResourceCard key={item.id} item={item} tab={tab} view="grid" />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Erudition Inc.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-gray-700" href="#">
              Privacy
            </a>
            <a className="hover:text-gray-700" href="#">
              Terms
            </a>
            <a className="hover:text-gray-700" href="#">
              Help
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
