"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import PageShell from "@/components/policy/PageShell"
import Section from "@/components/policy/Section"
import Navigation from "@/components/Navigation"
import {
  FileText,
  Users,
  CreditCard,
  Shield,
  AlertTriangle,
  Scale,
  Book,
  MessageSquare,
  Award,
  RefreshCw,
  ChevronRight,
  Download,
  Share2,
  Sparkles,
  ShieldCheck,
  Gavel,
  Info,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/* =========================================================
   Local: TOC + helpers
========================================================= */
const toc = [
  { id: "overview", label: "Overview" },
  { id: "acceptance", label: "Acceptance & Eligibility" },
  { id: "services", label: "Services" },
  { id: "conduct", label: "Conduct" },
  { id: "payment", label: "Payments & Refunds" },
  { id: "intellectual-property", label: "IP & DMCA" },
  { id: "availability", label: "Availability & Tech" },
  { id: "liability", label: "Disclaimers & Liability" },
  { id: "termination", label: "Termination" },
  { id: "disputes", label: "Disputes" },
  { id: "updates", label: "Updates & Contact" },
  { id: "faq", label: "FAQ" },
  { id: "miscellaneous", label: "More Legal" },
]

function useActive(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs: IntersectionObserver[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const o = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActive(id)),
        { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 1] }
      )
      o.observe(el)
      obs.push(o)
    })
    return () => obs.forEach((o) => o.disconnect())
  }, [ids])
  return active
}

function StickyTOC() {
  const active = useActive(toc.map((t) => t.id))
  return (
    <aside aria-label="Page navigation" className="hidden lg:block sticky top-24 h-[calc(100vh-7rem)] w-64 shrink-0 border-r border-border/60 pr-4">
      <div className="px-3 pt-4 pb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">On this page</div>
      <nav className="flex flex-col gap-1 px-2">
        {toc.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className={`group flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] transition-colors no-underline ${
              active === t.id ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <ChevronRight className={`h-3.5 w-3.5 transition-transform ${active === t.id ? "translate-x-0.5" : "-translate-x-0.5"}`} />
            <span>{t.label}</span>
          </a>
        ))}
      </nav>
      <div className="mt-6 px-3">
        <Card className="border-dashed">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><Gavel className="h-4 w-4" /> Legal Shortcuts</CardTitle>
            <CardDescription className="text-xs">Jump to common topics</CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <Link className="block text-foreground no-underline hover:text-muted-foreground" href="#payment">Billing & Refunds</Link>
            <Link className="block text-foreground no-underline hover:text-muted-foreground" href="#disputes">Arbitration</Link>
            <Link className="block text-foreground no-underline hover:text-muted-foreground" href="#intellectual-property">DMCA</Link>
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
  const meta = useMemo(() => ({ lastUpdated: "Sep 05, 2025", version: "3.5" }), [])

  const print = () => typeof window !== "undefined" && window.print()

  return (
    <>
      <a href="#overview" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground shadow">Skip to content</a>
      <Navigation />

      {/* Floating actions */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 rounded-2xl border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 shadow-lg">
        <Button size="sm" variant="outline" className="gap-2" onClick={print}><Download className="h-4 w-4" /> Save / Print PDF</Button>
        <Button size="sm" className="gap-2" onClick={() => navigator.share?.({ title: "Erudyte Terms of Service", url: location.href })}><Share2 className="h-4 w-4" /> Share</Button>
      </div>

      <div className="pb-40">
        <div className="mx-auto flex w-full max-w-7xl gap-8 px-4 sm:px-6 lg:px-8">
          <StickyTOC />

          <main className="min-w-0 flex-1">
            {/* Hero Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
                  <p className="text-muted-foreground">The legal agreement governing your use of Erudyte's educational platform, services, and community features.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Last updated: {meta.lastUpdated}</span>
                <span>•</span>
                <span>Version {meta.version}</span>
              </div>
            </div>

            <div className="space-y-12">
              {/* Overview / Snapshot */}
              <div id="overview" className="scroll-mt-32">
                <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                  <Scale className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-900 dark:text-blue-100">Welcome to Erudyte</AlertTitle>
                  <AlertDescription className="text-blue-800 dark:text-blue-200">These Terms of Service create a legal agreement between you and Erudyte. By using our platform, you agree to these terms.</AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
                  <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Agreement Type</CardTitle></CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold text-blue-600">Legal Contract</div>
                      <p className="text-xs text-muted-foreground mt-1">Binding when you use our service</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Governing Law</CardTitle></CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold">California, USA</div>
                      <p className="text-xs text-muted-foreground mt-1">Legal jurisdiction</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Minimum Age</CardTitle></CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold text-green-600">13 Years</div>
                      <p className="text-xs text-muted-foreground mt-1">Or with parental consent</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Updates</CardTitle></CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold text-purple-600">30‑Day Notice</div>
                      <p className="text-xs text-muted-foreground mt-1">For material changes</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Acceptance & Eligibility */}
              <Section id="acceptance" title="Agreement Acceptance & Eligibility">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">By Using Erudyte, You Agree To:</h4>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-2"><Badge variant="secondary" className="mt-0.5">✓</Badge><span>Be bound by these Terms of Service and our Privacy Policy</span></li>
                      <li className="flex items-start gap-2"><Badge variant="secondary" className="mt-0.5">✓</Badge><span>Comply with all applicable laws and regulations in your jurisdiction</span></li>
                      <li className="flex items-start gap-2"><Badge variant="secondary" className="mt-0.5">✓</Badge><span>Use our service responsibly and respect other users' rights</span></li>
                      <li className="flex items-start gap-2"><Badge variant="secondary" className="mt-0.5">✓</Badge><span>Provide accurate information and keep your account secure</span></li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Users className="h-4 w-4" /> Eligibility Requirements</CardTitle></CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Age Requirements</h5>
                          <ul className="space-y-1 text-sm ml-4">
                            <li>• <strong>13+ years:</strong> Can create personal accounts independently</li>
                            <li>• <strong>Under 13:</strong> Requires parental consent and supervision</li>
                            <li>• <strong>Educational institutions:</strong> Can create supervised accounts for younger students</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Legal Capacity</h5>
                          <ul className="space-y-1 text-sm ml-4">
                            <li>• Ability to enter into binding agreements</li>
                            <li>• Not prohibited from using educational services</li>
                            <li>• Compliance with local educational regulations</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Shield className="h-4 w-4" /> Account Responsibilities</CardTitle></CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h5 className="font-medium text-sm mb-2">You Are Responsible For</h5>
                          <ul className="space-y-1 text-sm ml-4">
                            <li>• Maintaining the confidentiality of your login credentials</li>
                            <li>• All activities that occur under your account</li>
                            <li>• Keeping your contact information current and accurate</li>
                            <li>• Immediately notifying us of unauthorized access</li>
                            <li>• Using strong passwords and enabling two‑factor authentication</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Important Legal Notice</AlertTitle>
                    <AlertDescription>These terms are legally binding. If you do not agree, you may not access or use Erudyte. Continued use after changes indicates acceptance.</AlertDescription>
                  </Alert>
                </div>
              </Section>

              {/* Services */}
              <Section id="services" title="Erudyte Services & Features">
                <div className="space-y-6">
                  <p className="text-muted-foreground">Erudyte provides comprehensive online education services designed to help you learn new skills, advance your career, and achieve your educational goals.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Book className="h-4 w-4" /> Educational Content & Courses</CardTitle></CardHeader>
                      <CardContent className="space-y-2">
                        <ul className="space-y-1 text-sm">
                          <li>• <strong>On‑demand courses:</strong> Self‑paced learning with lifetime access</li>
                          <li>• <strong>Live sessions:</strong> Real‑time instruction and interactive workshops</li>
                          <li>• <strong>Learning paths:</strong> Structured sequences for skill development</li>
                          <li>• <strong>Assessments:</strong> Quizzes, projects, and peer evaluations</li>
                          <li>• <strong>Certificates:</strong> Verified completion credentials</li>
                          <li>• <strong>Resources:</strong> Downloadable materials and reference guides</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader><CardTitle className="flex items-center gap-2 text-base"><MessageSquare className="h-4 w-4" /> Community & Collaboration</CardTitle></CardHeader>
                      <CardContent className="space-y-2">
                        <ul className="space-y-1 text-sm">
                          <li>• <strong>Discussion forums:</strong> Course‑specific & general discussions</li>
                          <li>• <strong>Peer networking:</strong> Connect with learners & professionals</li>
                          <li>• <strong>Study groups:</strong> Collaborative learning opportunities</li>
                          <li>• <strong>Mentorship:</strong> Guidance from practitioners</li>
                          <li>• <strong>Project collaboration:</strong> Team assignments & portfolios</li>
                          <li>• <strong>Events:</strong> Webinars, workshops, virtual conferences</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Award className="h-4 w-4" /> Professional Development</CardTitle></CardHeader>
                      <CardContent className="space-y-2">
                        <ul className="space-y-1 text-sm">
                          <li>• <strong>Skill assessments:</strong> Evaluate current abilities</li>
                          <li>• <strong>Career guidance:</strong> Personalized recommendations</li>
                          <li>• <strong>Industry credentials:</strong> Recognized certifications</li>
                          <li>• <strong>Portfolio tools:</strong> Showcase projects & achievements</li>
                          <li>• <strong>Job board:</strong> Opportunities from partners</li>
                          <li>• <strong>Continuing education:</strong> Maintain credentials</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader><CardTitle className="flex items-center gap-2 text-base"><RefreshCw className="h-4 w-4" /> Platform Features</CardTitle></CardHeader>
                      <CardContent className="space-y-2">
                        <ul className="space-y-1 text-sm">
                          <li>• <strong>Personal dashboard:</strong> Track progress</li>
                          <li>• <strong>Mobile access:</strong> iOS & Android</li>
                          <li>• <strong>Offline downloads:</strong> Learn without internet</li>
                          <li>• <strong>Progress analytics:</strong> Detailed insights</li>
                          <li>• <strong>Customization:</strong> Personal preferences</li>
                          <li>• <strong>Integrations:</strong> Productivity tool connectors</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Alert>
                    <Book className="h-4 w-4" />
                    <AlertTitle>Service Availability</AlertTitle>
                    <AlertDescription>While we target 99.9% uptime, services may be unavailable due to maintenance or technical issues. We provide advance notice for planned maintenance and work quickly to resolve unplanned outages.</AlertDescription>
                  </Alert>
                </div>
              </Section>

              {/* Conduct */}
              <Section id="conduct" title="User Conduct & Community Guidelines">
                <div className="space-y-6">
                  <p className="text-muted-foreground">Erudyte is a learning community built on respect, collaboration, and academic integrity.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                      <CardHeader>
                        <CardTitle className="text-base text-green-900 dark:text-green-100">✅ Encouraged Behavior</CardTitle>
                        <CardDescription className="text-green-700 dark:text-green-300">What we love to see in our community</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
                          <li>• Asking thoughtful questions and helping others learn</li>
                          <li>• Sharing knowledge and learning experiences respectfully</li>
                          <li>• Providing constructive feedback on assignments and projects</li>
                          <li>• Engaging in meaningful discussions and debates</li>
                          <li>• Celebrating achievements and supporting struggling learners</li>
                          <li>• Reporting content that violates community guidelines</li>
                          <li>• Contributing original ideas and creative solutions</li>
                          <li>• Maintaining academic integrity in all submissions</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                      <CardHeader>
                        <CardTitle className="text-base text-red-900 dark:text-red-100">❌ Prohibited Activities</CardTitle>
                        <CardDescription className="text-red-700 dark:text-red-300">Behavior that will result in account restrictions</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ul className="space-y-1 text-sm text-red-800 dark:text-red-200">
                          <li>• Harassment, bullying, or discriminatory behavior</li>
                          <li>• Sharing false, misleading, or harmful information</li>
                          <li>• Plagiarism, cheating, or academic dishonesty</li>
                          <li>• Spamming, advertising, or unauthorized solicitation</li>
                          <li>• Sharing copyrighted material without permission</li>
                          <li>• Attempting to hack, disrupt, or abuse platform systems</li>
                          <li>• Creating multiple accounts to circumvent restrictions</li>
                          <li>• Posting inappropriate, offensive, or illegal content</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Academic Integrity Policy</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm">Original Work</CardTitle></CardHeader>
                        <CardContent className="space-y-2"><p className="text-xs text-muted-foreground">All submissions must be your own work or properly attributed</p><ul className="space-y-1 text-xs"><li>• Cite all sources and references</li><li>• Use quotation marks for direct quotes</li><li>• Collaborate only when explicitly permitted</li></ul></CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm">Honest Assessment</CardTitle></CardHeader>
                        <CardContent className="space-y-2"><p className="text-xs text-muted-foreground">Complete assessments without unauthorized assistance</p><ul className="space-y-1 text-xs"><li>• No sharing of quiz answers or solutions</li><li>• Complete timed assessments independently</li><li>• Report suspected cheating incidents</li></ul></CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm">Respectful Learning</CardTitle></CardHeader>
                        <CardContent className="space-y-2"><p className="text-xs text-muted-foreground">Maintain respect for instructors, peers, and content</p><ul className="space-y-1 text-xs"><li>• Engage constructively in discussions</li><li>• Provide honest peer feedback</li><li>• Respect intellectual property rights</li></ul></CardContent>
                      </Card>
                    </div>
                  </div>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Enforcement Policy</AlertTitle>
                    <AlertDescription>Violations may result in warnings, content removal, temporary suspension, or permanent account termination. Appeals are available.</AlertDescription>
                  </Alert>
                </div>
              </Section>

              {/* Payments */}
              <Section id="payment" title="Payment Terms & Subscription Policy">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader><CardTitle className="flex items-center gap-2 text-base"><CreditCard className="h-4 w-4" /> Pricing & Payment Methods</CardTitle></CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Course Options</h5>
                          <ul className="space-y-1 text-sm ml-4">
                            <li>• <strong>Free courses:</strong> No payment required; limited features</li>
                            <li>• <strong>Individual courses:</strong> One‑time purchase with lifetime access</li>
                            <li>• <strong>Subscriptions:</strong> Monthly or annual plans; full library access</li>
                            <li>• <strong>Specializations:</strong> Multi‑course programs with certificates</li>
                            <li>• <strong>Enterprise:</strong> Custom pricing for organizations</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Accepted Payment Methods</h5>
                          <ul className="space-y-1 text-sm ml-4">
                            <li>• Credit/debit cards (Visa, MasterCard, Amex)</li>
                            <li>• PayPal & digital wallets</li>
                            <li>• Bank transfers (enterprise)</li>
                            <li>• Educational vouchers & credits</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader><CardTitle className="flex items-center gap-2 text-base"><RefreshCw className="h-4 w-4" /> Billing & Renewals</CardTitle></CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Subscription Billing</h5>
                          <ul className="space-y-1 text-sm ml-4">
                            <li>• Automatic renewal unless cancelled</li>
                            <li>• Same‑date billing each cycle</li>
                            <li>• Email reminders before renewal</li>
                            <li>• Grace period for failed payments</li>
                            <li>• Cancel anytime before next cycle</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Price Changes</h5>
                          <ul className="space-y-1 text-sm ml-4">
                            <li>• 30‑day advance notice for subscription changes</li>
                            <li>• Current subscribers grandfathered for 6 months</li>
                            <li>• Option to cancel before new rates apply</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Refund Policy</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Badge variant="secondary">14 Days</Badge> Individual Courses</CardTitle></CardHeader>
                        <CardContent className="space-y-2"><p className="text-xs text-muted-foreground">Full refund if:</p><ul className="space-y-1 text-xs"><li>• Requested within 14 days of purchase</li><li>• Less than 20% of content accessed</li><li>• No certificates issued</li><li>• Course substantially different from description</li></ul></CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Badge variant="secondary">7 Days</Badge> Subscriptions</CardTitle></CardHeader>
                        <CardContent className="space-y-2"><p className="text-xs text-muted-foreground">Pro‑rated refund if:</p><ul className="space-y-1 text-xs"><li>• Cancelled within 7 days of initial subscription</li><li>• Limited usage of benefits</li><li>• Technical issues prevent access</li><li>• Billing errors or unauthorized charges</li></ul></CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Badge variant="outline">Case by Case</Badge> Special Circumstances</CardTitle></CardHeader>
                        <CardContent className="space-y-2"><p className="text-xs text-muted-foreground">We may offer refunds for:</p><ul className="space-y-1 text-xs"><li>• Medical emergencies or hardship</li><li>• Course cancellations by instructors</li><li>• Platform outages exceeding 48 hours</li><li>• Duplicate purchases or billing errors</li></ul></CardContent>
                      </Card>
                    </div>
                  </div>

                  <Alert>
                    <CreditCard className="h-4 w-4" />
                    <AlertTitle>Financial Aid & Scholarships</AlertTitle>
                    <AlertDescription>We offer need‑based assistance and scholarships via partners. Contact <Link href="mailto:support@erudyte.com" className="underline">support@erudyte.com</Link> for details.</AlertDescription>
                  </Alert>
                </div>
              </Section>

              {/* IP & DMCA */}
              <Section id="intellectual-property" title="Intellectual Property Rights">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader><CardTitle className="text-base">📚 Erudyte's Content & Materials</CardTitle><CardDescription>Our ownership and your usage rights</CardDescription></CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h5 className="font-medium text-sm mb-2">What We Own</h5>
                          <ul className="space-y-1 text-sm ml-4">
                            <li>• Course videos, text, and interactive content</li>
                            <li>• Platform software, design, and interface</li>
                            <li>• Erudyte trademarks, logos, and branding</li>
                            <li>• Proprietary algorithms and analytics</li>
                            <li>• Assessment tools and certification systems</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Your Usage Rights</h5>
                          <ul className="space-y-1 text-sm ml-4">
                            <li>• Personal, non‑commercial use of materials</li>
                            <li>• Offline downloads for personal study</li>
                            <li>• Share certificates and achievements</li>
                            <li>• Reference materials in academic work (with attribution)</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader><CardTitle className="text-base">👥 Your Content & Contributions</CardTitle><CardDescription>What you create and how we may use it</CardDescription></CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h5 className="font-medium text-sm mb-2">You Retain Ownership Of</h5>
                          <ul className="space-y-1 text-sm ml-4">
                            <li>• Original assignments, projects, and portfolios</li>
                            <li>• Discussion posts and peer feedback</li>
                            <li>• Profile content and personal information</li>
                            <li>• Creative works and intellectual contributions</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">License You Grant To Us</h5>
                          <ul className="space-y-1 text-sm ml-4">
                            <li>• Display your content within the platform</li>
                            <li>• Use for educational and promotional purposes</li>
                            <li>• Share anonymized examples for teaching</li>
                            <li>• Include in testimonials (with permission)</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Copyright Protection & DMCA Policy</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm">Reporting Infringement</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-xs text-muted-foreground mb-2">To report violations, include:</p>
                          <ul className="space-y-1 text-xs"><li>• Description of copyrighted work</li><li>• Location of infringing material</li><li>• Your contact info and e‑signature</li><li>• Good‑faith belief the use is unauthorized</li><li>• Accuracy statement under penalty of perjury</li></ul>
                          <p className="text-xs mt-2">Send to: <Link href="mailto:dmca@erudyte.com" className="text-primary">dmca@erudyte.com</Link></p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm">Counter‑Notification</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-xs text-muted-foreground mb-2">If your content was removed in error:</p>
                          <ul className="space-y-1 text-xs"><li>• Submit within 10 days</li><li>• Identify removed material</li><li>• State good‑faith belief in error</li><li>• Consent to federal jurisdiction</li><li>• Material may be restored in 10‑14 days</li></ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </Section>

              {/* Availability & Tech */}
              <Section id="availability" title="Service Availability & Technical Requirements">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2"><CardTitle className="text-sm">🌐 Platform Access</CardTitle></CardHeader>
                      <CardContent className="space-y-2">
                        <ul className="space-y-1 text-xs">
                          <li>• <strong>Target Uptime:</strong> 99.9% availability</li>
                          <li>• <strong>Maintenance:</strong> Scheduled during low‑usage</li>
                          <li>• <strong>Status:</strong> Real‑time at status.erudyte.com</li>
                          <li>• <strong>Mobile Apps:</strong> iOS and Android</li>
                          <li>• <strong>Offline:</strong> Downloaded content available</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2"><CardTitle className="text-sm">💻 System Requirements</CardTitle></CardHeader>
                      <CardContent className="space-y-2">
                        <ul className="space-y-1 text-xs">
                          <li>• <strong>Browsers:</strong> Chrome, Firefox, Safari, Edge</li>
                          <li>• <strong>Internet:</strong> Broadband recommended</li>
                          <li>• <strong>JavaScript:</strong> Must be enabled</li>
                          <li>• <strong>Cookies:</strong> Required for account</li>
                          <li>• <strong>Video:</strong> HTML5 video support</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2"><CardTitle className="text-sm">🔧 Technical Support</CardTitle></CardHeader>
                      <CardContent className="space-y-2">
                        <ul className="space-y-1 text-xs">
                          <li>• <strong>Help Center:</strong> 24/7 resources</li>
                          <li>• <strong>Email:</strong> Response within 24 hours</li>
                          <li>• <strong>Live Chat:</strong> Business hours</li>
                          <li>• <strong>Community:</strong> Peer assistance</li>
                          <li>• <strong>Tutorials:</strong> Step‑by‑step videos</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Service Modifications</AlertTitle>
                    <AlertDescription>We may modify, update, or discontinue features with reasonable notice. We aim to improve continuously while maintaining your progress and purchases.</AlertDescription>
                  </Alert>
                </div>
              </Section>

              {/* Disclaimers & Liability */}
              <Section id="liability" title="Disclaimers & Limitation of Liability">
                <div className="space-y-6">
                  <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertTitle className="text-yellow-900 dark:text-yellow-100">Important Legal Disclaimers</AlertTitle>
                    <AlertDescription className="text-yellow-800 dark:text-yellow-200">Please read these limitations carefully as they affect your legal rights and remedies.</AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Service Disclaimers</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="pt-4">
                            <h5 className="font-medium text-sm mb-2">"As Is" Basis</h5>
                            <p className="text-xs text-muted-foreground mb-2">Erudyte services are provided without warranties of any kind:</p>
                            <ul className="space-y-1 text-xs"><li>• No guarantee of uninterrupted or error‑free service</li><li>• Content accuracy is not warranted</li><li>• Third‑party integrations may have limitations</li><li>• Features may change or be discontinued</li></ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-4">
                            <h5 className="font-medium text-sm mb-2">Educational Outcomes</h5>
                            <p className="text-xs text-muted-foreground mb-2">While we strive for excellence, we cannot guarantee:</p>
                            <ul className="space-y-1 text-xs"><li>• Specific learning outcomes or skills</li><li>• Employment or career advancement</li><li>• Recognition of certificates by all institutions</li><li>• Compatibility with all learning needs</li></ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Limitation of Liability</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2"><CardTitle className="text-sm">💰 Monetary Damages</CardTitle></CardHeader>
                          <CardContent className="space-y-2"><p className="text-xs text-muted-foreground">Total liability limited to:</p><ul className="space-y-1 text-xs"><li>• Amount paid to Erudyte in the prior 12 months</li><li>• Or $100, whichever is greater</li><li>• No liability for lost profits or indirect damages</li></ul></CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2"><CardTitle className="text-sm">🚫 Excluded Damages</CardTitle></CardHeader>
                          <CardContent className="space-y-2"><p className="text-xs text-muted-foreground">We are not liable for:</p><ul className="space-y-1 text-xs"><li>• Indirect, incidental, or consequential damages</li><li>• Loss of data, revenue, or opportunities</li><li>• Damages from third‑party content or links</li></ul></CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2"><CardTitle className="text-sm">⚖️ Legal Exceptions</CardTitle></CardHeader>
                          <CardContent className="space-y-2"><p className="text-xs text-muted-foreground">Limitations don't apply to:</p><ul className="space-y-1 text-xs"><li>• Death or personal injury from negligence</li><li>• Fraud or fraudulent misrepresentation</li><li>• Violations of applicable consumer protection laws</li></ul></CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>

              {/* Termination */}
              <Section id="termination" title="Account Termination & Suspension">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader><CardTitle className="text-base">🔒 Termination by Erudyte</CardTitle><CardDescription>When we may suspend or terminate your account</CardDescription></CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Immediate Termination For</h5>
                          <ul className="space-y-1 text-sm ml-4"><li>• Serious violations of terms or guidelines</li><li>• Harassment, threats, or abusive behavior</li><li>• Fraudulent activity or chargebacks</li><li>• Sharing credentials or circumventing restrictions</li><li>• Illegal activity or copyright infringement</li></ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Suspension Process</h5>
                          <ul className="space-y-1 text-sm ml-4"><li>• Warning for first‑time minor violations</li><li>• Temporary suspension for repeated issues</li><li>• Opportunity to appeal</li><li>• Review and potential reinstatement</li></ul>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader><CardTitle className="text-base">🚪 Termination by You</CardTitle><CardDescription>How to close your account</CardDescription></CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Account Closure</h5>
                          <ul className="space-y-1 text-sm ml-4"><li>• Self‑service deletion in settings</li><li>• Email confirmation required</li><li>• 30‑day grace period for recovery</li><li>• Download your data before deletion</li><li>• Cancel subscriptions to avoid future billing</li></ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">After Closure</h5>
                          <ul className="space-y-1 text-sm ml-4"><li>• Immediate loss of course access</li><li>• Certificates remain valid but not re‑downloadable</li><li>• Personal data deleted per privacy policy</li><li>• Some records retained for compliance</li></ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Alert>
                    <RefreshCw className="h-4 w-4" />
                    <AlertTitle>Effect of Termination</AlertTitle>
                    <AlertDescription>Upon termination, access ceases. Provisions on IP, liability, and dispute resolution survive.</AlertDescription>
                  </Alert>
                </div>
              </Section>

              {/* Disputes */}
              <Section id="disputes" title="Dispute Resolution & Legal Terms">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader><CardTitle className="text-base">🤝 Informal Resolution</CardTitle><CardDescription>Our preferred approach</CardDescription></CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground mb-2">Before formal action, we encourage:</p>
                        <ul className="space-y-1 text-sm"><li>• Contact support at <Link href="mailto:legal@erudyte.com" className="underline">legal@erudyte.com</Link></li><li>• Provide detailed description of the issue</li><li>• Allow 30 days for good‑faith resolution</li><li>• Consider mediation</li></ul>
                        <p className="text-xs text-muted-foreground mt-3">Most issues resolve quickly via direct communication.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader><CardTitle className="text-base">⚖️ Formal Legal Process</CardTitle><CardDescription>Binding arbitration & jurisdiction</CardDescription></CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Binding Arbitration</h5>
                          <ul className="space-y-1 text-sm ml-4"><li>• Disputes resolved through individual arbitration</li><li>• AAA rules apply</li><li>• Venue: San Francisco, California</li><li>• No class actions or jury trials</li></ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Governing Law</h5>
                          <ul className="space-y-1 text-sm ml-4"><li>• California law governs these terms</li><li>• Federal courts have jurisdiction if arbitration is unavailable</li></ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Alert>
                    <Scale className="h-4 w-4" />
                    <AlertTitle>Arbitration Opt‑Out</AlertTitle>
                    <AlertDescription>You may opt out within 30 days of account creation by emailing <Link href="mailto:legal@erudyte.com" className="underline">legal@erudyte.com</Link> with your name, address, and a clear statement of intent.</AlertDescription>
                  </Alert>
                </div>
              </Section>

              {/* Updates & Contact */}
              <Section id="updates" title="Terms Updates & Contact Information">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader><CardTitle className="text-base">📝 How We Update These Terms</CardTitle></CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Update Process</h5>
                          <ul className="space-y-1 text-sm ml-4"><li>• Material changes: 30‑day email notice</li><li>• Minor updates: Platform notification</li><li>• Emergency changes: Immediate notice</li><li>• Version history available upon request</li></ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Your Options</h5>
                          <ul className="space-y-1 text-sm ml-4"><li>• Review changes before they take effect</li><li>• Close account if you disagree</li><li>• Continued use indicates acceptance</li></ul>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader><CardTitle className="text-base">📞 Legal Contact Information</CardTitle></CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2 text-sm">
                          <div><strong>General Legal:</strong><br/><Link href="mailto:legal@erudyte.com" className="text-primary hover:underline">legal@erudyte.com</Link></div>
                          <div><strong>DMCA Agent:</strong><br/><Link href="mailto:dmca@erudyte.com" className="text-primary hover:underline">dmca@erudyte.com</Link></div>
                          <div><strong>Mailing Address:</strong><br/>Erudyte Legal Department<br/>123 Education Boulevard<br/>San Francisco, CA 94105<br/>United States</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </Section>

              {/* FAQ */}
              <Section id="faq" title="Terms of Service FAQ">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>What happens if I violate the terms of service?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        <p>Consequences depend on severity and frequency:</p>
                        <div className="space-y-2"><div><strong>First‑time minor:</strong> Warning with opportunity to correct</div><div><strong>Repeated:</strong> Temporary suspension (1–30 days) with conditions</div><div><strong>Serious:</strong> Immediate termination; potential legal action; permanent ban</div></div>
                        <p className="text-xs text-muted-foreground">You may appeal by contacting <Link href="mailto:legal@erudyte.com" className="underline">legal@erudyte.com</Link>.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-2">
                    <AccordionTrigger>Can I share my course access with family or friends?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        <p>No. Access is individual only:</p>
                        <ul className="space-y-1 ml-4"><li>• Each person must have their own account</li><li>• Sharing credentials violates our terms</li><li>• Multiple users on one account may result in suspension</li><li>• We offer family plans and group discounts</li></ul>
                        <p className="text-xs text-muted-foreground">You may discuss course content and share knowledge gained.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-3">
                    <AccordionTrigger>Are Erudyte certificates accepted by employers and universities?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        <p>Recognition varies by institution and employer:</p>
                        <div className="space-y-2"><div><strong>What we provide:</strong> Verified digital certificates and detailed skill reports</div><div><strong>Industry:</strong> Widely valued in technology/business fields</div><div><strong>Academic credit:</strong> Some universities accept for CE credit</div><div><strong>Professional credentials:</strong> Certain bodies recognize specialized programs</div></div>
                        <p className="text-xs text-muted-foreground">See partners at <Link href="/recognition" className="underline">erudyte.com/recognition</Link>.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-4">
                    <AccordionTrigger>What's your policy on course completion deadlines?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        <p>Depends on course type:</p>
                        <div className="space-y-2"><div><strong>Self‑paced:</strong> No deadlines; lifetime access</div><div><strong>Instructor‑led:</strong> Follow published schedule</div><div><strong>Cohort:</strong> Specific start/end dates with milestones</div><div><strong>Subscription:</strong> Access while subscription is active</div></div>
                        <p>Extensions available for documented emergencies.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-5">
                    <AccordionTrigger>How do you handle disputes between students and instructors?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        <p>Structured process:</p>
                        <div className="space-y-2"><div><strong>1) Direct communication</strong> via course messaging</div><div><strong>2) Mediation</strong> by academic team</div><div><strong>3) Formal review</strong> of work/grades/conduct</div><div><strong>4) Final decision</strong> by academic director with appeal rights</div></div>
                        <p className="text-xs text-muted-foreground">Most disputes resolve at steps 1–2.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-6">
                    <AccordionTrigger>Can I get a refund if I'm not satisfied with a course?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        <p>Yes, under specific conditions:</p>
                        <div className="space-y-2"><div><strong>14‑day policy:</strong> Full refund if &lt;20% accessed</div><div><strong>7‑day policy:</strong> Pro‑rated refund for new subscriptions</div><div><strong>Course issues:</strong> Full refund if description materially differs</div><div><strong>Special circumstances:</strong> Case‑by‑case for emergencies/hardship</div></div>
                        <p>Refunds process within 5–10 business days. Certificates may be revoked for refund eligibility.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Section>

              {/* Misc */}
              <Section id="miscellaneous" title="Additional Legal Provisions">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2"><CardTitle className="text-sm">🔗 Entire Agreement</CardTitle></CardHeader>
                      <CardContent className="space-y-2"><p className="text-xs text-muted-foreground">These Terms, together with our Privacy Policy and any specific course agreements, constitute the complete agreement and supersede prior communications.</p></CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2"><CardTitle className="text-sm">⚖️ Severability</CardTitle></CardHeader>
                      <CardContent className="space-y-2"><p className="text-xs text-muted-foreground">If any provision is unenforceable, the remainder continues in effect; invalid provisions are modified to the minimum extent necessary.</p></CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2"><CardTitle className="text-sm">🚫 Waiver</CardTitle></CardHeader>
                      <CardContent className="space-y-2"><p className="text-xs text-muted-foreground">Failure to enforce any right does not waive it. Rights and remedies are cumulative.</p></CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2"><CardTitle className="text-sm">📋 Assignment</CardTitle></CardHeader>
                      <CardContent className="space-y-2"><p className="text-xs text-muted-foreground">You may not assign these Terms. Erudyte may assign in connection with a merger, acquisition, or asset sale with notice to users.</p></CardContent>
                    </Card>
                  </div>
                </div>
              </Section>

              {/* Footer */}
              <div className="mt-12 p-6 bg-muted rounded-lg">
                <div className="flex items-start gap-4">
                  <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Thank you for being part of our learning community</h3>
                    <p className="text-sm text-muted-foreground mb-3">These Terms help create a safe, respectful, and productive environment. By following them, you contribute to a community where knowledge sharing thrives.</p>
                    <div className="flex flex-wrap gap-4 text-sm"><span><strong>Effective Date:</strong> Aug 20, 2025</span><span><strong>Version:</strong> {meta.version}</span><span><strong>Next Review:</strong> Feb 20, 2026</span></div>
                    <div className="flex gap-4 mt-3 text-sm">
                      <Link href="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                      <Link href="/legal/cookies" className="text-primary hover:underline">Cookie Policy</Link>
                      <Link href="/legal/accessibility" className="text-primary hover:underline">Accessibility Statement</Link>
                      <Link href="/legal/community-guidelines" className="text-primary hover:underline">Community Guidelines</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
