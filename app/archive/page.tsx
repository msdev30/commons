"use client"
import * as React from "react"
import ArchivePage, { type ArchiveItemBase } from "@/components/ArchivePage"
import Navigation from "@/components/Navigation" // safer path

// ---- Content type keys
type TabKey = "webinars" | "certificates" | "posts" | "news" | "white-papers" | "publications"

// ---- Minimal item shapes for unified search
interface WebItem extends ArchiveItemBase {
  type: "webinars"
  speakers?: string[]
  duration?: string
  href?: string
}
interface CertItem extends ArchiveItemBase {
  type: "certificates"
  program: string
  earnedOn?: string
  downloadUrl?: string
  verifyUrl?: string
}
interface PostItem extends ArchiveItemBase {
  type: "posts"
  author: string
  commentCount?: number
  href: string
}
interface NewsItem extends ArchiveItemBase {
  type: "news"
  source: string
  author?: string
  externalUrl: string
}
interface WhitePaperItem extends ArchiveItemBase {
  type: "white-papers"
  authors?: string[]
  pdfUrl: string
  publisher?: string
}
type PubType = "Book" | "Journal Article" | "Conference Paper" | "Report" | "Chapter"
interface PublicationItem extends ArchiveItemBase {
  type: "publications"
  pubType: PubType
  authors: string[]
  venue?: string
  year?: number
  doi?: string
  fileUrl?: string
  externalUrl?: string
}

type AnyItem = WebItem | CertItem | PostItem | NewsItem | WhitePaperItem | PublicationItem

// ---- Mock data
const WEBINARS: WebItem[] = [
  {
    id: "w1",
    type: "webinars",
    title: "Grant Calendars & Capacity Planning",
    date: new Date().toISOString(),
    speakers: ["Whitney James", "Max Chen"],
    duration: "60m",
    cover: "/images/webinars/grant-cal.jpg",
    href: "#",
    summary: "How districts align grant timelines.",
    tags: ["Grants"],
  },
  {
    id: "w2",
    type: "webinars",
    title: "ELL Funding Streams 101",
    date: new Date(Date.now() - 86400000).toISOString(),
    speakers: ["Rio Gomez"],
    duration: "45m",
    cover: "/images/webinars/ell.jpg",
    href: "#",
    summary: "Where the dollars live and how to braid them.",
    tags: ["ELL"],
  },
]

const CERTS: CertItem[] = [
  {
    id: "cf1",
    type: "certificates",
    title: "Data Science Fundamentals (Erudyte)",
    program: "Professional Development",
    earnedOn: "2025-07-10",
    downloadUrl: "#",
    verifyUrl: "#",
    tags: ["Certificate"],
  },
]

const POSTS: PostItem[] = [
  {
    id: "p1",
    type: "posts",
    title: "Quick formative assessment ideas for Algebra",
    author: "Max Chen",
    date: new Date(Date.now() - 3600_000).toISOString(),
    commentCount: 42,
    href: "/community/post/p1",
    tags: ["Algebra", "Assessment"],
    summary: "Share your best 10-minute checks for understanding.",
  },
]

const NEWS: NewsItem[] = [
  {
    id: "n1",
    type: "news",
    title: "States expand pathways funding for career readiness",
    source: "EdWeek",
    author: "Staff",
    date: "2025-08-20",
    externalUrl: "#",
    summary: "State pilot grants roundup.",
    tags: ["Policy", "CTE"],
  },
]

const WHITE_PAPERS: WhitePaperItem[] = [
  {
    id: "wp1",
    type: "white-papers",
    title: "Data Contracts for K-12 Finance",
    authors: ["Erudyte Research"],
    pdfUrl: "/docs/white-papers/data-contracts.pdf",
    publisher: "Erudyte",
    date: "2025-05-12",
    summary: "Framework for reliable, comparable school finance reporting.",
    tags: ["Finance", "Interoperability"],
  },
]

const PUBS: PublicationItem[] = [
  {
    id: "pb1",
    type: "publications",
    title: "Culturally Responsive Assessment in STEM",
    pubType: "Journal Article",
    authors: ["Whitney James", "Max Chen"],
    venue: "Journal of Inclusive STEM",
    year: 2024,
    doi: "10.1234/jis.2024.5678",
    externalUrl: "#",
    summary: "Study on quick formative assessments.",
    tags: ["Assessment", "ELL", "STEM"],
  },
]

const TAB_LABEL: Record<TabKey, string> = {
  webinars: "Webinars",
  certificates: "Certificates",
  posts: "Posts",
  news: "News Articles",
  "white-papers": "White Papers",
  publications: "Publications",
}

export default function ArchiveIndex() {
  const [tab, setTab] = React.useState<TabKey>("webinars")
  const [q, setQ] = React.useState("")

  const datasets: Record<TabKey, AnyItem[]> = {
    webinars: WEBINARS,
    certificates: CERTS,
    posts: POSTS,
    news: NEWS,
    "white-papers": WHITE_PAPERS,
    publications: PUBS,
  }

  const items = (datasets[tab] || []).filter((i) => {
    const searchableText = [i.title, i.summary, ...(i.tags || [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
    return searchableText.includes(q.toLowerCase())
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Navigation />

      {/* Modern Hero Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-light tracking-tight text-white sm:text-6xl">
                Knowledge{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Archive
                </span>
              </h1>
              <p className="mt-6 text-xl leading-8 text-slate-300 max-w-2xl mx-auto">
                Discover a curated collection of educational resources, research, and insights to fuel your learning
                journey.
              </p>

              {/* Enhanced Search */}
              <div className="mt-10 flex justify-center">
                <div className="relative w-full max-w-2xl">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                    <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search across all archives..."
                    className="w-full rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 pl-14 pr-6 py-4 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Tab Navigation */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-slate-200/60">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-wrap justify-center gap-3">
            {(Object.keys(TAB_LABEL) as TabKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`group relative inline-flex items-center gap-3 rounded-2xl px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  tab === k
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 scale-105"
                    : "bg-white/60 text-slate-700 border border-slate-200/60 hover:bg-white hover:border-slate-300 hover:shadow-md hover:scale-105"
                }`}
              >
                {TAB_LABEL[k]}
                {tab === k && (
                  <span className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity -z-10" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area with Enhanced Cards */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-light text-slate-900">{TAB_LABEL[tab]}</h2>
            <p className="mt-2 text-slate-600">
              {items.length} {items.length === 1 ? "item" : "items"} found
            </p>
          </div>

          {/* Filter pill */}
          {q && (
            <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm">
              <span>Filtered by: “{q}”</span>
              <button onClick={() => setQ("")} className="ml-1 hover:bg-purple-200 rounded-full p-1 transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {tab === "webinars" && (
          <ArchivePage
            heading="Webinars"
            description="Live sessions and replays."
            items={items as WebItem[]}
            columns={[
              { label: "Speakers", render: (w: WebItem) => w.speakers?.join(", ") || "—" },
              { label: "Duration", render: (w: WebItem) => w.duration || "—", hideOnGrid: true },
              { label: "Date", render: (w: WebItem) => (w.date ? new Date(w.date).toLocaleDateString() : "—") },
            ]}
            actions={{
              primary: (w: WebItem) => (
                <a
                  href={w.href || "#"}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-white text-sm font-medium shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
                >
                  <span>Watch</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15" />
                  </svg>
                </a>
              ),
            }}
          />
        )}

        {tab === "certificates" && (
          <ArchivePage
            heading="Certificates"
            description="All earned certificates."
            items={items as CertItem[]}
            columns={[
              { label: "Program", render: (c: CertItem) => c.program },
              { label: "Earned", render: (c: CertItem) => (c.earnedOn ? new Date(c.earnedOn).toLocaleDateString() : "—") },
            ]}
            actions={{
              primary: (c: CertItem) => (
                <a
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-white text-sm font-medium shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
                  href={c.downloadUrl || "#"}
                >
                  <span>Download</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              ),
              secondary: (c: CertItem) =>
                c.verifyUrl ? (
                  <a
                    className="inline-flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-6 py-3 text-slate-700 text-sm font-medium hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 hover:scale-105"
                    href={c.verifyUrl}
                  >
                    <span>Verify</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </a>
                ) : null,
            }}
          />
        )}

        {tab === "posts" && (
          <ArchivePage
            heading="Posts"
            description="Community threads."
            items={items as PostItem[]}
            columns={[
              { label: "Author", render: (p: PostItem) => p.author },
              { label: "Comments", render: (p: PostItem) => p.commentCount ?? 0, hideOnGrid: true },
              { label: "Date", render: (p: PostItem) => (p.date ? new Date(p.date).toLocaleString() : "—") },
            ]}
            actions={{
              primary: (p: PostItem) => (
                <a
                  href={p.href}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
                >
                  <span>Read</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </a>
              ),
            }}
          />
        )}

        {tab === "news" && (
          <ArchivePage
            heading="News Articles"
            description="Curated via RSS and reposts."
            items={items as NewsItem[]}
            columns={[
              { label: "Source", render: (n: NewsItem) => n.source },
              { label: "Author", render: (n: NewsItem) => n.author || "—", hideOnGrid: true },
              { label: "Published", render: (n: NewsItem) => (n.date ? new Date(n.date).toLocaleDateString() : "—") },
            ]}
            actions={{
              primary: (n: NewsItem) => (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={n.externalUrl}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 px-6 py-3 text-white text-sm font-medium shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105"
                >
                  <span>Read Article</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ),
            }}
          />
        )}

        {tab === "white-papers" && (
          <ArchivePage
            heading="White Papers"
            description="Downloadable research."
            items={items as WhitePaperItem[]}
            columns={[
              { label: "Authors", render: (d: WhitePaperItem) => d.authors?.join(", ") || "—" },
              { label: "Publisher", render: (d: WhitePaperItem) => d.publisher || "—", hideOnGrid: true },
              { label: "Date", render: (d: WhitePaperItem) => (d.date ? new Date(d.date).toLocaleDateString() : "—") },
            ]}
            actions={{
              primary: (d: WhitePaperItem) => (
                <a
                  href={d.pdfUrl}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-3 text-white text-sm font-medium shadow-lg shadow-slate-500/25 hover:shadow-xl hover:shadow-slate-500/30 transition-all duration-300 hover:scale-105"
                  download
                >
                  <span>Download PDF</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              ),
            }}
          />
        )}

        {tab === "publications" && (
          <ArchivePage
            heading="Publications"
            description="Books, journal articles, conference papers."
            items={items as PublicationItem[]}
            columns={[
              { label: "Type", render: (p: PublicationItem) => p.pubType },
              { label: "Authors", render: (p: PublicationItem) => p.authors.join(", "), hideOnGrid: true },
              { label: "Venue", render: (p: PublicationItem) => p.venue || "—" },
              { label: "Year", render: (p: PublicationItem) => p.year || "—", hideOnGrid: true },
            ]}
            actions={{
              primary: (p: PublicationItem) =>
                p.fileUrl ? (
                  <a
                    href={p.fileUrl}
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-white text-sm font-medium shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300 hover:scale-105"
                    download
                  >
                    <span>Download</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                ) : (
                  <a
                    href={p.externalUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-white text-sm font-medium shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300 hover:scale-105"
                  >
                    <span>View</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ),
            }}
          />
        )}
      </section>
    </div>
  )
}
