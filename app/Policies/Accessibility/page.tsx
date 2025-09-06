import Link from "next/link"
import PageShell from "@/components/policy/PageShell"
import Section from "@/components/policy/Section"
import { Accessibility as A11y } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Navigation from "@/components/Navigation"

export default function Page() {
  return (
    <>
      <Navigation />
      <div className="pb-40">
        <PageShell
      icon={<A11y className="h-6 w-6" />}
      title="Accessibility"
      subtitle="Our commitment to inclusive design and compliance with WCAG 2.2 AA across Erudyte experiences."
      lastUpdated="Aug 27, 2025"
      version="1.4"
    >
      <Alert>
        <AlertTitle>Statement of Commitment</AlertTitle>
        <AlertDescription>
          We strive to make Erudyte usable for everyone. We design, build, and test against WCAG 2.2 AA and continuously improve accessibility with user feedback.
        </AlertDescription>
      </Alert>

      <Section id="standards" title="Standards & conformance">
        <ul>
          <li>WCAG 2.2 Level AA as our baseline target.</li>
          <li>Section 508 / EN 301 549 considerations for public institutions.</li>
          <li>ARIA best practices and semantic HTML throughout.</li>
        </ul>
      </Section>

      <Section id="features" title="Key accessibility features">
        <ul>
          <li>Keyboard navigability with visible focus states and skip links.</li>
          <li>Color-contrast compliant palettes and theme toggle.</li>
          <li>Alt text for images, captions/transcripts for videos and webinars.</li>
          <li>Resizable text and responsive layouts without loss of content.</li>
        </ul>
      </Section>

      <Section id="testing" title="Testing & audits">
        <p>We conduct automated checks (axe, Lighthouse) and manual audits with assistive technologies (NVDA, VoiceOver). Identified issues are triaged with SLAs depending on severity.</p>
      </Section>

      <Section id="feedback" title="Feedback & support">
        <p>If you encounter barriers, contact <Link href="mailto:accessibility@erudyte.com" className="text-primary">accessibility@erudyte.com</Link>. Provide a URL, description, and screenshots if possible.</p>
      </Section>

      <Section id="roadmap" title="Roadmap & exceptions" badge="Ongoing">
        <p>Some legacy content may not fully meet standards. We are remediating items and offering accessible alternatives on request.</p>
      </Section>

      <Accordion type="single" collapsible className="mt-6">
        <AccordionItem value="faq-1">
          <AccordionTrigger>Can I request accessible formats for PDFs or slide decks?</AccordionTrigger>
          <AccordionContent>Yes. Email us with the resource link and we will provide an alternative format.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-2">
          <AccordionTrigger>Do videos include captions and transcripts?</AccordionTrigger>
          <AccordionContent>New videos are captioned and transcribed; we are retrofitting older content.</AccordionContent>
        </AccordionItem>
      </Accordion>
        </PageShell>
      </div>
    </>
  )
}
