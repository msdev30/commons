"use client"

import DetailLayout, { Badge, PrimaryBtn, SecondaryLink } from "@/components/DetailLayout"

async function getWebinar(id: string) {
  // Replace with real API call
  return {
    id,
    title: "Grant Calendars & Capacity Planning",
    summary: "How districts align grant timelines with staffing and PD.",
    speakers: ["Whitney James", "Max Chen"],
    duration: "60m",
    date: "2025-08-22T17:00:00Z",
    replayUrl: "#",
    registerUrl: "#",
    tags: ["Grants", "Planning"],
    cover: "/images/webinars/grant-cal.jpg",
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const w = await getWebinar(params.id)
  const meta = (
    <div className="flex flex-wrap gap-2">
      <Badge>{new Date(w.date).toLocaleString()}</Badge>
      <Badge>{w.duration}</Badge>
      {w.speakers.map((s) => (
        <Badge key={s}>{s}</Badge>
      ))}
      {w.tags.map((t: string) => (
        <Badge key={t}>#{t}</Badge>
      ))}
    </div>
  )
  const actions = (
    <>
      {w.replayUrl ? <SecondaryLink href={w.replayUrl}>Watch replay</SecondaryLink> : null}
      {w.registerUrl ? <PrimaryBtn onClick={() => location.assign(w.registerUrl!)}>Register</PrimaryBtn> : null}
      <SecondaryLink href="#">Add to calendar</SecondaryLink>
    </>
  )

  return (
    <DetailLayout
      breadcrumb={{ label: "Webinars", href: "/webinars" }}
      title={w.title}
      subtitle={w.summary}
      meta={meta}
      actions={actions}
      related={[1, 2, 3].map((i) => (
        <a key={i} href={`/webinars/w${i}`} className="rounded-xl border p-4 hover:bg-gray-50">
          <div className="text-sm font-medium">Related Webinar {i}</div>
          <div className="text-xs text-gray-600">60m · Replay</div>
        </a>
      ))}
    >
      <div className="space-y-4">
        {w.cover && <img src={w.cover || "/placeholder.svg"} alt="" className="w-full rounded-xl border" />}
        <h3 className="font-semibold">Overview</h3>
        <p className="text-gray-800">{w.summary}</p>
        <h3 className="font-semibold">Speakers</h3>
        <ul className="list-disc pl-5 text-gray-800">
          {w.speakers.map((s: string) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </DetailLayout>
  )
}
