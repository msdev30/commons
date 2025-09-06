import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Users } from "lucide-react"
import PageShell from "@/components/policy/PageShell"
import Section from "@/components/policy/Section"
import Navigation from "@/components/Navigation"

export default function Page() {
  return (
    <>
      <Navigation />
      <div className="pb-40">
        <PageShell
      icon={<Users className="h-6 w-6" />}
      title="Community Rules"
      subtitle="A safe, supportive professional space for educators. These rules keep conversations constructive and aligned with our mission."
      lastUpdated="Aug 27, 2025"
      version="2.1"
    >
      <Alert>
        <AlertTitle>TL;DR</AlertTitle>
        <AlertDescription>
          Be respectful. Protect privacy. Share evidence-based resources. No harassment, spam, or solicitation. Report concerns.
        </AlertDescription>
      </Alert>

      <Section id="principles" title="Guiding principles">
        <ul>
          <li><strong>Respect &amp; inclusion.</strong> Assume good intent. No hate speech or discrimination.</li>
          <li><strong>Student safety &amp; privacy.</strong> Never post identifiable student data or images without consent.</li>
          <li><strong>Evidence over hype.</strong> Cite sources when sharing strategies, tools, or research.</li>
          <li><strong>Professional conduct.</strong> No harassment, doxxing, or off-platform targeting.</li>
        </ul>
      </Section>

      <Section id="allowed" title="What’s encouraged">
        <ul>
          <li>Sharing classroom-tested strategies, rubrics, and templates.</li>
          <li>Asking questions and giving constructive feedback.</li>
          <li>Posting PD opportunities, grants, and research summaries.</li>
          <li>Celebrating wins and learning from challenges.</li>
        </ul>
      </Section>

      <Section id="not-allowed" title="Not allowed">
        <ul>
          <li>Personal attacks, harassment, or discriminatory content.</li>
          <li>Marketing or lead-gen outside approved partner spaces.</li>
          <li>Posting student PII, copyrighted materials without rights, or unsafe practices.</li>
          <li>Plagiarism, misinformation, or AI-generated content presented as personal work without disclosure.</li>
        </ul>
      </Section>

      <Section id="moderation" title="Moderation & enforcement">
        <p>We use a mix of automated signals and human review. Actions can include content removal, warnings, temporary suspensions, and account termination for repeated or severe violations.</p>
      </Section>

      <Section id="reporting" title="Reporting & appeals">
        <p>Flag content via the ••• menu or email <Link href="mailto:safety@erudyte.com" className="text-primary">safety@erudyte.com</Link>. You may appeal enforcement decisions within 14 days.</p>
      </Section>

      <Section id="updates" title="Updates to these rules" badge="Living doc">
        <p>We periodically revise these rules to reflect best practices. Material changes will be announced in-product and via email.</p>
      </Section>
        </PageShell>
      </div>
    </>
  )
}
