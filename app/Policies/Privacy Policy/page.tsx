import Link from "next/link"
import { Shield } from "lucide-react"
import PageShell from "@/components/policy/PageShell"
import Section from "@/components/policy/Section"

export default function Page() {
  return (
    <PageShell
      icon={<Shield className="h-6 w-6" />}
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your information across Erudyte products and services."
      lastUpdated="Aug 27, 2025"
      version="1.9"
    >
      <Section id="overview" title="Overview">
        <p>We collect the minimum data needed to deliver secure, personalized learning and professional development. We never sell personal data.</p>
      </Section>

      <Section id="data-we-collect" title="Data we collect">
        <ul>
          <li><strong>Account data</strong> — name, email, role, school/district, preferences.</li>
          <li><strong>Usage data</strong> — pages viewed, search queries, device/browser info, crash logs.</li>
          <li><strong>Content data</strong> — posts, comments, uploaded files, assessment responses.</li>
          <li><strong>Payment data</strong> — processed by PCI-compliant providers; we store limited metadata.</li>
        </ul>
      </Section>

      <Section id="how-we-use" title="How we use data">
        <ul>
          <li>Provide and improve services, recommendations, and support.</li>
          <li>Comply with legal obligations (e.g., COPPA, FERPA/PPRA where applicable).</li>
          <li>Detect abuse, fraud, and platform misuse.</li>
          <li>Generate de-identified analytics to improve outcomes.</li>
        </ul>
      </Section>

      <Section id="sharing" title="When we share data">
        <p>We share with vetted sub-processors under strict DPAs for hosting, analytics, and support. We may disclose information to comply with law or protect safety. We do not sell personal data.</p>
      </Section>

      <Section id="student-data" title="Student data protections">
        <ul>
          <li>Role-based access controls; encryption in transit and at rest.</li>
          <li>Data minimization and retention limits aligned to district agreements.</li>
          <li>Parental/guardian rights and requests honored via schools.</li>
        </ul>
      </Section>

      <Section id="rights" title="Your rights">
        <ul>
          <li>Access, correction, deletion, or portability of your data.</li>
          <li>Opt-out of non-essential cookies and marketing communications.</li>
          <li>EU/UK: GDPR rights; CA: CCPA/CPRA rights (including opt-out of sale/share).</li>
        </ul>
      </Section>

      <Section id="security" title="Security">
        <p>We follow industry standards (TLS 1.2+, encryption at rest, least-privilege, continuous monitoring). Report vulnerabilities to <Link href="mailto:security@erudyte.com" className="text-primary">security@erudyte.com</Link>.</p>
      </Section>

      <Section id="retention" title="Retention & deletion">
        <p>Data is retained only as long as necessary to provide services and meet legal obligations. You can request deletion at any time, subject to institutional contracts.</p>
      </Section>

      <Section id="contact" title="Contact">
        <p>Email <Link href="mailto:privacy@erudyte.com" className="text-primary">privacy@erudyte.com</Link>. For unresolved concerns, you may contact your local data protection authority.</p>
      </Section>
    </PageShell>
  )
}
