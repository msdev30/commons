"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download, Mail, Printer } from "lucide-react"

type ShellProps = {
  icon: React.ReactNode
  title: string
  subtitle?: string
  lastUpdated?: string
  version?: string
  children: React.ReactNode
}

export default function PageShell({
  icon,
  title,
  subtitle,
  lastUpdated,
  version,
  children,
}: ShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      {/* Hero */}
      <section className="border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">{icon}</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h1>
              {subtitle && <p className="text-muted-foreground mt-2 max-w-2xl">{subtitle}</p>}
              {(lastUpdated || version) && (
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  {lastUpdated && <span>Last updated: <time>{lastUpdated}</time></span>}
                  {version && <span>• Version {version}</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="space-y-10">{children}</div>
      </section>
    </div>
  )
}
