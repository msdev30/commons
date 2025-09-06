"use client"
import Link from "next/link"
import Section from "@/components/policy/Section"
import { FileText, Users, Shield, CreditCard, AlertTriangle, Scale, Book, RefreshCw, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Navigation from "@/components/Navigation"
import { useEffect, useState } from "react"

const sections = [
  { id: "acceptance", label: "Acceptance" },
]

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(id)
          })
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: [0, 1] }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [ids])
  return active
}

function ScrollRail() {
  const active = useActiveSection(sections.map((s) => s.id))
  return (
    <div className="hidden xl:block fixed right-6 top-32 z-30">
      <nav aria-label="Section progress" className="flex flex-col gap-3 items-center">
        {sections.map((s) => {
          const isActive = active === s.id
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={[
                "group relative flex h-3.5 w-3.5 items-center justify-center rounded-full transition-all",
                "ring-1 ring-zinc-300 dark:ring-zinc-700",
                isActive
                  ? "scale-110 bg-emerald-500/90 ring-emerald-400 dark:ring-emerald-500"
                  : "bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600"
              ].join(" ")}
            >
              <span className="pointer-events-none absolute -left-2 -right-2 -top-2 -bottom-2" />
              <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs text-muted-foreground opacity-0 translate-x-[-6px] transition-all group-hover:opacity-100 group-hover:translate-x-0">
                {s.label}
              </span>
            </a>
          )
        })}
      </nav>
    </div>
  )
}

export default function Page() {
  return (
    <>
      <Navigation />
      <div className="pb-40 relative">
        <ScrollRail />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">User Agreement</h1>
                <p className="text-muted-foreground">The comprehensive terms that govern your use of Erudyte's educational platform, products, and services.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Last updated: Aug 27, 2025</span>
              <span>•</span>
              <span>Version 3.0</span>
            </div>
          </div>

          <div className="space-y-12">
            {/* Hero Statement */}
            <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
              <Scale className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-900 dark:text-blue-100">Legal Agreement</AlertTitle>
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                This User Agreement creates a binding legal contract between you and Erudyte. By creating an account or using our services, you agree to these terms and our Privacy Policy. Please read carefully to understand your rights and responsibilities.
              </AlertDescription>
            </Alert>

            {/* Quick Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Agreement Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-blue-600">Binding Contract</div>
                  <p className="text-xs text-muted-foreground mt-1">Legal obligations</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Minimum Age</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-green-600">18 Years</div>
                  <p className="text-xs text-muted-foreground mt-1">Or institutional auth</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Governing Law</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">Jurisdiction</div>
                  <p className="text-xs text-muted-foreground mt-1">Per contracting entity</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-purple-600">Advance Notice</div>
                  <p className="text-xs text-muted-foreground mt-1">For material changes</p>
                </CardContent>
              </Card>
            </div>

            {/* Acceptance of Terms */}
            <Section id="acceptance" title="Acceptance of Terms">
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  By accessing or using Erudyte's services, you enter into a legally binding agreement with us. This section explains how and when this agreement takes effect.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <CheckCircle className="h-4 w-4" />
                        Agreement Formation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h5 className="font-medium text-sm mb-2">You agree to these terms by:</h5>
                        <ul className="space-y-1 text-sm ml-4">
                          <li>• Creating an account on our platform</li>
                          <li>• Using any of our services or features</li>
                          <li>• Downloading our mobile applications</li>
                          <li>• Participating in our educational programs</li>
                          <li>• Accessing content through institutional partnerships</li>
                        </ul>
                      </div>
                      <div className="text-xs text-muted-foreground p-2 bg-blue-50 dark:bg-blue-950 rounded">
                        <strong>Important:</strong> If you do not agree to these terms, you may not use our services.
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <FileText className="h-4 w-4" />
                        Related Agreements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h5 className="font-medium text-sm mb-2">This agreement includes:</h5>
                        <ul className="space-y-1 text-sm ml-4">
                          <li>• <Link href="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link> — how we handle your data</li>
                          <li>• <Link href="/legal/community-guidelines" className="text-primary hover:underline">Community Guidelines</Link> — behavior standards</li>
                          <li>• <Link href="/legal/accessibility" className="text-primary hover:underline">Accessibility Statement</Link> — our inclusion commitment</li>
                          <li>• Course-specific terms for individual programs</li>
                          <li>• Enterprise agreements for institutional users</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Legal Capacity Required</AlertTitle>
                  <AlertDescription>
                    You must have the legal authority to enter into this agreement. If you're using Erudyte on behalf of an organization, you represent that you have authority to bind that organization to these terms.
                  </AlertDescription>
                </Alert>
              </div>
            </Section>

            {/* Footer */}
            <div className="mt-12 p-6 bg-muted rounded-lg">
              <div className="flex items-start gap-4">
                <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Legal Foundation for Learning</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    This User Agreement establishes the legal framework for your educational journey with Erudyte. We've designed these terms to be fair, transparent, and protective of both your rights and our ability to provide excellent educational services. Thank you for being part of our learning community.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span><strong>Effective Date:</strong> August 27, 2025</span>
                    <span><strong>Version:</strong> 3.0</span>
                    <span><strong>Next Review:</strong> February 27, 2026</span>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <Link href="/legal/privacy" className="text-primary hover:underline text-sm">Privacy Policy</Link>
                    <Link href="/legal/community-guidelines" className="text-primary hover:underline text-sm">Community Guidelines</Link>
                    <Link href="/legal/accessibility" className="text-primary hover:underline text-sm">Accessibility Statement</Link>
                    <Link href="/legal/terms" className="text-primary hover:underline text-sm">Terms of Service</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}