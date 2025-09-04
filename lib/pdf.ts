import axios from "axios"
import pdf from "pdf-parse"

export interface PdfMeta {
  title?: string
  author?: string
  pages?: number
  keywords?: string[]
  producer?: string
  creationDate?: string // ISO
  modDate?: string // ISO
}

function pdfDateToISO(d?: string) {
  // PDF dates like D:20240531123000Z
  if (!d) return undefined
  const m = d.match(/D:(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})?/)
  if (!m) return undefined
  const [_, Y, M, D, h, m2, s] = m
  return new Date(`${Y}-${M}-${D}T${h}:${m2}:${s || "00"}Z`).toISOString()
}

export async function extractPdfMetaFromUrl(url: string): Promise<PdfMeta> {
  const res = await axios.get<ArrayBuffer>(url, { responseType: "arraybuffer" })
  const data = await pdf(Buffer.from(res.data))
  const info = data.info || {}
  return {
    title: info.Title,
    author: info.Author,
    pages: data.numpages,
    keywords:
      typeof info.Keywords === "string"
        ? info.Keywords.split(/[;,]/)
            .map((s) => s.trim())
            .filter(Boolean)
        : undefined,
    producer: info.Producer,
    creationDate: pdfDateToISO(info.CreationDate),
    modDate: pdfDateToISO(info.ModDate),
  }
}
