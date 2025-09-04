import { type NextRequest, NextResponse } from "next/server"
import { fetchRssMany } from "@/lib/rss"

export async function POST(req: NextRequest) {
  try {
    const { feeds, limitPerFeed = 15 } = (await req.json()) as { feeds: string[]; limitPerFeed?: number }

    if (!Array.isArray(feeds) || feeds.length === 0) {
      return NextResponse.json({ error: "Provide { feeds: string[] }" }, { status: 400 })
    }

    const items = await fetchRssMany(feeds, limitPerFeed)

    // TODO: persist to DB if desired
    return NextResponse.json({ items })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "RSS error" }, { status: 500 })
  }
}
