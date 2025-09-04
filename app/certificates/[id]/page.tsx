"use client"

import DetailLayout, { Badge, PrimaryBtn, SecondaryLink } from "@/components/DetailLayout"

async function getCert(id: string) {
  return {
    id,
    title: "Data Science Fundamentals (Erudyte)",
    program: "Professional Development",
    earnedOn: "2025-07-10",
    downloadUrl: "#",
    verifyUrl: "#",
    tags: ["Certificate"],
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const c = await getCert(params.id)
  const meta = (
    <div className="flex flex-wrap gap-2">
      <Badge>{c.program}</Badge>
      <Badge>Earned {new Date(c.earnedOn).toLocaleDateString()}</Badge>
      {c.tags.map((t: string) => (
        <Badge key={t}>#{t}</Badge>
      ))}
    </div>
  )
  const actions = (
    <>
      <PrimaryBtn onClick={() => location.assign(c.downloadUrl)}>Download PDF</PrimaryBtn>
      {c.verifyUrl && <SecondaryLink href={c.verifyUrl}>Verify</SecondaryLink>}
      <SecondaryLink href="#">Share</SecondaryLink>
    </>
  )

  return (
    <DetailLayout
      breadcrumb={{ label: "Certificates", href: "/certificates" }}
      title={c.title}
      meta={meta}
      actions={actions}
    >
      <p className="text-gray-800">Keep this certificate for your records or share it with your district/HR.</p>
    </DetailLayout>
  )
}
