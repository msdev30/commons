import PageShell from "@/components/policy/PageShell"
import Section from "@/components/policy/Section"
import Navigation from "@/components/Navigation"
import { FileText } from "lucide-react"

export default function Page() {
  return (
    <PageShell
      icon={<FileText className="h-6 w-6" />}
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
        <p>We grant you a limited, non-exclusive, non-transferable license to access the services. You agree not to reverse engineer, scrape at scale, or misuse the platform.</p>
      </Section>

      <Section id="content" title="User content & IP">
        <ul>
          <li>You retain ownership of content you upload. You grant us a license to host, display, and process it to provide services.</li>
          <li>Do not upload content that infringes others’ rights.</li>
        </ul>
      </Section>

      <Section id="payments" title="Subscriptions & payments">
        <p>Paid plans auto-renew unless canceled. Taxes may apply. Refunds are handled per plan terms and applicable law.</p>
      </Section>

      <Section id="termination" title="Termination">
        <p>We may suspend or terminate accounts for violations. You may delete your account at any time. Some terms survive termination (e.g., IP, disclaimers, limitations of liability).</p>
      </Section>

      <Section id="disclaimers" title="Disclaimers & liability">
        <p>Services are provided “as-is” without warranties. To the extent permitted by law, our liability is limited to fees paid in the preceding 12 months.</p>
      </Section>

      <Section id="governing-law" title="Governing law & disputes">
        <p>These terms are governed by the laws of your contracting entity’s jurisdiction. Disputes will be resolved via arbitration or courts as specified in your order form, where applicable.</p>
      </Section>

      <Section id="changes" title="Changes to terms">
        <p>We may update terms for legal, security, or feature reasons. Material changes will be notified in advance; continued use constitutes acceptance.</p>
      </Section>
    </PageShell>
  )
}
