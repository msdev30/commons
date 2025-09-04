"use client"

import DetailLayout, { Badge, PrimaryBtn, SecondaryLink } from "@/components/DetailLayout"

type PubType = "Book" | "Journal Article" | "Conference Paper" | "Report" | "Chapter"

async function getPublication(id: string) {
  return {
    id,
    title: "Culturally Responsive Assessment in STEM",
    pubType: "Journal Article" as PubType,
    authors: ["Whitney James", "Max Chen"],
    venue: "Journal of Inclusive STEM",
    year: 2024,
    doi: "10.1234/jis.2024.5678",
    externalUrl: "https://doi.org/10.1234/jis.2024.5678",
    fileUrl: "",
    tags: ["Assessment", "ELL", "STEM"],
    abstract: "Study on quick formative assessments for multilingual learners.",
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const p = await getPublication(params.id)
  const meta = (
    <div className="flex flex-wrap gap-2">
      <Badge>{p.pubType}</Badge>
      <Badge>{p.venue}</Badge>
      <Badge>{p.year}</Badge>
      {p.tags.map((t: string) => (
        <Badge key={t}>#{t}</Badge>
      ))}
    </div>
  )
  const actions = (
    <>
      {p.fileUrl ? (
        <PrimaryBtn onClick={() => location.assign(p.fileUrl)}>Download</PrimaryBtn>
      ) : (
        <PrimaryBtn onClick={() => location.assign(p.externalUrl!)}>Open</PrimaryBtn>
      )}
      {p.doi && (
        <SecondaryLink href={`https://doi.org/${p.doi.replace(/^https?:\/\/doi\.org\//, "")}`} target="_blank">
          DOI
        </SecondaryLink>
      )}
    </>
  )

  return (
    <DetailLayout
      breadcrumb={{ label: "Publications", href: "/publications" }}
      title={p.title}
      subtitle={p.abstract}
      meta={meta}
      actions={actions}
      related={[1, 2, 3].map((i) => (
        <a key={i} href={`/publications/p${i}`} className="rounded-xl border p-4 hover:bg-gray-50">
          <div className="text-sm font-medium">Related Publication {i}</div>
          <div className="text-xs text-gray-600">{p.venue}</div>
        </a>
      ))}
    >
      <p className="text-gray-800">{p.abstract}</p>
    </DetailLayout>
  )
}
