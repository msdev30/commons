"use client"
import React from "react"
import { FileText } from "lucide-react"

const Badge = ({ variant, className, children }: { variant: string; className?: string; children: React.ReactNode }) => (
  <span className={`px-2 py-1 text-xs rounded ${className}`}>{children}</span>
)

const PageShell = ({ icon, title, subtitle, lastUpdated, version, children }: {
  icon: React.ReactNode
  title: string
  subtitle: string
  lastUpdated: string
  version: string
  children: React.ReactNode
}) => (
  <div className="max-w-4xl mx-auto p-6">
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <p className="text-gray-600 mb-2">{subtitle}</p>
      <p className="text-sm text-gray-500">Last updated: {lastUpdated} • Version {version}</p>
    </div>
    {children}
  </div>
)

const Section = ({ id, title, badge, children }: {
  id: string
  title: string
  badge?: string
  children: React.ReactNode
}) => {
  React.useEffect(() => {
    const toc = document.getElementById("toc")
    if (!toc) return
    const exists = toc.querySelector(`[href="#${id}"]`)
    if (exists) return
    const a = document.createElement("a")
    a.href = `#${id}`
    a.className = "block hover:text-primary transition-colors"
    a.textContent = title
    toc.appendChild(a)
  }, [id, title])

  return (
    <div id={id} className="scroll-mt-28">
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

export default function UserAgreementPage() {
  return (
    <>
      <Navigation />
      <div className="pb-40">
        <PageShell
      icon={<FileText className="h-6 w-6"/>}
      title="User Agreement"
      subtitle="The terms that govern your use of Erudyte products and services."
      lastUpdated="Aug 27, 2025"
      version="3.0"
    >
      <Section id="acceptance" title="Acceptance of terms">
        <p>By creating an account or using our services, you agree to these terms and our Privacy Policy.</p>
      </Section>

      <Section id="eligibility" title="Eligibility & accounts">
        <ul>
          <li>You must be at least 18 (or have institutional authorization) to register.</li>
          <li>You are responsible for safeguarding your credentials and for all activity under your account.</li>
        </ul>
      </Section>

      <Section id="license" title="License & acceptable use">
        <p>We grant you a limited, non‑exclusive, non‑transferable license to access the services. You agree not to reverse engineer, scrape at scale, or misuse the platform.</p>
      </Section>

      <Section id="content" title="User content & IP">
        <ul>
          <li>You retain ownership of content you upload. You grant us a license to host, display, and process it to provide services.</li>
          <li>Do not upload content that infringes others' rights.</li>
        </ul>
      </Section>

      <Section id="payments" title="Subscriptions & payments">
        <p>Paid plans auto‑renew unless canceled. Taxes may apply. Refunds are handled per plan terms and applicable law.</p>
      </Section>

      <Section id="termination" title="Termination">
        <p>We may suspend or terminate accounts for violations. You may delete your account at any time. Some terms survive termination (e.g., IP, disclaimers, limitations of liability).</p>
      </Section>

      <Section id="disclaimers" title="Disclaimers & liability">
        <p>Services are provided "as‑is" without warranties. To the extent permitted by law, our liability is limited to fees paid in the preceding 12 months.</p>
      </Section>

      <Section id="governing-law" title="Governing law & disputes">
        <p>These terms are governed by the laws of your contracting entity's jurisdiction. Disputes will be resolved via arbitration or courts as specified in your order form, where applicable.</p>
      </Section>

      <Section id="changes" title="Changes to terms">
        <p>We may update terms for legal, security, or feature reasons. Material changes will be notified in advance; continued use constitutes acceptance.</p>
      </Section>
        </PageShell>
      </div>
    </>
  )
}