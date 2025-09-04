"use client"
import * as React from "react"
import ArchivePage, { type ArchiveItemBase } from "@/components/ArchivePage"

// ---- Content type keys
type TabKey = "webinars" | "certificates" | "posts" | "news" | "white-papers" | "publications"

// ---- Minimal item shapes for unified search (per page keeps its richer fields)
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

// ---- Mock data (swap for API)
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

  const items = (datasets[tab] || []).filter((i) =>
    [i.title, i.summary, ...(i.tags || [])].filter(Boolean).join(" ").toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="font-semibold">Archive</div>
          <div className="hidden md:flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search all archives…"
              className="w-[360px] rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(TAB_LABEL) as TabKey[]).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                tab === k
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {TAB_LABEL[k]}
            </button>
          ))}
        </div>
      </div>

      {/* Active tab renders using the generic ArchivePage with per-type config */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
        {tab === "webinars" && (
          <ArchivePage
            heading="Webinars"
            description="Live sessions and replays."
            items={items}
            columns={[
              { label: "Speakers", render: (w: WebItem) => w.speakers?.join(", ") || "—" },
              { label: "Duration", render: (w: WebItem) => w.duration || "—", hideOnGrid: true },
              { label: "Date", render: (i) => (i.date ? new Date(i.date).toLocaleDateString() : "—") },
            ]}
            actions={{
              primary: (w: WebItem) => (
                <a
                  href={w.href || "#"}
                  className="inline-flex items-center rounded-xl bg-gray-900 px-3 py-2 text-white text-sm"
                >
                  Watch / Register
                </a>
              ),
            }}
          />
        )}

        {tab === "certificates" && (
          <ArchivePage
            heading="Certificates"
            description="All earned certificates."
            items={items}
            columns={[
              { label: "Program", render: (c: CertItem) => c.program },
              {
                label: "Earned",
                render: (c: CertItem) => (c.earnedOn ? new Date(c.earnedOn).toLocaleDateString() : "—"),
              },
            ]}
            actions={{
              primary: (c: CertItem) => (
                <a
                  className="inline-flex items-center rounded-xl bg-gray-900 px-3 py-2 text-white text-sm"
                  href={c.downloadUrl || "#"}
                >
                  Download PDF
                </a>
              ),
              secondary: (c: CertItem) =>
                c.verifyUrl ? (
                  <a
                    className="inline-flex items-center rounded-xl border border-gray-200 px-3 py-2 text-sm"
                    href={c.verifyUrl}
                  >
                    Verify
                  </a>
                ) : null,
            }}
          />
        )}

        {tab === "posts" && (
          <ArchivePage
            heading="Posts"
            description="Community threads."
            items={items}
            columns={[
              { label: "Author", render: (p: PostItem) => p.author },
              { label: "Comments", render: (p: PostItem) => p.commentCount ?? 0, hideOnGrid: true },
              { label: "Date", render: (i) => (i.date ? new Date(i.date).toLocaleString() : "—") },
            ]}
            actions={{
              primary: (p: PostItem) => (
                <a
                  href={p.href}
                  className="inline-flex items-center rounded-xl bg-gray-900 px-3 py-2 text-white text-sm"
                >
                  Read
                </a>
              ),
            }}
          />
        )}

        {tab === "news" && (
          <ArchivePage
            heading="News Articles"
            description="Curated via RSS and reposts."
            items={items}
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
                  className="inline-flex items-center rounded-xl bg-gray-900 px-3 py-2 text-white text-sm"
                >
                  Open article
                </a>
              ),
            }}
          />
        )}

        {tab === "white-papers" && (
          <ArchivePage
            heading="White Papers"
            description="Downloadable research."
            items={items}
            columns={[
              { label: "Authors", render: (d: WhitePaperItem) => d.authors?.join(", ") || "—" },
              { label: "Publisher", render: (d: WhitePaperItem) => d.publisher || "—", hideOnGrid: true },
              { label: "Date", render: (i) => (i.date ? new Date(i.date).toLocaleDateString() : "—") },
            ]}
            actions={{
              primary: (d: WhitePaperItem) => (
                <a
                  href={d.pdfUrl}
                  className="inline-flex items-center rounded-xl bg-gray-900 px-3 py-2 text-white text-sm"
                  download
                >
                  Download PDF
                </a>
              ),
            }}
          />
        )}

        {tab === "publications" && (
          <ArchivePage
            heading="Publications"
            description="Books, journal articles, conference papers."
            items={items}
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
                    className="inline-flex items-center rounded-xl bg-gray-900 px-3 py-2 text-white text-sm"
                    download
                  >
                    Download
                  </a>
                ) : (
                  <a
                    href={p.externalUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-xl bg-gray-900 px-3 py-2 text-white text-sm"
                  >
                    Open
                  </a>
                ),
            }}
          />
        )}
      </section>
    </div>
  )
}
