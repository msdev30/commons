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

      {/* Body + sticky TOC */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main */}
          <div className="lg:col-span-8 space-y-10">{children}</div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-base">On this page</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <nav className="space-y-2" id="toc" />
                <Separator className="my-4" />
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">Quick actions</div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" size="sm" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" /> Download PDF
                    </Button>
                    <Button asChild size="sm">
                      <Link href="/contact">
                        <Mail className="h-4 w-4 mr-2" /> Contact us
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  )
}
