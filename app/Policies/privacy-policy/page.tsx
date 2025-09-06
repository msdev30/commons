"use client"
import React, { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import PageShell from "@/components/policy/PageShell"
import Section from "@/components/policy/Section"
import Navigation from "@/components/Navigation"
import {
  Shield,
  Database,
  Eye,
  Users,
  Globe,
  Lock,
  AlertTriangle,
  Download,
  Settings,
  Mail,
  FileText,
  CheckCircle,
  Clock,
  Share2,
  Printer,
  ListTree,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// --- Small utilities ---
const sections = [
  { id: "overview", label: "Overview" },
  { id: "data-we-collect", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Data" },
  { id: "sharing", label: "Sharing" },
  { id: "student-data", label: "Student Data" },
  { id: "rights", label: "Your Rights" },
  { id: "security", label: "Security" },
  { id: "retention", label: "Retention & Deletion" },
  { id: "international", label: "International Transfers" },
  { id: "contact", label: "Contact" },
  { id: "faq", label: "FAQ" },
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

function FloatingActions() {
  const onPrint = () => {
    if (typeof window !== "undefined") window.print()
  }
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col gap-2">
      <Button variant="outline" size="sm" onClick={onPrint} className="shadow-md">
        <Printer className="h-4 w-4 mr-2" /> Print
      </Button>
      <Button variant="outline" size="sm" asChild className="shadow-md">
        <Link href="#" aria-label="Share link">
          <Share2 className="h-4 w-4 mr-2" /> Share
        </Link>
      </Button>
    </div>
  )
}

function StickyTOC() {
  const ids = useMemo(() => sections.map((s) => s.id), [])
  const active = useActiveSection(ids)
  return (
    <aside className="sticky top-24 hidden lg:block h-[calc(100vh-6rem)]">
      <div className="rounded-2xl border bg-card p-4 shadow-sm w-64">
        <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
          <ListTree className="h-4 w-4" /> On this page
        </div>
        <Separator className="mb-2" />
        <nav className="space-y-1">
          {sections.map((s) => (
            <Link
              key={s.id}
              href={`#${s.id}`}
              className={`block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted ${
                active === s.id ? "bg-muted font-medium text-foreground" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default function Page() {
  return (
    <>
      <Navigation />
      <div className="pb-40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pt-4 lg:grid-cols-[1fr_minmax(0,740px)_1fr] lg:px-8">
          {/* left gutter */}
          <div className="hidden lg:block" />

          <PageShell
            icon={<Shield className="h-6 w-6" />}
            title="Privacy Policy"
            subtitle="How we collect, use, protect, and manage your personal information across Erudyte's educational platform and services."
            lastUpdated="Aug 27, 2025"
            version="1.9"
          >
            {/* Floating actions */}
            <FloatingActions />

            {/* Hero Statement */}
            <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
              <Shield className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-900 dark:text-green-100">Your Privacy Is Our Priority</AlertTitle>
              <AlertDescription className="text-green-800 dark:text-green-200">
                At Erudyte, we believe privacy is fundamental to trust and learning. We collect only the minimum data needed to deliver exceptional educational experiences, never sell your personal information, and give you control over your data. This policy explains our practices in clear, understandable terms.
              </AlertDescription>
            </Alert>

            {/* Quick Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Data Collection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-blue-600">Minimal Only</div>
                  <p className="text-xs text-muted-foreground mt-1">Essential for services</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Data Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-green-600">Never</div>
                  <p className="text-xs text-muted-foreground mt-1">We don't sell your data</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">User Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-purple-600">Full Access</div>
                  <p className="text-xs text-muted-foreground mt-1">Your data, your choice</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">GDPR + CCPA</div>
                  <p className="text-xs text-muted-foreground mt-1">Global standards</p>
                </CardContent>
              </Card>
            </div>

            {/* Overview Section */}
            <Section id="overview" title="Privacy Policy Overview">
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  This privacy policy describes how Erudyte collects, uses, shares, and protects your personal information when you use our educational platform, mobile applications, and related services. We are committed to transparency and giving you control over your personal data.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        What We Collect
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-xs text-muted-foreground">Only essential information to provide educational services and improve your learning experience.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        How We Use It
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-xs text-muted-foreground">To deliver personalized learning, provide support, improve our platform, and comply with legal requirements.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Who We Share With
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-xs text-muted-foreground">Trusted service providers under strict agreements, and only when required by law or with your consent.</p>
                    </CardContent>
                  </Card>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Key Principle</AlertTitle>
                  <AlertDescription>
                    We collect the minimum data needed to deliver secure, personalized learning and professional development. We never sell personal data and always prioritize your privacy rights.
                  </AlertDescription>
                </Alert>
              </div>
            </Section>

            {/* Data Collection */}
            <Section id="data-we-collect" title="Information We Collect">
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  We collect information in several categories to provide and improve our educational services. Here's exactly what we gather and why:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Account & Profile Data */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Users className="h-4 w-4" />
                        Account & Profile Data
                      </CardTitle>
                      <CardDescription>Information you provide when creating and managing your account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h5 className="font-medium text-sm mb-2">Required Information:</h5>
                        <ul className="space-y-1 text-sm ml-4">
                          <li>• <strong>Name and email address</strong> — for account creation and communication</li>
                          <li>• <strong>Password (encrypted)</strong> — we never see your actual password</li>
                          <li>• <strong>Account role</strong> — student, educator, or enterprise user</li>
                          <li>• <strong>Basic preferences</strong> — language, timezone, notification settings</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-2">Optional Information:</h5>
                        <ul className="space-y-1 text-sm ml-4">
                          <li>• <strong>School or organization</strong> — for institutional features</li>
                          <li>• <strong>Profile details</strong> — bio, photo, professional background</li>
                          <li>• <strong>Learning goals</strong> — to personalize recommendations</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Usage & Analytics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Eye className="h-4 w-4" />
                        Usage & Analytics Data
                      </CardTitle>
                      <CardDescription>How you interact with our platform and services</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h5 className="font-medium text-sm mb-2">Platform Usage:</h5>
                        <ul className="space-y-1 text-sm ml-4">
                          <li>• <strong>Pages and content viewed</strong> — to track learning progress</li>
                          <li>• <strong>Search queries</strong> — to improve content discovery</li>
                          <li>• <strong>Time spent on activities</strong> — for analytics and recommendations</li>
                          <li>• <strong>Feature interactions</strong> — to understand user needs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-2">Technical Information:</h5>
                        <ul className="space-y-1 text-sm ml-4">
                          <li>• <strong>Device and browser info</strong> — for compatibility and security</li>
                          <li>• <strong>IP address and location</strong> — for security and localization</li>
                          <li>• <strong>Crash logs and error reports</strong> — to fix technical issues</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Educational Content */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <FileText className="h-4 w-4" />
                        Educational Content Data
                      </CardTitle>
                      <CardDescription>Your learning activities and contributions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h5 className="font-medium text-sm mb-2">Learning Data:</h5>
                        <ul className="space-y-1 text-sm ml-4">
                          <li>• <strong>Course progress</strong> — completion status and milestones</li>
                          <li>• <strong>Assessment responses</strong> — quiz answers and assignment submissions</li>
                          <li>• <strong>Certificates earned</strong> — credentials and achievements</li>
                          <li>• <strong>Learning analytics</strong> — performance patterns and insights</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-2">Community Content:</h5>
                        <ul className="space-y-1 text-sm ml-4">
                          <li>• <strong>Discussion posts</strong> — forum contributions and comments</li>
                          <li>• <strong>Peer interactions</strong> — study group participation and messaging</li>
                          <li>• <strong>Uploaded files</strong> — project submissions and portfolio items</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Lock className="h-4 w-4" />
                        Payment & Billing Data
                      </CardTitle>
                      <CardDescription>Financial information for subscriptions and purchases</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h5 className="font-medium text-sm mb-2">Payment Processing:</h5>
                        <ul className="space-y-1 text-sm ml-4">
                          <li>• <strong>Payment details</strong> — processed by PCI-compliant providers (Stripe, PayPal)</li>
                          <li>• <strong>Billing address</strong> — for tax calculation and fraud prevention</li>
                          <li>• <strong>Transaction history</strong> — for account management and refunds</li>
                        </ul>
                      </div>
                      <div className="text-xs text-muted-foreground p-2 bg-blue-50 dark:bg-blue-950 rounded">
                        <strong>Security Note:</strong> We never store full credit card numbers. Payment processing is handled by certified third-party providers with the highest security standards.
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Alert>
                  <Lock className="h-4 w-4" />
                  <AlertTitle>Security Incident Response</AlertTitle>
                  <AlertDescription>
                    If a security incident affects your data, we will notify you within 72 hours with clear information about what happened, what data was involved, and our response plan. Report vulnerabilities to <Link href="mailto:security@erudyte.com" className="text-primary">security@erudyte.com</Link>.
                  </AlertDescription>
                </Alert>
              </div>
            </Section>

            {/* How We Use Data */}
            <Section id="how-we-use" title="How We Use Your Information">
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  We use your information solely to provide, improve, and protect our educational services. Here are the specific purposes:
                </p>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">🎓 Educational Service Delivery</CardTitle>
                      <CardDescription>Core platform functionality and learning experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong>Provide and improve services</strong> — deliver courses, track progress, issue certificates</li>
                        <li>• <strong>Personalized recommendations</strong> — suggest relevant courses and learning paths</li>
                        <li>• <strong>Customer support</strong> — respond to questions and troubleshoot issues</li>
                        <li>• <strong>Platform optimization</strong> — improve performance and user experience</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">⚖️ Legal Compliance & Safety</CardTitle>
                      <CardDescription>Meeting regulatory requirements and protecting users</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong>Comply with legal obligations</strong> — COPPA, FERPA, GDPR, and other applicable laws</li>
                        <li>• <strong>Detect abuse and fraud</strong> — prevent unauthorized access and platform misuse</li>
                        <li>• <strong>Safety and security</strong> — protect users from harassment and harmful content</li>
                        <li>• <strong>Academic integrity</strong> — maintain standards and prevent cheating</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">📊 Analytics & Improvement</CardTitle>
                      <CardDescription>Understanding usage patterns to enhance our platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong>Generate de-identified analytics</strong> — understand learning patterns and improve outcomes</li>
                        <li>• <strong>Product development</strong> — identify needed features and improvements</li>
                        <li>• <strong>Quality assurance</strong> — monitor platform performance and fix issues</li>
                        <li>• <strong>Research insights</strong> — anonymized data to advance educational best practices</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Alert>
                  <Lock className="h-4 w-4" />
                  <AlertTitle>Purpose Limitation</AlertTitle>
                  <AlertDescription>
                    We only use your information for the specific purposes outlined above. If we want to use your data for new purposes, we'll ask for your explicit consent and update this privacy policy.
                  </AlertDescription>
                </Alert>
              </div>
            </Section>

            {/* Data Sharing */}
            <Section id="sharing" title="When and How We Share Information">
              <div className="space-y-6">
                <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertTitle className="text-red-900 dark:text-red-100">We Never Sell Your Personal Data</AlertTitle>
                  <AlertDescription className="text-red-800 dark:text-red-200">
                    Erudyte has never sold personal information to third parties and never will. Your educational data is not a commodity — it's essential to your learning journey and privacy.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h4 className="font-semibold">Limited Sharing for Essential Services</h4>
                  <p className="text-sm text-muted-foreground">We only share information when necessary to provide our services or when legally required:</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Badge variant="secondary">Trusted Partners</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-xs text-muted-foreground mb-2">Vetted sub-processors under strict data processing agreements:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• <strong>Cloud hosting</strong> — AWS, Google Cloud for secure data storage</li>
                          <li>• <strong>Analytics</strong> — Google Analytics, Mixpanel for platform insights</li>
                          <li>• <strong>Support tools</strong> — Zendesk, Intercom for customer service</li>
                          <li>• <strong>Email services</strong> — SendGrid, Mailchimp for notifications</li>
                          <li>• <strong>Payment processing</strong> — Stripe, PayPal for secure transactions</li>
                        </ul>
                        <p className="text-xs text-muted-foreground mt-2">All partners are contractually bound to protect your data and use it only for specified purposes.</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Badge variant="outline">Legal Requirements</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-xs text-muted-foreground mb-2">Limited circumstances where law requires disclosure:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• <strong>Legal compliance</strong> — court orders, subpoenas, regulatory requests</li>
                          <li>• <strong>Safety protection</strong> — prevent harm to individuals or public safety</li>
                          <li>• <strong>Educational reporting</strong> — compliance with FERPA and institutional requirements</li>
                          <li>• <strong>Business transfers</strong> — mergers or acquisitions (with user notification)</li>
                        </ul>
                        <p className="text-xs text-muted-foreground mt-2">We will notify you when legally possible if we're required to disclose your information.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </Section>

            {/* Student Data Protections */}
            <Section id="student-data" title="Student Data Protections">
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  We take special care to protect student information and comply with educational privacy laws like FERPA, COPPA, and state student privacy legislation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Security Controls
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>Role-based access</strong> — strict controls on who can view student data</li>
                        <li>• <strong>Encryption</strong> — data protected in transit and at rest</li>
                        <li>• <strong>Audit trails</strong> — comprehensive logging of data access</li>
                        <li>• <strong>Regular security reviews</strong> — ongoing monitoring and testing</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Data Minimization
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>Minimal collection</strong> — only essential educational data</li>
                        <li>• <strong>Retention limits</strong> — aligned to district agreements and legal requirements</li>
                        <li>• <strong>Automatic deletion</strong> — inactive accounts purged according to policy</li>
                        <li>• <strong>Data classification</strong> — different handling based on sensitivity</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Parental Rights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>Access requests</strong> — parents can view their child's data through schools</li>
                        <li>• <strong>Correction rights</strong> — ability to update inaccurate information</li>
                        <li>• <strong>Deletion requests</strong> — remove data when no longer needed</li>
                        <li>• <strong>Consent requirements</strong> — parental approval for children under 13</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertTitle>Educational Privacy Compliance</AlertTitle>
                  <AlertDescription>
                    We honor parental and guardian rights through educational institutions. Contact your school or district to exercise rights regarding student data, or email us at <Link href="mailto:privacy@erudyte.com" className="text-primary">privacy@erudyte.com</Link> for assistance.
                  </AlertDescription>
                </Alert>
              </div>
            </Section>

            {/* User Rights */}
            <Section id="rights" title="Your Privacy Rights and Controls">
              <div className="space-y-6">
                <p className="text-muted-foreground">You have comprehensive rights over your personal information. Here's how to exercise them:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Download className="h-4 w-4" />
                        Access and Download Your Data
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">Get a complete copy of your information</p>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Access and download your profile and account data</li>
                        <li>• Export course progress and learning analytics</li>
                        <li>• Get copies of your assignments and forum posts</li>
                        <li>• Request machine-readable data formats</li>
                      </ul>
                      <Button size="sm" variant="outline" className="mt-3">Request Data Export</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Settings className="h-4 w-4" />
                        Correction and Updates
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">Keep your information accurate and current</p>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Update your profile and contact information</li>
                        <li>• Correct any inaccurate learning data</li>
                        <li>• Modify privacy and communication preferences</li>
                        <li>• Change consent settings for optional features</li>
                      </ul>
                      <Button size="sm" variant="outline" className="mt-3">Update Preferences</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <AlertTriangle className="h-4 w-4" />
                        Deletion and Portability
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">Control what happens to your data</p>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Delete your account and associated data</li>
                        <li>• Remove specific courses or learning activities</li>
                        <li>• Transfer data to another educational platform</li>
                        <li>• Request anonymization of historical records</li>
                      </ul>
                      <div className="text-xs text-muted-foreground mt-2 p-2 bg-yellow-50 dark:bg-yellow-950 rounded">
                        <strong>Note:</strong> Some data may be retained for legal compliance but will be anonymized.
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Eye className="h-4 w-4" />
                        Opt-Out Controls
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">Choose what data is collected and how it's used</p>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Opt out of non-essential cookies and tracking</li>
                        <li>• Unsubscribe from marketing communications</li>
                        <li>• Disable analytics for personalization (EU/UK: GDPR rights)</li>
                        <li>• Control sharing for research purposes (CA: CCPA/CPRA rights including opt-out of sale/share)</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Quick Response Guarantee</AlertTitle>
                  <AlertDescription>We respond to all privacy requests within 72 hours and complete most actions within 30 days. For urgent requests, contact <Link href="mailto:privacy@erudyte.com" className="text-primary">privacy@erudyte.com</Link> directly.</AlertDescription>
                </Alert>
              </div>
            </Section>

            {/* Security */}
            <Section id="security" title="Security and Data Protection">
              <div className="space-y-6">
                <p className="text-muted-foreground">We follow industry-leading security standards to protect your information from unauthorized access, disclosure, or misuse.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">🔐 Encryption & Access</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>TLS 1.2+</strong> — encrypted data transmission</li>
                        <li>• <strong>AES-256</strong> — encryption at rest for stored data</li>
                        <li>• <strong>Least-privilege access</strong> — minimal data access for staff</li>
                        <li>• <strong>Multi-factor authentication</strong> — available for all users</li>
                        <li>• <strong>Regular key rotation</strong> — updated encryption keys</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">🛡️ Infrastructure Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>SOC 2 compliance</strong> — certified data centers</li>
                        <li>• <strong>Continuous monitoring</strong> — 24/7 security oversight</li>
                        <li>• <strong>Automated backups</strong> — secure data recovery</li>
                        <li>• <strong>Network security</strong> — firewalls and intrusion detection</li>
                        <li>• <strong>Regular audits</strong> — third-party security assessments</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">👥 Human Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>Background checks</strong> — for all staff with data access</li>
                        <li>• <strong>Security training</strong> — regular privacy and security education</li>
                        <li>• <strong>Incident response</strong> — rapid response to security events</li>
                        <li>• <strong>Data handling policies</strong> — strict procedures for data access</li>
                        <li>• <strong>Regular compliance reviews</strong> — ongoing policy enforcement</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Section>

            {/* Retention and Deletion */}
            <Section id="retention" title="Data Retention and Deletion">
              <div className="space-y-6">
                <p className="text-muted-foreground">We retain your information only as long as necessary to provide services and meet legal obligations. You can request deletion at any time, subject to institutional contracts and legal requirements.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">📚 Active Learning Data</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>Account active:</strong> Retained while you use our services</li>
                        <li>• <strong>Course progress:</strong> Kept for certificate verification</li>
                        <li>• <strong>Forum posts:</strong> Maintained for community continuity</li>
                        <li>• <strong>Learning analytics:</strong> Used for ongoing personalization</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">🗑️ Account Deletion</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>Immediate:</strong> Personal profile and preferences</li>
                        <li>• <strong>30 days:</strong> Course interactions and most learning data</li>
                        <li>• <strong>Anonymized:</strong> Forum posts become anonymous</li>
                        <li>• <strong>Legal retention:</strong> Some records kept for compliance</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">⚖️ Legal Requirements</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>Financial records:</strong> 7 years for tax compliance</li>
                        <li>• <strong>Educational transcripts:</strong> Permanent for verification</li>
                        <li>• <strong>Safety incidents:</strong> As required by law</li>
                        <li>• <strong>Institutional agreements:</strong> Per contract terms</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertTitle>Retention Policy</AlertTitle>
                  <AlertDescription>Data is retained only as long as necessary to provide services and meet legal obligations. We regularly review and purge unnecessary data to minimize our data footprint.</AlertDescription>
                </Alert>
              </div>
            </Section>

            {/* International Transfers */}
            <Section id="international" title="International Data Transfers">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">As a global educational platform, we may transfer your information across borders. We ensure appropriate safeguards are in place:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">🌍 Transfer Locations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>Primary:</strong> United States (AWS, Google Cloud)</li>
                        <li>• <strong>European users:</strong> EU data residency when possible</li>
                        <li>• <strong>Service providers:</strong> Various global locations</li>
                        <li>• <strong>Compliance:</strong> Adequate protection standards</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">🛡️ Legal Safeguards</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>Standard Contractual Clauses:</strong> EU-approved data transfer mechanisms</li>
                        <li>• <strong>Adequacy decisions:</strong> EU-recognized safe countries</li>
                        <li>• <strong>Data Processing Agreements:</strong> Binding contracts with all vendors</li>
                        <li>• <strong>Enhanced security:</strong> Additional protections for sensitive data</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Section>

            {/* Contact */}
            <Section id="contact" title="Contact and Questions">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">📧 Privacy Team Contact</CardTitle>
                      <CardDescription>Get answers to your privacy questions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <strong className="text-sm">General Privacy:</strong>
                          <Link href="mailto:privacy@erudyte.com" className="text-primary hover:underline text-sm">privacy@erudyte.com</Link>
                        </div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm">Data Protection Officer:</strong>
                          <Link href="mailto:dpo@erudyte.com" className="text-primary hover:underline text-sm">dpo@erudyte.com</Link>
                        </div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm">Response Time:</strong>
                          <span className="text-sm">Within 72 hours</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">🏛️ Regulatory Contacts</CardTitle>
                      <CardDescription>Additional oversight and complaints</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2 text-sm">
                        <p><strong>EU/UK Users:</strong> Contact your local data protection authority if you have unresolved concerns about our privacy practices.</p>
                        <p><strong>California Residents:</strong> You have additional rights under CCPA/CPRA. Contact us for assistance with these rights.</p>
                        <p><strong>Students/Parents:</strong> Work with your school or district for educational privacy concerns, or contact us directly.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-xs text-muted-foreground space-y-1 mt-4">
                  <p><strong>Mailing Address:</strong></p>
                  <p>
                    Erudyte Privacy Team
                    <br />123 Education Boulevard
                    <br />San Francisco, CA 94105
                    <br />United States
                  </p>
                </div>
              </div>
            </Section>

            {/* FAQ */}
            <Section id="faq" title="Privacy Frequently Asked Questions">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger>What information do you collect about children under 13?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm">
                      <p>We comply with COPPA and collect minimal information from children under 13:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Only collect with verified parental or school consent</li>
                        <li>• Limited to educational purposes (name, grade level, learning progress)</li>
                        <li>• No behavioral advertising or non-educational data collection</li>
                        <li>• Parents can review, update, or delete their child's information through schools</li>
                      </ul>
                      <p className="text-xs text-muted-foreground">For institutional accounts, schools provide consent on behalf of parents for educational use.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-2">
                  <AccordionTrigger>Do you use my data to train AI models?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm">
                      <p>We use aggregated, anonymized data to improve educational features:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Course recommendation algorithms based on learning patterns</li>
                        <li>• Adaptive assessment systems for personalized difficulty</li>
                        <li>• Content optimization based on engagement metrics</li>
                        <li>• Platform performance improvements</li>
                      </ul>
                      <p><strong>Important:</strong> We never use your personal assignments, private messages, or identifiable information for AI training. All data is aggregated and anonymized before use.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-3">
                  <AccordionTrigger>How do you handle data if I'm in the EU?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm">
                      <p>EU users have enhanced protections under GDPR:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• <strong>Legal basis:</strong> Contract performance, legitimate interests, or consent</li>
                        <li>• <strong>Data minimization:</strong> Collect only necessary information</li>
                        <li>• <strong>Right to portability:</strong> Export your data in machine-readable format</li>
                        <li>• <strong>Right to erasure:</strong> Delete your data (subject to legal obligations)</li>
                        <li>• <strong>Data protection authority:</strong> Right to lodge complaints</li>
                      </ul>
                      <p className="text-xs text-muted-foreground">We use Standard Contractual Clauses for international transfers and provide EU data residency where possible.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-4">
                  <AccordionTrigger>Can my employer see my personal learning activity?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm">
                      <p>This depends on how you access Erudyte:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• <strong>Personal account:</strong> Your employer cannot see your activity</li>
                        <li>• <strong>Company-paid courses:</strong> Employer may see completion status for courses they sponsor</li>
                        <li>• <strong>Enterprise platform:</strong> Organization can view activity within their platform only</li>
                        <li>• <strong>Separate accounts:</strong> Personal and work learning remain completely separate</li>
                      </ul>
                      <p className="text-xs text-muted-foreground">We clearly indicate when learning activity is visible to your organization and provide separate spaces for personal development.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-5">
                  <AccordionTrigger>What happens to my data if Erudyte is sold?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm">
                      <p>In the event of a business transfer:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• <strong>30-day advance notice:</strong> We'll notify you before any transfer</li>
                        <li>• <strong>Same protections:</strong> New owner must honor this privacy policy</li>
                        <li>• <strong>Opt-out option:</strong> You can delete your account before transfer</li>
                        <li>• <strong>Continued rights:</strong> Your privacy rights remain in effect</li>
                      </ul>
                      <p>If we cease operations, we'll provide 90 days notice to download your data and securely delete all personal information.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-6">
                  <AccordionTrigger>How do I permanently delete all my data?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm">
                      <p>To permanently delete your data:</p>
                      <div className="space-y-2">
                        <div><strong>Step 1:</strong> Download any data you want to keep (certificates, projects)</div>
                        <div><strong>Step 2:</strong> Cancel any active subscriptions to prevent future billing</div>
                        <div><strong>Step 3:</strong> Request account deletion through settings or email <Link href="mailto:privacy@erudyte.com" className="text-primary">privacy@erudyte.com</Link></div>
                        <div><strong>Step 4:</strong> Confirm deletion via email link</div>
                      </div>
                      <p className="text-xs text-muted-foreground">Most data is deleted within 30 days. Some information may be retained in anonymized form for legal compliance, but cannot be linked back to you.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Section>

            {/* Footer */}
            <div className="mt-12 p-6 bg-muted rounded-lg">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Privacy by Design</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Privacy isn't an afterthought at Erudyte — it's built into every feature we develop. We believe that protecting your personal information is essential to creating a trustworthy learning environment where you can focus on growth and education without privacy concerns.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span><strong>Effective Date:</strong> August 27, 2025</span>
                    <span><strong>Version:</strong> 1.9</span>
                    <span><strong>Next Review:</strong> February 27, 2026</span>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <Link href="/legal/terms" className="text-primary hover:underline text-sm">Terms of Service</Link>
                    <Link href="/legal/cookies" className="text-primary hover:underline text-sm">Cookie Policy</Link>
                    <Link href="/legal/accessibility" className="text-primary hover:underline text-sm">Accessibility Statement</Link>
                  </div>
                </div>
              </div>
            </div>
          </PageShell>

          {/* Right Rail: Sticky TOC */}
          <StickyTOC />
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          .sticky, .fixed { display: none !important; }
          nav, header, footer { display: none !important; }
          body { background: white; }
        }
      `}</style>
    </>
  )
}
