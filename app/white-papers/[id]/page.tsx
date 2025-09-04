"use client"

import DetailLayout, { Badge, PrimaryBtn, SecondaryLink } from "@/components/DetailLayout"

async function getWhitePaper(id: string) {
  return {
    id,
    title: "Data Contracts for K-12 Finance",
    authors: ["Erudyte Research"],
    publisher: "Erudyte",
    date: "2025-05-12",
    pdfUrl: "/docs/white-papers/data-contracts.pdf",
    pages: 28,
    tags: ["Finance", "Interoperability"],
    abstract: "Framework for reliable, comparable school finance reporting.",
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const d = await getWhitePaper(params.id)
  const meta = (
    <div className="flex flex-wrap gap-2">
      {d.authors.map((a: string) => (
        <Badge key={a}>{a}</Badge>
      ))}
      {d.publisher && <Badge>{d.publisher}</Badge>}
      {d.pages && <Badge>{d.pages} pages</Badge>}
      <Badge>{new Date(d.date).toLocaleDateString()}</Badge>
      {d.tags.map((t: string) => (
        <Badge key={t}>#{t}</Badge>
      ))}
    </div>
  )
  const actions = (
    <>
      <PrimaryBtn onClick={() => location.assign(d.pdfUrl)}>Download PDF</PrimaryBtn>
      <SecondaryLink
        href="#"
        onClick={(e) => {
          e.preventDefault()
          navigator.clipboard.writeText(
            `${d.authors.join(", ")}. ${d.title}. ${d.publisher}, ${new Date(d.date).getFullYear()}.`,
          )
        }}
      >
        Copy citation
      </SecondaryLink>
    </>
  )

  return (
    <DetailLayout
      breadcrumb={{ label: "White Papers", href: "/white-papers" }}
      title={d.title}
      subtitle={d.abstract}
      meta={meta}
      actions={actions}
    >
      <p className="text-gray-800">{d.abstract}</p>
      <div className="mt-4">
        <iframe src={d.pdfUrl} className="w-full h-[70vh] rounded-xl border" />
      </div>
    </DetailLayout>
  )
}
