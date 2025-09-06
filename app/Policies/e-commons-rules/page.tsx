import Link from "next/link"
import PageShell from "@/components/policy/PageShell"
import Section from "@/components/policy/Section"
import { Users, Heart, Shield, AlertTriangle, CheckCircle, MessageSquare, Flag, BookOpen, Award, Eye } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/Navigation"

export default function Page() {
  return (
    <>
      <Navigation />
      <div className="pb-40">
        <PageShell
          icon={<Users className="h-6 w-6" />}
          title="Community Guidelines"
          subtitle="Building a safe, supportive, and professional space for educators and learners. These guidelines help us maintain constructive conversations aligned with our educational mission."
          lastUpdated="Aug 27, 2025"
          version="2.1"
        >
          {/* Hero Statement */}
          <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <Heart className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-900 dark:text-blue-100">Our Community Vision</AlertTitle>
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              Erudyte is more than a learning platform — it's a community of educators, students, and lifelong learners committed to growth, collaboration, and mutual support. These guidelines help us create an environment where everyone can learn, teach, and thrive together.
            </AlertDescription>
          </Alert>

          {/* Quick Reference */}
          <div className="my-8">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Quick Reference (TL;DR)</AlertTitle>
              <AlertDescription>
                Be respectful and inclusive. Protect student privacy. Share evidence-based resources. No harassment, spam, or unauthorized solicitation. Report concerns promptly. Focus on constructive dialogue and professional growth.
              </AlertDescription>
            </Alert>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Our Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-green-600">Positive First</div>
                <p className="text-xs text-muted-foreground mt-1">Support over punishment</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-blue-600">24 Hours</div>
                <p className="text-xs text-muted-foreground mt-1">For community reports</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Appeal Period</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-purple-600">14 Days</div>
                <p className="text-xs text-muted-foreground mt-1">To contest decisions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">Education</div>
                <p className="text-xs text-muted-foreground mt-1">Learning-centered community</p>
              </CardContent>
            </Card>
          </div>

          {/* Core Principles */}
          <Section id="principles" title="Community Principles">
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Our community guidelines are built on fundamental principles that create a safe, inclusive, and productive learning environment for everyone.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-green-900 dark:text-green-100">
                      <Heart className="h-4 w-4" />
                      Respect & Inclusion
                    </CardTitle>
                    <CardDescription className="text-green-700 dark:text-green-300">Creating an environment where everyone feels valued</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
                      <li>• <strong>Assume good intent</strong> — approach disagreements with curiosity, not hostility</li>
                      <li>• <strong>Embrace diversity</strong> — welcome different perspectives, backgrounds, and experiences</li>
                      <li>• <strong>Zero tolerance for hate</strong> — no discrimination based on identity, background, or beliefs</li>
                      <li>• <strong>Constructive dialogue</strong> — focus on ideas and solutions, not personal attacks</li>
                      <li>• <strong>Cultural sensitivity</strong> — respect global perspectives and educational contexts</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-blue-900 dark:text-blue-100">
                      <Shield className="h-4 w-4" />
                      Student Safety & Privacy
                    </CardTitle>
                    <CardDescription className="text-blue-700 dark:text-blue-300">Protecting the learners we serve</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                      <li>• <strong>No identifiable student data</strong> — never post names, photos, or personal information</li>
                      <li>• <strong>Anonymize examples</strong> — share teaching stories without revealing student identity</li>
                      <li>• <strong>Obtain consent</strong> — get permission before sharing student work or achievements</li>
                      <li>• <strong>FERPA compliance</strong> — follow educational privacy laws and institutional policies</li>
                      <li>• <strong>Age-appropriate content</strong> — ensure all shared resources are suitable for educational settings</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-purple-900 dark:text-purple-100">
                      <BookOpen className="h-4 w-4" />
                      Evidence-Based Sharing
                    </CardTitle>
                    <CardDescription className="text-purple-700 dark:text-purple-300">Promoting quality educational discourse</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="space-y-1 text-sm text-purple-800 dark:text-purple-200">
                      <li>• <strong>Cite sources</strong> — back up claims with research, data, or credible references</li>
                      <li>• <strong>Share tested strategies</strong> — prioritize classroom-proven approaches over theory alone</li>
                      <li>• <strong>Acknowledge limitations</strong> — be honest about context and scope of recommendations</li>
                      <li>• <strong>Peer review mindset</strong> — welcome constructive feedback and alternative perspectives</li>
                      <li>• <strong>Combat misinformation</strong> — help maintain high standards for educational content</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-orange-900 dark:text-orange-100">
                      <Award className="h-4 w-4" />
                      Professional Excellence
                    </CardTitle>
                    <CardDescription className="text-orange-700 dark:text-orange-300">Maintaining high standards for professional conduct</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="space-y-1 text-sm text-orange-800 dark:text-orange-200">
                      <li>• <strong>No harassment or doxxing</strong> — respect boundaries and privacy</li>
                      <li>• <strong>Professional language</strong> — maintain appropriate tone and content</li>
                      <li>• <strong>Ethical practices</strong> — follow educational ethics and institutional guidelines</li>
                      <li>• <strong>Intellectual honesty</strong> — credit others' work and avoid plagiarism</li>
                      <li>• <strong>Collaborative spirit</strong> — support colleagues and share knowledge generously</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          {/* What's Encouraged */}
          <Section id="encouraged" title="Encouraged Community Contributions">
            <div className="space-y-6">
              <p className="text-muted-foreground">
                We celebrate content and interactions that advance educational excellence and community building. Here's what we love to see:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <BookOpen className="h-4 w-4" />
                      Educational Resources & Strategies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Classroom-tested strategies</strong> — share what actually works in practice</li>
                      <li>• <strong>Templates and rubrics</strong> — tools that other educators can adapt</li>
                      <li>• <strong>Lesson plan examples</strong> — creative approaches to curriculum challenges</li>
                      <li>• <strong>Assessment techniques</strong> — innovative ways to measure learning</li>
                      <li>• <strong>Technology integration</strong> — effective uses of educational tools</li>
                      <li>• <strong>Differentiation methods</strong> — strategies for diverse learning needs</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <MessageSquare className="h-4 w-4" />
                      Professional Development & Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Thoughtful questions</strong> — seeking advice and diverse perspectives</li>
                      <li>• <strong>Constructive feedback</strong> — helpful, specific suggestions for improvement</li>
                      <li>• <strong>PD opportunities</strong> — conferences, workshops, and training programs</li>
                      <li>• <strong>Grant information</strong> — funding opportunities for educators</li>
                      <li>• <strong>Research summaries</strong> — accessible breakdowns of educational research</li>
                      <li>• <strong>Career guidance</strong> — mentoring and professional advice</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Heart className="h-4 w-4" />
                      Community Building & Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Celebrating successes</strong> — recognizing achievements and milestones</li>
                      <li>• <strong>Learning from challenges</strong> — honest discussions about difficulties</li>
                      <li>• <strong>Peer encouragement</strong> — supporting colleagues through tough times</li>
                      <li>• <strong>Welcome messages</strong> — helping new members feel included</li>
                      <li>• <strong>Cultural exchange</strong> — sharing global educational perspectives</li>
                      <li>• <strong>Wellness discussions</strong> — supporting educator mental health and work-life balance</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Award className="h-4 w-4" />
                      Quality Content Standards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Original insights</strong> — your unique experiences and perspectives</li>
                      <li>• <strong>Detailed explanations</strong> — context and background for recommendations</li>
                      <li>• <strong>Follow-up engagement</strong> — responding to questions and comments</li>
                      <li>• <strong>Accessibility focus</strong> — inclusive practices for all learners</li>
                      <li>• <strong>Continuous improvement</strong> — updating and refining shared resources</li>
                      <li>• <strong>Cross-curricular connections</strong> — interdisciplinary approaches</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Recognition Program</AlertTitle>
                <AlertDescription>
                  Outstanding community contributors may be featured in our newsletter, invited to special events, or recognized with community badges. We celebrate educators who embody these values!
                </AlertDescription>
              </Alert>
            </div>
          </Section>

          {/* What's Not Allowed */}
          <Section id="not-allowed" title="Prohibited Content and Behavior">
            <div className="space-y-6">
              <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-900 dark:text-red-100">Zero Tolerance Policies</AlertTitle>
                <AlertDescription className="text-red-800 dark:text-red-200">
                  Some behaviors result in immediate account suspension or termination. We take these violations seriously to protect our community.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-red-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2 text-red-700">
                        <Badge variant="destructive">Immediate Action</Badge>
                        Harassment & Abuse
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>Personal attacks</strong> — targeting individuals with hostile language</li>
                        <li>• <strong>Harassment campaigns</strong> — coordinated targeting or doxxing</li>
                        <li>• <strong>Discriminatory content</strong> — based on race, gender, religion, etc.</li>
                        <li>• <strong>Threats or intimidation</strong> — explicit or implied harm</li>
                        <li>• <strong>Off-platform targeting</strong> — pursuing conflicts outside Erudyte</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2 text-red-700">
                        <Badge variant="destructive">Privacy Violation</Badge>
                        Student Safety
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>Student PII</strong> — names, photos, or identifying information</li>
                        <li>• <strong>Unauthorized sharing</strong> — student work without consent</li>
                        <li>• <strong>Inappropriate content</strong> — age-inappropriate or harmful material</li>
                        <li>• <strong>Safety violations</strong> — practices that could endanger students</li>
                        <li>• <strong>FERPA violations</strong> — educational privacy law breaches</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2 text-orange-700">
                        <Badge variant="secondary">Warning First</Badge>
                        Commercial Violations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>Unauthorized marketing</strong> — promoting products outside partner spaces</li>
                        <li>• <strong>Lead generation</strong> — collecting contact information for sales</li>
                        <li>• <strong>MLM schemes</strong> — multi-level marketing or pyramid structures</li>
                        <li>• <strong>Job spam</strong> — excessive posting of employment opportunities</li>
                        <li>• <strong>Affiliate links</strong> — undisclosed commercial relationships</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2 text-orange-700">
                        <Badge variant="secondary">Content Issues</Badge>
                        Quality & Integrity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>Plagiarism</strong> — using others' work without proper attribution</li>
                        <li>• <strong>Misinformation</strong> — sharing false or misleading educational claims</li>
                        <li>• <strong>Copyright violations</strong> — sharing protected materials without rights</li>
                        <li>• <strong>AI content misrepresentation</strong> — claiming AI-generated work as personal</li>
                        <li>• <strong>Spam or duplicate posts</strong> — excessive repetitive content</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Specific Content Restrictions</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">🚫 Copyrighted Material</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• Textbook pages or content without permission</li>
                        <li>• Copyrighted images, videos, or music</li>
                        <li>• Trademarked logos or branded content</li>
                        <li>• Assessment materials from test publishers</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">🚫 Inappropriate Content</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• Adult content or sexual material</li>
                        <li>• Violence or graphic imagery</li>
                        <li>• Illegal activities or substance abuse</li>
                        <li>• Self-harm or dangerous behaviors</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">🚫 Off-Topic Content</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• Political campaigning or partisan content</li>
                        <li>• Personal medical or legal advice</li>
                        <li>• Religious proselytizing</li>
                        <li>• Non-educational personal issues</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </Section>

          {/* Moderation Process */}
          <Section id="moderation" title="Community Moderation & Enforcement">
            <div className="space-y-6">
              <p className="text-muted-foreground">
                We use a balanced approach combining automated detection with human review to maintain community standards while respecting diverse perspectives.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">🤖 Automated Systems</CardTitle>
                    <CardDescription>Technology-assisted community protection</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Detection Capabilities:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Spam and duplicate content identification</li>
                        <li>• Hate speech and harassment detection</li>
                        <li>• Personal information (PII) scanning</li>
                        <li>• Copyright violation alerts</li>
                        <li>• Suspicious link and malware checking</li>
                      </ul>
                    </div>
                    <div className="text-xs text-muted-foreground p-2 bg-blue-50 dark:bg-blue-950 rounded">
                      <strong>Human Oversight:</strong> All automated actions are reviewed by human moderators to ensure fairness and context.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">👥 Human Review</CardTitle>
                    <CardDescription>Expert moderators with educational backgrounds</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Review Process:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Context-aware decision making</li>
                        <li>• Educational expertise in assessments</li>
                        <li>• Cultural sensitivity considerations</li>
                        <li>• Escalation to senior moderators for complex cases</li>
                        <li>• Regular training on community standards</li>
                      </ul>
                    </div>
                    <div className="text-xs text-muted-foreground p-2 bg-green-50 dark:bg-green-950 rounded">
                      <strong>Response Time:</strong> Most reports are reviewed within 24 hours, with urgent safety issues addressed immediately.
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Progressive Enforcement Actions</h4>
                <div className="space-y-3">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-0.5">Step 1</Badge>
                        <div>
                          <h5 className="font-medium text-sm mb-1">Educational Warning</h5>
                          <p className="text-xs text-muted-foreground">
                            First-time violations receive a friendly reminder about community guidelines with explanation of the issue and guidance for improvement.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <Badge variant="secondary" className="mt-0.5">Step 2</Badge>
                        <div>
                          <h5 className="font-medium text-sm mb-1">Content Removal & Warning</h5>
                          <p className="text-xs text-muted-foreground">
                            Repeated violations result in content removal and formal warning. User maintains full community access with additional monitoring.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <Badge variant="destructive" className="mt-0.5">Step 3</Badge>
                        <div>
                          <h5 className="font-medium text-sm mb-1">Temporary Suspension</h5>
                          <p className="text-xs text-muted-foreground">
                            Serious or repeated violations result in 1-30 day suspensions with specific conditions for account reinstatement and community re-entry.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <Badge variant="destructive" className="mt-0.5">Final</Badge>
                        <div>
                          <h5 className="font-medium text-sm mb-1">Account Termination</h5>
                          <p className="text-xs text-muted-foreground">
                            Severe violations (harassment, safety threats, repeated serious violations) result in permanent account termination and community ban.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </Section>

          {/* Reporting and Appeals */}
          <Section id="reporting" title="Reporting Violations & Appeals Process">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Flag className="h-4 w-4" />
                      How to Report Violations
                    </CardTitle>
                    <CardDescription>Multiple ways to flag concerning content or behavior</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Reporting Methods:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <strong>In-platform:</strong> Use the ••• menu on any post or comment</li>
                        <li>• <strong>Direct email:</strong> <Link href="mailto:safety@erudyte.com" className="text-primary">safety@erudyte.com</Link> for detailed reports</li>
                        <li>• <strong>Anonymous form:</strong> Available for sensitive situations</li>
                        <li>• <strong>Emergency line:</strong> Immediate safety concerns get priority</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-2">What to Include:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Specific content or behavior in question</li>
                        <li>• Why it violates community guidelines</li>
                        <li>• Screenshots or links when helpful</li>
                        <li>• Any additional context or concerns</li>
                      </ul>
                    </div>
                    <Button size="sm" variant="outline" className="mt-3">
                      Report a Violation
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Eye className="h-4 w-4" />
                      Appeals Process
                    </CardTitle>
                    <CardDescription>Challenging moderation decisions fairly</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Appeal Timeline:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <strong>14 days:</strong> Window to submit appeals</li>
                        <li>• <strong>5 business days:</strong> Initial review and response</li>
                        <li>• <strong>Escalation:</strong> Senior review for complex cases</li>
                        <li>• <strong>Final decision:</strong> Binding resolution within 10 days</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Clear explanation of why you believe the decision was incorrect</li>
                        <li>• Additional context or evidence supporting your case</li>
                        <li>• Acknowledgment of community guidelines and commitment to follow them</li>
                        <li>• Professional, respectful tone in all communications</li>
                      </ul>
                    </div>
                    <Button size="sm" variant="outline" className="mt-3">
                      Submit Appeal
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertTitle>Fair Process Guarantee</AlertTitle>
                <AlertDescription>
                  Every report is investigated thoroughly, and every user has the right to appeal moderation decisions. We're committed to transparent, consistent enforcement that protects our community while respecting individual rights.
                </AlertDescription>
              </Alert>
            </div>
          </Section>

          {/* Updates */}
          <Section id="updates" title="Updates to Community Guidelines" badge="Living Document">
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Our community guidelines evolve as we learn from our community and adapt to new challenges. We're committed to transparency in how these rules change.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">📝 Update Process</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="space-y-1 text-xs">
                      <li>• <strong>Community input:</strong> Feedback drives guideline improvements</li>
                      <li>• <strong>Regular review:</strong> Quarterly assessment of effectiveness</li>
                      <li>• <strong>Expert consultation:</strong> Educational professionals advise on changes</li>
                      <li>• <strong>Transparency:</strong> Clear communication about all modifications</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">📢 Change Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="space-y-1 text-xs">
                      <li>• <strong>Major changes:</strong> 30-day advance notice via email</li>
                      <li>• <strong>Minor updates:</strong> In-platform announcements</li>
                      <li>• <strong>Emergency changes:</strong> Immediate notification for safety issues</li>
                      <li>• <strong>Version history:</strong> Complete changelog available</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <MessageSquare className="h-4 w-4" />
                <AlertTitle>Community Feedback</AlertTitle>
                <AlertDescription>
                  We periodically revise these guidelines based on community needs and best practices. Material changes are announced in-product and via email. Share your feedback at community@erudyte.com.
                </AlertDescription>
              </Alert>
            </div>
          </Section>

          {/* FAQ */}
          <Section id="faq" title="Community Guidelines FAQ" className="[&>div>h2]:text-lg">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="faq-1">
                <AccordionTrigger className="text-xs">What if I accidentally share student information?</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm">
                    <p>If you accidentally post student information:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• <strong>Immediately delete</strong> the post or edit to remove identifying details</li>
                      <li>• <strong>Contact moderators</strong> at safety@erudyte.com to ensure complete removal</li>
                      <li>• <strong>No penalties</strong> for honest mistakes that are quickly corrected</li>
                      <li>• <strong>Learning opportunity</strong> — we'll provide guidance to prevent future incidents</li>
                    </ul>
                    <p className="text-xs text-muted-foreground">We understand that sharing educational experiences sometimes involves sensitive information. When in doubt, anonymize all details or ask for guidance before posting.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2">
                <AccordionTrigger className="text-xs">Can I share my own educational resources and materials?</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm">
                    <p>Absolutely! We encourage sharing original educational content:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• <strong>Original materials:</strong> Lesson plans, worksheets, rubrics you created</li>
                      <li>• <strong>Proper attribution:</strong> Credit any sources or inspirations</li>
                      <li>• <strong>Usage rights:</strong> Specify how others can use your materials</li>
                      <li>• <strong>No commercial promotion:</strong> Focus on educational value, not sales</li>
                    </ul>
                    <p>For paid resources, you can mention availability but detailed promotion should be in designated partner spaces.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3">
                <AccordionTrigger className="text-xs">How do you handle disagreements about educational approaches?</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm">
                    <p>We welcome diverse educational perspectives and healthy debate:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• <strong>Respectful disagreement:</strong> Challenge ideas, not people</li>
                      <li>• <strong>Evidence-based discussion:</strong> Support positions with research or experience</li>
                      <li>• <strong>Multiple approaches:</strong> Recognize that different methods work for different contexts</li>
                      <li>• <strong>Learning mindset:</strong> Be open to changing your perspective</li>
                    </ul>
                    <p className="text-xs text-muted-foreground">Our moderation team includes educators who understand that pedagogical debates are healthy when conducted professionally.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-4">
                <AccordionTrigger className="text-xs">What happens if I'm falsely reported?</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm">
                    <p>We take false reporting seriously and have protections in place:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• <strong>Human review:</strong> All reports are evaluated by trained moderators</li>
                      <li>• <strong>Context consideration:</strong> We examine the full conversation and intent</li>
                      <li>• <strong>Appeal process:</strong> You can challenge any moderation decision</li>
                      <li>• <strong>Pattern detection:</strong> Repeated false reporting is itself a violation</li>
                    </ul>
                    <p>If you believe you've been falsely reported, use our appeals process to provide additional context. We'll review the decision thoroughly.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-5">
                <AccordionTrigger className="text-xs">Can I discuss controversial educational topics?</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm">
                    <p>Yes, but with care and professionalism:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• <strong>Educational focus:</strong> Frame discussions around pedagogical implications</li>
                      <li>• <strong>Multiple perspectives:</strong> Acknowledge different viewpoints and contexts</li>
                      <li>• <strong>Professional tone:</strong> Maintain respectful, academic discourse</li>
                      <li>• <strong>Student-centered:</strong> Consider impact on student learning and well-being</li>
                    </ul>
                    <p className="text-xs text-muted-foreground">Topics like curriculum standards, assessment methods, and teaching controversial subjects are welcome when approached professionally.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-6">
                <AccordionTrigger className="text-xs">How do I know if AI-generated content needs to be disclosed?</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm">
                    <p>Transparency about AI assistance is required:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• <strong>Direct AI output:</strong> Must be clearly labeled as AI-generated</li>
                      <li>• <strong>AI-assisted work:</strong> Disclose when AI tools helped with creation or editing</li>
                      <li>• <strong>Research help:</strong> Mention if AI was used for brainstorming or research</li>
                      <li>• <strong>Personal experience:</strong> Don't present AI content as your own classroom experience</li>
                    </ul>
                    <p>When in doubt, err on the side of disclosure. Our community values authenticity and honesty about content origins.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>

          {/* Footer */}
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <div className="flex items-start gap-4">
              <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Building Our Community Together</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  These guidelines are more than rules — they're our shared commitment to creating an environment where educators can learn, grow, and support each other. By following these principles, you help build a community that advances educational excellence and promotes the well-being of educators and students worldwide.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span><strong>Last Updated:</strong> August 27, 2025</span>
                  <span><strong>Version:</strong> 2.1</span>
                  <span><strong>Next Review:</strong> November 27, 2025</span>
                </div>
                <div className="flex gap-4 mt-3">
                  <Link href="/legal/terms" className="text-primary hover:underline text-sm">Terms of Service</Link>
                  <Link href="/legal/privacy" className="text-primary hover:underline text-sm">Privacy Policy</Link>
                  <Link href="/legal/accessibility" className="text-primary hover:underline text-sm">Accessibility Statement</Link>
                  <Link href="mailto:community@erudyte.com" className="text-primary hover:underline text-sm">Community Feedback</Link>
                </div>
              </div>
            </div>
          </div>
        </PageShell>
      </div>
    </>
  )
}