"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"

type Props = {
  id: string
  title: string
  children: React.ReactNode
  badge?: string
  className?: string
}

/** Section that auto-injects a link into the #toc on mount */
export default function Section({ id, title, children, badge, className }: Props) {
  React.useEffect(() => {
    const toc = document.getElementById("toc")
    if (!toc) return
    const exists = toc.querySelector<HTMLAnchorElement>(`[href="#${id}"]`)
    if (exists) return
    const a = document.createElement("a")
    a.href = `#${id}`
    a.className = "block hover:text-primary transition-colors"
    a.textContent = title
    toc.appendChild(a)
  }, [id, title])

  return (
    <div id={id} className={`scroll-mt-28 ${className || ''}`}>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        {badge && <Badge variant="secondary" className="uppercase tracking-wide">{badge}</Badge>}
      </div>
      <div className="prose prose-zinc max-w-none dark:prose-invert">
        {children}
      </div>
    </div>
  )
}
