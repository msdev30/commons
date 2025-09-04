import { type NextRequest, NextResponse } from "next/server"
import { extractPdfMetaFromUrl } from "@/lib/pdf"

export async function POST(req: NextRequest) {
  try {
    const { pdfUrls } = (await req.json()) as { pdfUrls: string[] }

    if (!Array.isArray(pdfUrls) || pdfUrls.length === 0) {
      return NextResponse.json({ error: "Provide { pdfUrls: string[] }" }, { status: 400 })
    }

    const results = await Promise.allSettled(pdfUrls.map((url) => extractPdfMetaFromUrl(url)))

    const items = results.map((r, idx) => ({
      url: pdfUrls[idx],
      status: r.status,
      meta: r.status === "fulfilled" ? r.value : undefined,
      error: r.status === "rejected" ? r.reason?.message || "failed" : undefined,
    }))

    // TODO: persist to DB as White Paper records, then return IDs
    return NextResponse.json({ items })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "PDF ingest error" }, { status: 500 })
  }
}
