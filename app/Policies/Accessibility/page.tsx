"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import PageShell from "@/components/policy/PageShell"
import Section from "@/components/policy/Section"
import {
  Accessibility as A11y,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Monitor,
  Keyboard,
  Eye,
  Volume2,
  Download,
  Share2,
  BookOpen,
  ShieldCheck,
  Target,
  Sparkles,
  Info,
  ChevronRight,
  FileText,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Navigation from "@/components/Navigation"

/* =========================================================
   Local Helpers: Table of Contents + Utilities
========================================================= */
const tocSections = [
  { id: "overview", label: "Overview" },
  { id: "standards", label: "Standards & Compliance" },
  { id: "features", label: "Accessibility Features" },
  { id: "assistive-tech", label: "Assistive Tech" },
  { id: "testing", label: "Testing & QA" },
  { id: "feedback", label: "Support & Feedback" },
  { id: "roadmap", label: "Roadmap & Issues" },
  { id: "faq", label: "FAQ" },
]

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0])
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id)
          })
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 1] }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [ids])
  return active
}

function StickyTOC() {
  const active = useActiveSection(tocSections.map((s) => s.id))
  return (
    <aside
      aria-label="Page navigation"
      className="hidden lg:block sticky top-24 h-[calc(100vh-7rem)] w-64 shrink-0 border-r border-border/60 pr-4"
    >
      <div className="px-3 pt-4 pb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </div>
      <nav className="flex flex-col gap-1 px-2">
        {tocSections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`group flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] transition-colors ${
              active === s.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <ChevronRight className={`h-3.5 w-3.5 transition-transform ${active === s.id ? "translate-x-0.5" : "-translate-x-0.5"}`} />
            <span>{s.label}</span>
          </a>
        ))}
      </nav>

      {/* Policy quicklinks */}
      <div className="mt-6 px-3">
        <Card className="border-dashed">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Resources
            </CardTitle>
            <CardDescription className="text-xs">Docs & external standards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4" />
              <Link href="#standards" className="hover:underline">
                WCAG 2.2 AA Matrix
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4" />
              <a
                href="https://www.w3.org/WAI/standards-guidelines/wcag/"
                target="_blank"
                className="inline-flex items-center gap-1 hover:underline"
                rel="noreferrer"
              >
                WCAG Overview <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  )
}

/* =========================================================
   Page
========================================================= */
export default function Page() {
  const [progress] = useState(98.5)
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print()
  }

  const meta = useMemo(
    () => ({ lastUpdated: "Sep 05, 2025", version: "2.0" }),
    []
  )

  return (
    <>
      <a
        href="#overview"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground shadow"
      >
        Skip to content
      </a>
      <Navigation />

      {/* Floating action bar */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 rounded-2xl border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 shadow-lg">
        <Button size="sm" variant="outline" onClick={handlePrint} className="gap-2">
          <Download className="h-4 w-4" /> Save / Print PDF
        </Button>
        <Button size="sm" variant="default" className="gap-2" onClick={() => navigator.share?.({ title: "Erudyte Accessibility", url: location.href })}>
          <Share2 className="h-4 w-4" /> Share
        </Button>
      </div>

      <div className="pb-40">
        <div className="mx-auto flex w-full max-w-7xl gap-8 px-4 sm:px-6 lg:px-8">
          <StickyTOC />

          <main ref={printRef} className="min-w-0 flex-1">
            <PageShell
              icon={<A11y className="h-6 w-6" />}
              title="Accessibility Statement"
              subtitle="Our commitment to inclusive design, universal access, and compliance with international accessibility standards across all Erudyte experiences."
              lastUpdated={meta.lastUpdated}
              version={meta.version}
            >
              {/* Top Meta + Badges */}
              <div id="overview" className="scroll-mt-32">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <Card className="md:col-span-3">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" /> Compliance Snapshot
                      </CardTitle>
                      <CardDescription>Live status of our conformance posture</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Compliance Level</div>
                        <div className="text-2xl font-semibold text-green-600">WCAG 2.2 AA</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Last Audit</div>
                        <div className="text-2xl font-semibold">July 2025</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Issues Resolved (12 mo)</div>
                        <div className="text-2xl font-semibold text-blue-600">{progress}%</div>
                        <Progress className="mt-2" value={progress} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Sparkles className="h-4 w-4" /> Highlights
                      </CardTitle>
                      <CardDescription>What you can expect</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Screen-reader first layouts</div>
                      <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Keyboard-only workflows</div>
                      <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Captions + transcripts by default</div>
                      <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Personalizable UI (contrast, motion)</div>
                    </CardContent>
                  </Card>
                </div>

                <Alert className="mt-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-900 dark:text-blue-100">Our Accessibility Commitment</AlertTitle>
                  <AlertDescription className="text-blue-800 dark:text-blue-200">
                    Erudyte is committed to ensuring digital accessibility for all users, including those with disabilities. We design, build, and test to meet or exceed WCAG 2.2 AA and relevant regional standards.
                  </AlertDescription>
                </Alert>
              </div>

              {/* Standards & Compliance */}
              <Section id="standards" title="Accessibility Standards & Legal Compliance">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" /> Primary Standards
                    </h4>
                    <ul className="space-y-2 ml-6">
                      <li className="flex items-start gap-2"><Badge variant="secondary" className="mt-0.5">WCAG 2.2 AA</Badge><span>Baseline target across all digital experiences</span></li>
                      <li className="flex items-start gap-2"><Badge variant="secondary" className="mt-0.5">Section 508</Badge><span>U.S. federal requirements for public sector & education</span></li>
                      <li className="flex items-start gap-2"><Badge variant="secondary" className="mt-0.5">EN 301 549</Badge><span>European ICT accessibility procurement standard</span></li>
                      <li className="flex items-start gap-2"><Badge variant="secondary" className="mt-0.5">ADA</Badge><span>Americans with Disabilities Act compliance</span></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2"><FileText className="h-4 w-4" /> Technical Implementation</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• ARIA best practices & semantic HTML</li>
                      <li>• CSS-first layouts; graceful no‑CSS fallback</li>
                      <li>• Progressive enhancement; core UX without JS</li>
                      <li>• Responsive to assistive-technology viewports</li>
                      <li>• Internationalization & bidi content support</li>
                    </ul>
                  </div>

                  <Tabs defaultValue="aa" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="aa">WCAG AA</TabsTrigger>
                      <TabsTrigger value="aaa">WCAG AAA (aspirational)</TabsTrigger>
                      <TabsTrigger value="legal">Legal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="aa">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Conformance Level</AlertTitle>
                        <AlertDescription>This website conforms to WCAG 2.2 level AA. We test with automated and manual evaluation on every release.</AlertDescription>
                      </Alert>
                    </TabsContent>
                    <TabsContent value="aaa">
                      <Card>
                        <CardHeader><CardTitle className="text-base">Areas we pursue</CardTitle></CardHeader>
                        <CardContent className="text-sm text-muted-foreground">We track AAA success criteria such as enhanced contrast, extended captions, and sign-language support where feasible.</CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="legal">
                      <Card>
                        <CardHeader><CardTitle className="text-base">Jurisdictions</CardTitle></CardHeader>
                        <CardContent className="text-sm grid sm:grid-cols-2 gap-2">
                          <div>• U.S.: ADA, Section 508</div>
                          <div>• EU: EN 301 549</div>
                          <div>• UK: Equality Act 2010</div>
                          <div>• Canada: ACA & provincial acts</div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </Section>

              {/* Features */}
              <Section id="features" title="Comprehensive Accessibility Features">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base"><Keyboard className="h-4 w-4" /> Keyboard Navigation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground mb-3">Full keyboard accessibility without mouse dependency</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Logical tab order & visible focus</li>
                        <li>• Skip links & landmark roles</li>
                        <li>• Shortcuts for common actions</li>
                        <li>• Arrow-key grid/list navigation</li>
                        <li>• Escape to close dialogs/menus</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base"><Eye className="h-4 w-4" /> Visual Accessibility</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground mb-3">Optimized for users with visual impairments</p>
                      <ul className="space-y-1 text-sm">
                        <li>• AA contrast (4.5:1+), HC theme</li>
                        <li>• Zoom up to 200% without scroll</li>
                        <li>• Alt text for meaningful images</li>
                        <li>• Reduced‑motion options</li>
                        <li>• Screen-reader friendly headings</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base"><Volume2 className="h-4 w-4" /> Audio & Video</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground mb-3">Comprehensive multimedia accessibility</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Closed captions for all videos</li>
                        <li>• Downloadable, searchable transcripts</li>
                        <li>• Audio descriptions where needed</li>
                        <li>• Volume & playback speed controls</li>
                        <li>• Live captioning upon request</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base"><Monitor className="h-4 w-4" /> Cognitive Accessibility</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground mb-3">Supporting diverse learning & processing needs</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Clear, consistent navigation patterns</li>
                        <li>• Plain language & readable layouts</li>
                        <li>• Progress indicators & breadcrumbs</li>
                        <li>• Customizable interface preferences</li>
                        <li>• Error prevention & clear recovery</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </Section>

              {/* Assistive Tech */}
              <Section id="assistive-tech" title="Assistive Technology Support">
                <div className="space-y-4">
                  <p>Erudyte is designed to work seamlessly with a wide range of assistive technologies:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Screen Readers</h4>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• NVDA (Windows) – Fully supported</li>
                        <li>• JAWS (Windows) – Fully supported</li>
                        <li>• VoiceOver (macOS/iOS) – Fully supported</li>
                        <li>• TalkBack (Android) – Fully supported</li>
                        <li>• Narrator (Windows) – Basic support</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Other Assistive Technologies</h4>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Voice recognition software</li>
                        <li>• Switch navigation devices</li>
                        <li>• Eye tracking systems</li>
                        <li>• Magnification software</li>
                        <li>• Alternative keyboards</li>
                      </ul>
                    </div>
                  </div>
                  <Alert className="mt-2">
                    <AlertTitle>Testing Commitment</AlertTitle>
                    <AlertDescription>
                      We regularly test with real users and maintain compatibility with current versions of popular screen readers and tools.
                    </AlertDescription>
                  </Alert>
                </div>
              </Section>

              {/* Testing & QA */}
              <Section id="testing" title="Testing & Quality Assurance">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Multi‑Layer Testing</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm">Automated</CardTitle></CardHeader>
                        <CardContent className="space-y-2 text-xs">
                          <div>• axe‑core / Lighthouse (CI)</div>
                          <div>• Pa11y / WAVE sweeps</div>
                          <div>• Daily automated scans</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm">Manual</CardTitle></CardHeader>
                        <CardContent className="space-y-2 text-xs">
                          <div>• Keyboard‑only walkthroughs</div>
                          <div>• Screen‑reader journeys</div>
                          <div>• Contrast & zoom (400%)</div>
                          <div>• Focus management reviews</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm">User Studies</CardTitle></CardHeader>
                        <CardContent className="space-y-2 text-xs">
                          <div>• Quarterly tests with PWD</div>
                          <div>• A/B tests for accessibility</div>
                          <div>• Expert audits</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Issue Resolution SLA</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3"><Badge variant="destructive">Critical</Badge><span className="text-sm">Barrier to access – fix within 24h</span></div>
                      <div className="flex items-center gap-3"><Badge variant="secondary">High</Badge><span className="text-sm">Significant impact – 3 business days</span></div>
                      <div className="flex items-center gap-3"><Badge variant="outline">Medium</Badge><span className="text-sm">Moderate – within 2 weeks</span></div>
                      <div className="flex items-center gap-3"><Badge variant="outline">Low</Badge><span className="text-sm">Minor – next release</span></div>
                    </div>
                  </div>

                  <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertTitle>Continuous Monitoring</AlertTitle>
                    <AlertDescription>Accessibility checks run on every PR before deploy to prevent regressions.</AlertDescription>
                  </Alert>
                </div>
              </Section>

              {/* Support & Feedback */}
              <Section id="feedback" title="Accessibility Support & Feedback">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Report Accessibility Issues</CardTitle>
                        <CardDescription>Help us improve by reporting barriers</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2"><strong className="text-sm">Email:</strong><Link href="mailto:accessibility@erudyte.com" className="text-primary hover:underline">accessibility@erudyte.com</Link></div>
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium mb-2">Include:</p>
                          <ul className="space-y-1 ml-4">
                            <li>• Page URL</li>
                            <li>• Description of the problem</li>
                            <li>• Browser & assistive tech used</li>
                            <li>• Screenshots or recordings (if any)</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Request Accommodations</CardTitle>
                        <CardDescription>Alternative formats & personal assistance</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <ul className="space-y-1 text-sm ml-4">
                          <li>• Accessible document conversion</li>
                          <li>• Extended time for timed tasks</li>
                          <li>• 1:1 support sessions</li>
                          <li>• Custom UI adjustments</li>
                          <li>• Live captions for events</li>
                        </ul>
                        <p className="text-xs text-muted-foreground">Typical response time: within 2 business days.</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Alert>
                    <Users className="h-4 w-4" />
                    <AlertTitle>Accessibility Team</AlertTitle>
                    <AlertDescription>Our team includes certified professionals and users with disabilities who shape our design & development process.</AlertDescription>
                  </Alert>
                </div>
              </Section>

              {/* Roadmap & Known Issues */}
              <Section id="roadmap" title="Accessibility Roadmap & Known Issues" badge="Updated Monthly">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2"><Clock className="h-4 w-4" /> Current Initiatives (2025)</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3"><Badge className="bg-blue-100 text-blue-800 border-blue-200">Q3 2025</Badge><div><p className="font-medium text-sm">Enhanced Mobile Accessibility</p><p className="text-xs text-muted-foreground">Better touch targets, gesture alternatives, mobile SR optimization</p></div></div>
                      <div className="flex items-start gap-3"><Badge className="bg-green-100 text-green-800 border-green-200">Q4 2025</Badge><div><p className="font-medium text-sm">Advanced Personalization</p><p className="text-xs text-muted-foreground">User‑customizable accessibility preferences & adaptive UI</p></div></div>
                      <div className="flex items-start gap-3"><Badge className="bg-purple-100 text-purple-800 border-purple-200">2026</Badge><div><p className="font-medium text-sm">AI‑Powered Accessibility</p><p className="text-xs text-muted-foreground">Automated alt text, content simplification, predictive features</p></div></div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">Known Limitations & Workarounds</h4>
                    <div className="space-y-2">
                      <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <AlertTitle className="text-yellow-900 dark:text-yellow-100">Legacy Content</AlertTitle>
                        <AlertDescription className="text-yellow-800 dark:text-yellow-200">Some older course materials and PDFs may not meet current standards. We are updating these and can provide accessible alternatives on request.</AlertDescription>
                      </Alert>
                      <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                        <AlertTitle className="text-orange-900 dark:text-orange-100">Third‑Party Integrations</AlertTitle>
                        <AlertDescription className="text-orange-800 dark:text-orange-200">Some embedded tools may have limited accessibility. We work with vendors and offer alternative access methods when needed.</AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </div>
              </Section>

              {/* FAQ */}
              <Section id="faq" title="Frequently Asked Questions">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>How do I request accessible formats for course materials?</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-3">You can request accessible formats through the following:</p>
                      <ul className="space-y-2 ml-4">
                        <li>• Email <Link href="mailto:accessibility@erudyte.com" className="text-primary">accessibility@erudyte.com</Link></li>
                        <li>• Use the “Request Accessible Format” link on each course page</li>
                        <li>• Contact your instructor or course coordinator</li>
                      </ul>
                      <p className="mt-3 text-sm text-muted-foreground">We aim to provide alternatives within 48 hours for standard requests.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-2">
                    <AccordionTrigger>Are all videos captioned and do they include transcripts?</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">Yes. Our video accessibility includes:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Professional closed captions for all new content</li>
                        <li>• Interactive, downloadable transcripts</li>
                        <li>• Audio descriptions for significant visuals</li>
                      </ul>
                      <p className="mt-3 text-sm">We are retrofitting older content and expect completion by end of 2025.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-3">
                    <AccordionTrigger>What browsers and assistive technologies do you support?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium mb-2">Supported Browsers</p>
                          <p className="text-sm">Chrome, Firefox, Safari, and Edge (current & previous major)</p>
                        </div>
                        <div>
                          <p className="font-medium mb-2">Screen Readers</p>
                          <p className="text-sm">NVDA, JAWS, VoiceOver, TalkBack</p>
                        </div>
                        <div>
                          <p className="font-medium mb-2">Other Tech</p>
                          <p className="text-sm">Voice recognition, switches, magnifiers, alternative inputs</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-4">
                    <AccordionTrigger>How quickly are accessibility issues resolved?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center"><span className="text-sm font-medium">Critical (blocks access)</span><Badge variant="destructive">24 hours</Badge></div>
                        <div className="flex justify-between items-center"><span className="text-sm font-medium">High (significant impact)</span><Badge variant="secondary">3 business days</Badge></div>
                        <div className="flex justify-between items-center"><span className="text-sm font-medium">Medium (moderate)</span><Badge variant="outline">2 weeks</Badge></div>
                        <div className="flex justify-between items-center"><span className="text-sm font-medium">Low (minor)</span><Badge variant="outline">Next release</Badge></div>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">We provide interim workarounds while permanent fixes ship.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-5">
                    <AccordionTrigger>Do you provide training on using accessibility features?</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-3">Yes. We offer onboarding, video tutorials, 1:1 support, guides, and community forums.</p>
                      <p className="text-sm">Request a session via the accessibility team email above.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-6">
                    <AccordionTrigger>How do I customize the interface for my needs?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p>Open <strong>Account Settings → Accessibility</strong> to configure:</p>
                        <ul className="space-y-1 ml-4 text-sm">
                          <li>• Contrast themes & custom palettes</li>
                          <li>• Font size up to 200%</li>
                          <li>• Motion reduction</li>
                          <li>• Keyboard navigation prefs</li>
                          <li>• Screen‑reader optimization</li>
                          <li>• Media playback defaults</li>
                        </ul>
                        <p className="text-sm text-muted-foreground">Preferences sync across devices.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Section>

              {/* Footer */}
              <div className="mt-12 p-6 bg-muted rounded-lg">
                <div className="flex items-start gap-4">
                  <A11y className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Accessibility is a Journey, Not a Destination</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      We recognize accessibility is an ongoing commitment requiring continuous improvement, community feedback, and inclusive design.
                    </p>
                    <p className="text-sm">
                      <strong>Last updated:</strong> {meta.lastUpdated} • <strong>Version:</strong> {meta.version} • <strong>Next review:</strong> Nov 2025
                    </p>
                  </div>
                </div>
              </div>
            </PageShell>
          </main>
        </div>
      </div>
    </>
  )
}
