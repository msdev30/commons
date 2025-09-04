import DetailLayout, { Badge, SecondaryLink } from "@/components/DetailLayout"

async function getNews(id: string) {
  return {
    id,
    title: "States expand pathways funding for career readiness",
    source: "EdWeek",
    author: "Staff",
    date: "2025-08-20",
    externalUrl: "https://example.com/article",
    summary: "Roundup of new state pilot grants for CTE and dual-credit.",
    tags: ["Policy", "CTE"],
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const n = await getNews(params.id)
  const meta = (
    <div className="flex flex-wrap gap-2">
      <Badge>{n.source}</Badge>
      {n.author && <Badge>By {n.author}</Badge>}
      <Badge>{new Date(n.date).toLocaleDateString()}</Badge>
      {n.tags.map((t: string) => (
        <Badge key={t}>#{t}</Badge>
      ))}
    </div>
  )
  const actions = (
    <>
      <SecondaryLink href={n.externalUrl} target="_blank" rel="noreferrer">
        Open original
      </SecondaryLink>
      <SecondaryLink href={`/community?q=${encodeURIComponent(n.title)}`}>Discuss in Community</SecondaryLink>
    </>
  )

  return (
    <DetailLayout
      breadcrumb={{ label: "News", href: "/news" }}
      title={n.title}
      subtitle={n.summary}
      meta={meta}
      actions={actions}
      related={[1, 2, 3].map((i) => (
        <a key={i} href={`/news/n${i}`} className="rounded-xl border p-4 hover:bg-gray-50">
          <div className="text-sm font-medium">Related Article {i}</div>
          <div className="text-xs text-gray-600">{n.source}</div>
        </a>
      ))}
    >
      <p className="text-gray-800">{n.summary}</p>
    </DetailLayout>
  )
}
