"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import PageShell from "@/components/policy/PageShell"
import Section from "@/components/policy/Section"
import { Users, Heart, Shield, AlertTriangle, CheckCircle, MessageSquare, Flag, BookOpen, Award, Eye } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/Navigation"

/* =========================
   Anchors / Scrollspy
========================= */
const SECTIONS = [
  { id: "principles", label: "Principles" },
  { id: "encouraged", label: "Encouraged" },
  { id: "not-allowed", label: "Prohibited" },
  { id: "moderation", label: "Moderation" },
  { id: "reporting", label: "Reporting" },
  { id: "updates", label: "Updates" },
  { id: "faq", label: "FAQ" },
]

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (vis?.target?.id) setActive(vis.target.id)
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75] }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids])
  return active
}

/* =========================
   On This Page (top shell)
========================= */
function OnThisPageTop() {
  const active = useScrollSpy(SECTIONS.map((s) => s.id))
  return (
    <div className="sticky top-20 z-20 mt-6 rounded-2xl border border-zinc-200/70 bg-white/70 dark:border-zinc-800/60 dark:bg-zinc-900/50 backdrop-blur-md">
      <div className="flex items-center gap-2 px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">On this page</span>
        <div className="mx-2 h-4 w-px bg-zinc-300/60 dark:bg-zinc-700/60" />
        <div className="flex-1 overflow-x-auto no-scrollbar">
          <div className="flex gap-2">
            {SECTIONS.map((s) => {
              const isActive = active === s.id
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={[
                    "whitespace-nowrap text-sm px-3 py-1.5 rounded-full transition",
                    "ring-1 ring-zinc-300/70 dark:ring-zinc-700/70",
                    "text-zinc-800 dark:text-zinc-200 no-underline",
                    isActive
                      ? "bg-emerald-500/10 ring-emerald-400/70 dark:ring-emerald-500/70 font-medium"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  ].join(" ")}
                >
                  {s.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================
   Right Scroll Rail (subtle)
========================= */
function ScrollRail() {
  const active = useScrollSpy(SECTIONS.map((s) => s.id))
  return (
    <div className="hidden xl:block fixed right-6 top-32 z-30">
      <nav aria-label="Section progress" className="flex flex-col gap-3 items-center">
        {SECTIONS.map((s) => {
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
  const heroBg =
    "bg-gradient-to-br from-emerald-50 via-rose-50 to-amber-50 dark:from-emerald-950/40 dark:via-rose-950/30 dark:to-amber-950/30"

  return (
    <>
      <Navigation />

      {/* Neutralize underlines/blue in floating shells */}
      <style jsx global>{`
        .policy-toc a,
        .policy-toc a:visited {
          text-decoration: none !important;
          color: inherit !important;
        }
        .policy-toc a {
          border-left: 2px solid transparent;
          padding-left: 10px;
          display: block;
          border-radius: 6px;
        }
        .policy-toc a[aria-current="true"] {
          border-left-color: rgb(16 185 129);
          background: rgba(16,185,129,0.08);
          font-weight: 600;
        }
        .no-underline a { text-decoration: none; color: inherit; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>

      <div className="pb-40 relative">
        <ScrollRail />

        <PageShell
          icon={<Users className="h-6 w-6" />}
          title="Community Guidelines"
          subtitle="A safe, supportive, professional space for learning and collaboration."
          lastUpdated="Aug 27, 2025"
          version="2.1"
        >
          {/* Hero */}
          <Alert className={`${heroBg} border-emerald-200 dark:border-emerald-800 rounded-2xl`}>
            <Heart className="h-4 w-4 text-emerald-600" />
            <AlertTitle className="text-zinc-900 dark:text-zinc-100">Our Community Vision</AlertTitle>
            <AlertDescription className="text-zinc-800/80 dark:text-zinc-200/90">
              Erudyte is more than a learning platform — it’s a community committed to growth, collaboration, and mutual support.
            </AlertDescription>
          </Alert>

          {/* On this page (top shell) */}
          <OnThisPageTop />

          {/* Quick Reference */}
          <div className="my-8">
            <Alert className="rounded-2xl border-emerald-200 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <AlertTitle>Quick Reference (TL;DR)</AlertTitle>
              <AlertDescription>
                Be respectful and inclusive. Protect student privacy. Share evidence-based resources. No harassment or spam.
                Report concerns promptly. Keep it constructive and professional.
              </AlertDescription>
            </Alert>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
            {[
              { k: "Our Approach", v: "Positive First", c: "text-emerald-600" },
              { k: "Response Time", v: "24 Hours", c: "text-rose-600" },
              { k: "Appeal Period", v: "14 Days", c: "text-violet-600" },
              { k: "Focus", v: "Education", c: "" },
            ].map((s) => (
              <Card key={s.k} className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{s.k}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-lg font-bold ${s.c}`}>{s.v}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {s.k === "Our Approach" && "Support over punishment"}
                    {s.k === "Response Time" && "For community reports"}
                    {s.k === "Appeal Period" && "To contest decisions"}
                    {s.k === "Focus" && "Learning-centered community"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Principles */}
          <Section id="principles" title="Community Principles" className="scroll-mt-28">
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Our community guidelines create a safe, inclusive, and productive learning environment for everyone. We foster genuine educational growth through respectful collaboration and knowledge sharing, where diverse perspectives come together in an atmosphere of mutual respect and intellectual curiosity.
              </p>
              <p className="text-muted-foreground">
                Effective learning communities require both individual accountability and collective responsibility. We emphasize constructive dialogue over debate, understanding over judgment, and growth over perfection. Our guidelines channel expression in ways that benefit the entire community rather than restricting it.
              </p>
              <p className="text-muted-foreground">
                Everyone brings valuable knowledge and experiences regardless of skill level or background. We create space for beginners to ask questions without fear while providing opportunities for advanced learners to share expertise meaningfully. Our commitment extends beyond preventing harm to actively cultivating positive interactions and mutual support.
              </p>
            </div>
          </Section>

          {/* Encouraged */}
          <Section id="encouraged" title="Encouraged Community Contributions" className="scroll-mt-28">
            <div className="space-y-6">
              <p className="text-muted-foreground">
                We celebrate high-quality educational content that forms the backbone of our community. This includes well-researched posts, thoughtful questions that spark meaningful discussion, and comprehensive resources that help others learn. We particularly value contributions that demonstrate original thinking, cite reliable sources, and present complex topics in accessible ways.
              </p>
              <p className="text-muted-foreground">
                Collaborative learning experiences are highly encouraged, such as study groups, peer review sessions, and mentorship relationships. We celebrate members who organize learning opportunities through formal presentations, informal discussions, or collaborative projects that strengthen community bonds while advancing educational goals.
              </p>
              <p className="text-muted-foreground">
                Constructive feedback and supportive interactions are essential to our ecosystem. We encourage detailed, actionable feedback that helps others improve, recognition of achievements, and celebration of milestones. Resource sharing, accessibility efforts, and knowledge preservation create lasting value for current and future community members.
              </p>
            </div>
          </Section>

          {/* Prohibited */}
          <Section id="not-allowed" title="Prohibited Content and Behavior" className="scroll-mt-28">
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Academic dishonesty is strictly prohibited, including plagiarism, cheating, sharing assessment answers, or helping others circumvent academic integrity policies. Harassment, discrimination, and hate speech have no place in our community, including targeted attacks, threats, doxxing, or content promoting discrimination based on identity or protected characteristics.
              </p>
              <p className="text-muted-foreground">
                Spam and commercial exploitation undermine our educational focus. This includes excessive self-promotion, affiliate marketing disguised as educational content, selling services through private messages, or repetitive posting. Misinformation and deliberately false content damage trust, including conspiracy theories, pseudoscience presented as fact, or intentionally misleading educational information.
              </p>
              <p className="text-muted-foreground">
                Disruptive behavior that interferes with learning is not tolerated, including trolling, derailing conversations, excessive arguing, or consistently off-topic posting. Content violating laws or causing harm is forbidden, such as sharing copyrighted materials without permission, instructions for dangerous activities, or content that puts individuals at risk.
              </p>
            </div>
          </Section>

          {/* Moderation */}
          <Section id="moderation" title="Community Moderation & Enforcement" className="scroll-mt-28">
            <div className="space-y-6">
              <p className="text-muted-foreground">
                We blend automated detection with expert human review to uphold standards fairly. Our approach recognizes that context matters significantly in determining violations. Automated systems identify potential issues quickly, while human moderators make final decisions on complex cases requiring nuanced judgment and community understanding.
              </p>
              <p className="text-muted-foreground">
                Our enforcement philosophy emphasizes education over punishment. For first-time or minor violations, we provide warnings with clear explanations and improvement guidance. Progressive enforcement escalates consequences for repeated violations, from informal warnings to temporary restrictions to permanent bans, though severe violations may result in immediate suspension.
              </p>
              <p className="text-muted-foreground">
                We maintain transparency while respecting privacy, offering structured appeal processes and regular guideline reviews based on community feedback. Our moderation team includes trained staff and experienced volunteers who understand our educational mission, with clear reporting channels and prompt, confidential handling of violations.
              </p>

              {/* ===== Progressive Enforcement Actions (FIXED TEXT) ===== */}
              <div>
                <h4 className="font-semibold mb-3">Progressive Enforcement Actions</h4>
                <div className="grid grid-cols-4 gap-3">
                  <Card className="rounded-2xl">
                    <CardContent className="p-2">
                      <Badge variant="outline" className="mb-1">Step 1</Badge>
                      <h5 className="font-medium text-sm">Educational Warning</h5>
                      <p className="text-xs text-muted-foreground">
                        First-time violations receive a friendly reminder with guidance.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="rounded-2xl">
                    <CardContent className="p-2">
                      <Badge variant="secondary" className="mb-1">Step 2</Badge>
                      <h5 className="font-medium text-sm">Content Removal &amp; Warning</h5>
                      <p className="text-xs text-muted-foreground">
                        Content removal and formal warning with monitoring.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="rounded-2xl">
                    <CardContent className="p-2">
                      <Badge variant="destructive" className="mb-1">Step 3</Badge>
                      <h5 className="font-medium text-sm">Temporary Suspension</h5>
                      <p className="text-xs text-muted-foreground">
                        1–30 day suspensions with reinstatement conditions.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="rounded-2xl">
                    <CardContent className="p-2">
                      <Badge variant="destructive" className="mb-1">Final</Badge>
                      <h5 className="font-medium text-sm">Account Termination</h5>
                      <p className="text-xs text-muted-foreground">
                        Permanent termination for severe violations.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </Section>

          {/* Reporting */}
          <Section id="reporting" title="Reporting Violations & Appeals" className="scroll-mt-28">
            <div className="space-y-6">
              <p className="text-muted-foreground">
                We provide multiple accessible ways to report violations and ensure every community member can seek help when needed. Reports can be submitted through in-platform reporting buttons on posts and comments, direct messages to moderators, or our dedicated violation reporting form. All reports are handled confidentially, and we never reveal the identity of reporters to protect those who come forward with concerns.
              </p>
              <p className="text-muted-foreground">
                Our appeal process ensures fair review of moderation decisions through multiple layers of oversight. Appeals must be submitted within 30 days of the initial decision and include specific reasons why the action should be reconsidered. A different moderator team reviews each appeal, considering new evidence, context that may have been missed, and whether the original decision aligned with our guidelines and community standards.
              </p>
              <p className="text-muted-foreground">
                We're committed to continuous improvement in our reporting and appeals systems based on community feedback and case outcomes. Regular training ensures our moderation team stays current with best practices, while quarterly reviews of appealed cases help us identify areas for improvement. We also maintain detailed documentation of decisions to ensure consistency and provide transparency in our enforcement approach while protecting individual privacy.
              </p>
            </div>
          </Section>

          {/* Updates */}
          <Section id="updates" title="Updates to Community Guidelines" badge="Living Document" className="scroll-mt-28">
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Our community guidelines are a living document that evolves as we learn from our community and adapt to new challenges. We regularly review and update these guidelines based on community feedback, emerging issues, and lessons learned from moderation experiences. Major changes are announced to the community with advance notice, while minor clarifications may be implemented more quickly to address immediate concerns or ambiguities.
              </p>
              <p className="text-muted-foreground">
                We believe in transparent communication about guideline changes and actively seek input from our community members before implementing significant updates. When updates occur, we provide clear explanations of what changed, why the change was necessary, and how it affects community members. All community members are notified of guideline updates through platform announcements, and we maintain a changelog documenting the evolution of our policies to ensure everyone can stay informed about current expectations and standards.
              </p>
            </div>
          </Section>

          {/* FAQ */}
          <Section id="faq" title="Community Guidelines FAQ" className="scroll-mt-28 [&>div>h2]:text-lg">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="faq-1">
                <AccordionTrigger className="text-sm py-3">What if I accidentally share student information?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">If you accidentally post student information, immediately delete the post and contact moderators at safety@erudyte.com. We understand these mistakes happen and will help you resolve the situation quickly while ensuring student privacy is protected.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger className="text-sm py-3">Can I share homework help or study materials?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">You can share general study strategies, resources, and explanations of concepts, but cannot share specific homework answers, solutions to assignments, or materials that would compromise academic integrity. When in doubt, focus on teaching the process rather than providing direct answers.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger className="text-sm py-3">What counts as spam or self-promotion?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">Excessive posting of personal content, repeated links to external sites, unsolicited advertising, or promoting services for profit are considered spam. Sharing relevant professional experiences or educational resources occasionally is welcome, but our platform should not be used primarily for commercial purposes.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger className="text-sm py-3">How do I report harassment or inappropriate behavior?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">Use the report button on any post or comment, send a direct message to moderators, or email safety@erudyte.com with details. Include screenshots if possible and describe the specific behavior that concerns you. All reports are confidential and reviewed promptly.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger className="text-sm py-3">What if I disagree with a moderation decision?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">You can appeal any moderation decision within 30 days by contacting appeals@erudyte.com with your username, the specific decision you're appealing, and why you believe it should be reconsidered. A different moderation team will review your case with fresh eyes.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-6">
                <AccordionTrigger className="text-sm py-3">Can I discuss controversial or sensitive topics?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">Educational discussions of complex topics are encouraged when approached respectfully and factually. Focus on learning outcomes, cite reliable sources, and maintain a constructive tone. Avoid inflammatory language or content that targets specific individuals or groups.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-7">
                <AccordionTrigger className="text-sm py-3">What happens to my content if my account is suspended?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">Your posts and comments remain visible during temporary suspensions but you cannot create new content. For permanent bans, we may remove your content depending on the violation severity. You can request content removal at any time by contacting data@erudyte.com.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-8">
                <AccordionTrigger className="text-sm py-3">How do I know if content violates copyright?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">Don't share full text from books, articles, or other copyrighted materials without permission. Brief quotes with proper attribution for educational discussion are generally acceptable. When sharing resources, link to original sources rather than copying content directly.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-9">
                <AccordionTrigger className="text-sm py-3">Can I create multiple accounts?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">Each person should maintain only one account to ensure authentic community interactions. Creating additional accounts to circumvent restrictions, vote manipulate, or evade bans violates our guidelines and may result in permanent suspension of all associated accounts.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-10">
                <AccordionTrigger className="text-sm py-3">What if I'm unsure whether my post follows the guidelines?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">When in doubt, err on the side of caution or reach out to moderators at guidelines@erudyte.com before posting. We're happy to review content or answer questions about our policies. It's always better to ask first than to deal with violations after the fact.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>

          {/* Footer (pill links, no underline/blue) */}
          <div className="mt-12 p-6 bg-muted rounded-2xl no-underline">
            <div className="flex items-start gap-4">
              <Users className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Building Our Community Together</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  These guidelines are our shared commitment to a thriving learning community.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span><strong>Last Updated:</strong> August 27, 2025</span>
                  <span><strong>Version:</strong> 2.1</span>
                  <span><strong>Next Review:</strong> November 27, 2025</span>
                </div>

                <div className="flex gap-3 mt-4 flex-wrap">
                  {[
                    { href: "/legal/terms", label: "Terms of Service" },
                    { href: "/legal/privacy", label: "Privacy Policy" },
                    { href: "/legal/accessibility", label: "Accessibility" },
                    { href: "mailto:community@erudyte.com", label: "Community Feedback" },
                  ].map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="text-[13px] text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-md ring-1 ring-zinc-300/60 dark:ring-zinc-700/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PageShell>
      </div>
    </>
  )
}
