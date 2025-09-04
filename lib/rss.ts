import Parser from "rss-parser"

export interface RssItem {
  id: string
  title: string
  link: string
  date?: string
  author?: string
  source: string
  summary?: string
  tags?: string[]
}

const parser = new Parser()

export async function fetchRssFeed(url: string): Promise<RssItem[]> {
  const feed = await parser.parseURL(url)
  const sourceTitle = feed.title || new URL(url).hostname
  return (feed.items || []).map((i, idx) => ({
    id: i.guid || i.id || i.link || `${sourceTitle}-${idx}`,
    title: i.title || "Untitled",
    link: i.link || "#",
    date: i.isoDate || i.pubDate,
    author: (i as any).creator || i.author,
    source: sourceTitle,
    summary: i.contentSnippet || i.summary || "",
    tags: (i.categories || []) as string[],
  }))
}

export async function fetchRssMany(urls: string[], limitPerFeed = 20): Promise<RssItem[]> {
  const all = await Promise.allSettled(urls.map((u) => fetchRssFeed(u)))
  const items = all.flatMap((r) => (r.status === "fulfilled" ? r.value.slice(0, limitPerFeed) : []))
  // de-dup by link/title
  const seen = new Set<string>()
  return items
    .filter((i) => {
      const key = i.link || i.title
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
}
