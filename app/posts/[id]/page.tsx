"use client"

import DetailLayout, { Badge, PrimaryBtn, SecondaryLink } from "@/components/DetailLayout"

async function getPost(id: string) {
  return {
    id,
    title: "Quick formative assessment ideas for Algebra",
    author: { name: "Max Chen", href: "/community/profile/max" },
    group: { name: "STEM Teachers Network", href: "/community/groups/g1" },
    date: new Date().toISOString(),
    tags: ["Algebra", "Assessment"],
    content: "Here are 5 fast ideas you can run in under 10 minutes...",
    comments: [{ id: "c1", author: "Whitney", text: "Exit tickets for the win!" }],
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const p = await getPost(params.id)
  const meta = (
    <div className="flex flex-wrap gap-2">
      <Badge>{new Date(p.date).toLocaleString()}</Badge>
      <Badge>By {p.author.name}</Badge>
      <Badge>{p.group.name}</Badge>
      {p.tags.map((t: string) => (
        <Badge key={t}>#{t}</Badge>
      ))}
    </div>
  )
  const actions = (
    <>
      <PrimaryBtn onClick={() => alert("Reacted!")}>React</PrimaryBtn>
      <SecondaryLink href={`${p.group.href}`}>Join group</SecondaryLink>
      <SecondaryLink href={`${p.author.href}`}>Follow author</SecondaryLink>
    </>
  )

  return (
    <DetailLayout breadcrumb={{ label: "Posts", href: "/posts" }} title={p.title} meta={meta} actions={actions}>
      <div className="prose prose-sm max-w-none text-gray-900">{p.content}</div>
      <hr className="my-4" />
      <h3 className="font-semibold mb-2">Comments</h3>
      <ul className="space-y-2">
        {p.comments.map((c: any) => (
          <li key={c.id} className="rounded-xl border p-3">
            <div className="text-sm font-medium">{c.author}</div>
            <div className="text-gray-800">{c.text}</div>
          </li>
        ))}
      </ul>
    </DetailLayout>
  )
}
