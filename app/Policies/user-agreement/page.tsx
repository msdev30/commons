import Link from "next/link"
import PageShell from "@/components/policy/PageShell"
import Section from "@/components/policy/Section"
import { FileText, Users, Shield, CreditCard, AlertTriangle, Scale, Book, RefreshCw, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Navigation from "@/components/Navigation"

export default function Page() {
  return (
    <>
      <Navigation />
      <div className="pb-40">
        <PageShell
          icon={<FileText className="h-6 w-6" />}
          title="User Agreement"
          subtitle="The comprehensive terms that govern your use of Erudyte's educational platform, products, and services."
          lastUpdated="Aug 27, 2025"
          version="3.0"
        >
          {/* Hero Statement */}
          <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <Scale className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-900 dark:text-blue-100">Legal Agreement</AlertTitle>
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              This User Agreement creates a binding legal contract between you and Erudyte. By creating an account or using our services, you agree to these terms and our Privacy Policy. Please read carefully to understand your rights and responsibilities.
            </AlertDescription>
          </Alert>

          {/* Quick Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Agreement Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-blue-600">Binding Contract</div>
                <p className="text-xs text-muted-foreground mt-1">Legal obligations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Minimum Age</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-green-600">18 Years</div>
                <p className="text-xs text-muted-foreground mt-1">Or institutional auth</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Governing Law</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">Jurisdiction</div>
                <p className="text-xs text-muted-foreground mt-1">Per contracting entity</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-purple-600">Advance Notice</div>
                <p className="text-xs text-muted-foreground mt-1">For material changes</p>
              </CardContent>
            </Card>
          </div>

          {/* Acceptance of Terms */}
          <Section id="acceptance" title="Acceptance of Terms">
            <div className="space-y-6">
              <p className="text-muted-foreground">
                By accessing or using Erudyte's services, you enter into a legally binding agreement with us. This section explains how and when this agreement takes effect.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <CheckCircle className="h-4 w-4" />
                      Agreement Formation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">You agree to these terms by:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Creating an account on our platform</li>
                        <li>• Using any of our services or features</li>
                        <li>• Downloading our mobile applications</li>
                        <li>• Participating in our educational programs</li>
                        <li>• Accessing content through institutional partnerships</li>
                      </ul>
                    </div>
                    <div className="text-xs text-muted-foreground p-2 bg-blue-50 dark:bg-blue-950 rounded">
                      <strong>Important:</strong> If you do not agree to these terms, you may not use our services.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <FileText className="h-4 w-4" />
                      Related Agreements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">This agreement includes:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <Link href="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link> — how we handle your data</li>
                        <li>• <Link href="/legal/community-guidelines" className="text-primary hover:underline">Community Guidelines</Link> — behavior standards</li>
                        <li>• <Link href="/legal/accessibility" className="text-primary hover:underline">Accessibility Statement</Link> — our inclusion commitment</li>
                        <li>• Course-specific terms for individual programs</li>
                        <li>• Enterprise agreements for institutional users</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Legal Capacity Required</AlertTitle>
                <AlertDescription>
                  You must have the legal authority to enter into this agreement. If you're using Erudyte on behalf of an organization, you represent that you have authority to bind that organization to these terms.
                </AlertDescription>
              </Alert>
            </div>
          </Section>

          {/* Eligibility & Accounts */}
          <Section id="eligibility" title="User Eligibility & Account Requirements">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Users className="h-4 w-4" />
                      Eligibility Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Individual Users:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <strong>Age 18 or older</strong> — legal adults can create personal accounts</li>
                        <li>• <strong>Legal capacity</strong> — ability to enter binding agreements</li>
                        <li>• <strong>Accurate information</strong> — provide truthful account details</li>
                        <li>• <strong>Compliance</strong> — follow all applicable laws and regulations</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-2">Educational Institutions:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Authorized representatives can create institutional accounts</li>
                        <li>• Can provide supervised access for students under 18</li>
                        <li>• Must comply with educational privacy laws (FERPA, COPPA)</li>
                        <li>• Subject to separate enterprise agreements</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Shield className="h-4 w-4" />
                      Account Security & Responsibilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">You are responsible for:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <strong>Safeguarding credentials</strong> — protect your username and password</li>
                        <li>• <strong>All account activity</strong> — actions taken under your account</li>
                        <li>• <strong>Authorized access only</strong> — don't share login information</li>
                        <li>• <strong>Security monitoring</strong> — watch for unauthorized use</li>
                        <li>• <strong>Immediate reporting</strong> — notify us of security breaches</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-2">Account Management:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• One account per person (no duplicate accounts)</li>
                        <li>• Keep contact information current and accurate</li>
                        <li>• Enable two-factor authentication when available</li>
                        <li>• Use strong, unique passwords</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <Users className="h-4 w-4" />
                <AlertTitle>Institutional Authorization</AlertTitle>
                <AlertDescription>
                  Educational institutions may create accounts for students under 18 with proper authorization and compliance with educational privacy laws. Contact us for enterprise account setup and student privacy protections.
                </AlertDescription>
              </Alert>
            </div>
          </Section>

          {/* License & Acceptable Use */}
          <Section id="license" title="License to Use Services & Acceptable Use">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">📜 License Grant</CardTitle>
                    <CardDescription>What we permit you to do with our services</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">We grant you a license that is:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <strong>Limited</strong> — only for the purposes described in these terms</li>
                        <li>• <strong>Non-exclusive</strong> — we can grant the same rights to others</li>
                        <li>• <strong>Non-transferable</strong> — you cannot give these rights to others</li>
                        <li>• <strong>Revocable</strong> — we can terminate for violations</li>
                        <li>• <strong>Subject to payment</strong> — for paid services</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-2">Permitted Uses:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Access and use educational content for learning</li>
                        <li>• Participate in courses and community discussions</li>
                        <li>• Download content for offline personal study</li>
                        <li>• Share achievements and certificates</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">🚫 Prohibited Activities</CardTitle>
                    <CardDescription>What you cannot do with our services</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">You agree not to:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <strong>Reverse engineer</strong> — attempt to discover source code or algorithms</li>
                        <li>• <strong>Scrape at scale</strong> — automated data extraction beyond personal use</li>
                        <li>• <strong>Misuse the platform</strong> — interference with normal operation</li>
                        <li>• <strong>Circumvent restrictions</strong> — bypass technical or legal limitations</li>
                        <li>• <strong>Redistribute content</strong> — share copyrighted materials without permission</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-2">Technical Restrictions:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• No hacking, cracking, or security breaches</li>
                        <li>• No malware, viruses, or harmful code</li>
                        <li>• No overwhelming our systems with requests</li>
                        <li>• No unauthorized API access or automation</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <Book className="h-4 w-4" />
                <AlertTitle>Educational Use Focus</AlertTitle>
                <AlertDescription>
                  This license is specifically for educational and professional development purposes. Commercial use of our content or services requires separate authorization and licensing agreements.
                </AlertDescription>
              </Alert>
            </div>
          </Section>

          {/* User Content & IP */}
          <Section id="content" title="User Content & Intellectual Property">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">👤 Your Content Ownership</CardTitle>
                    <CardDescription>What you own and control</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">You retain full ownership of:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <strong>Original work</strong> — assignments, projects, and creative content</li>
                        <li>• <strong>Personal information</strong> — profile details and preferences</li>
                        <li>• <strong>Discussion contributions</strong> — forum posts and comments</li>
                        <li>• <strong>Uploaded files</strong> — documents, images, and media</li>
                        <li>• <strong>Intellectual property</strong> — ideas and innovations you create</li>
                      </ul>
                    </div>
                    <div className="text-xs text-muted-foreground p-2 bg-green-50 dark:bg-green-950 rounded">
                      <strong>Your Rights:</strong> You can edit, delete, or export your content at any time through your account settings.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">🤝 License You Grant Us</CardTitle>
                    <CardDescription>How we may use your content to provide services</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">You grant us permission to:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <strong>Host and display</strong> — store and show your content on our platform</li>
                        <li>• <strong>Process and analyze</strong> — for educational insights and improvements</li>
                        <li>• <strong>Share with instructors</strong> — for grading and feedback purposes</li>
                        <li>• <strong>Use for support</strong> — troubleshoot technical issues</li>
                        <li>• <strong>Anonymized examples</strong> — showcase educational best practices</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-2">Important Limitations:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• We never claim ownership of your content</li>
                        <li>• We don't use your content for commercial purposes without permission</li>
                        <li>• You can revoke this license by deleting your content</li>
                        <li>• We respect your privacy and intellectual property rights</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Content Standards & Responsibilities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">✅ Your Responsibilities</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>Original or properly licensed content</strong> — don't infringe others' rights</li>
                        <li>• <strong>Accurate information</strong> — provide truthful and current details</li>
                        <li>• <strong>Appropriate content</strong> — suitable for educational environments</li>
                        <li>• <strong>Compliance with laws</strong> — follow copyright and privacy regulations</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">🛡️ Our Protections</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>DMCA compliance</strong> — respond to copyright infringement reports</li>
                        <li>• <strong>Content moderation</strong> — remove inappropriate or harmful material</li>
                        <li>• <strong>User reporting</strong> — community-driven content oversight</li>
                        <li>• <strong>Legal cooperation</strong> — assist with legitimate legal requests</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </Section>

          {/* Subscriptions & Payments */}
          <Section id="payments" title="Subscriptions, Payments & Billing">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <CreditCard className="h-4 w-4" />
                      Payment Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Subscription Services:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <strong>Auto-renewal</strong> — paid plans renew automatically unless canceled</li>
                        <li>• <strong>Billing cycles</strong> — monthly or annual as selected</li>
                        <li>• <strong>Payment methods</strong> — credit cards, PayPal, bank transfers</li>
                        <li>• <strong>Currency</strong> — charges in USD or local currency where available</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-2">Pricing & Changes:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Current pricing available on our website</li>
                        <li>• 30-day notice for subscription price changes</li>
                        <li>• Grandfathered rates for existing subscribers (limited time)</li>
                        <li>• Option to cancel before new rates take effect</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <RefreshCw className="h-4 w-4" />
                      Refunds & Cancellations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Refund Policy:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <strong>Individual courses</strong> — 14-day refund window with usage limits</li>
                        <li>• <strong>Subscriptions</strong> — 7-day refund for new subscriptions</li>
                        <li>• <strong>Special circumstances</strong> — case-by-case review for hardships</li>
                        <li>• <strong>Processing time</strong> — 5-10 business days for approved refunds</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-2">Cancellation:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Cancel anytime through account settings</li>
                        <li>• Access continues until end of current billing period</li>
                        <li>• No partial refunds for mid-cycle cancellations</li>
                        <li>• Reactivation available with same payment method</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Tax Information & Enterprise Billing</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">💰 Taxes & Fees</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>Tax calculation</strong> — based on your billing address</li>
                        <li>• <strong>VAT/GST</strong> — applied where legally required</li>
                        <li>• <strong>Tax receipts</strong> — available for download in account</li>
                        <li>• <strong>Business exemptions</strong> — provide valid tax ID for exempt status</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">🏢 Enterprise Accounts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>Custom contracts</strong> — negotiated terms for large organizations</li>
                        <li>• <strong>Invoice billing</strong> — NET 30 payment terms available</li>
                        <li>• <strong>Purchase orders</strong> — accepted for institutional customers</li>
                        <li>• <strong>Volume discounts</strong> — pricing tiers based on user count</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Alert>
                <CreditCard className="h-4 w-4" />
                <AlertTitle>Payment Security</AlertTitle>
                <AlertDescription>
                  All payments are processed through PCI-compliant providers. We never store full credit card numbers. Taxes may apply based on your location and applicable laws.
                </AlertDescription>
              </Alert>
            </div>
          </Section>

          {/* Termination */}
          <Section id="termination" title="Account Termination & Service Suspension">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">🚪 Termination by You</CardTitle>
                    <CardDescription>How to end your relationship with Erudyte</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Account Deletion Process:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <strong>Self-service deletion</strong> — available in account settings</li>
                        <li>• <strong>Email confirmation</strong> — required to prevent accidental deletion</li>
                        <li>• <strong>Grace period</strong> — 30 days to recover deleted accounts</li>
                        <li>• <strong>Data export</strong> — download your information before deletion</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-2">What Happens:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Immediate loss of access to platform and content</li>
                        <li>• Cancellation of active subscriptions</li>
                        <li>• Personal data deletion per privacy policy</li>
                        <li>• Certificates remain valid but not re-downloadable</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">⚠️ Termination by Erudyte</CardTitle>
                    <CardDescription>When we may suspend or terminate accounts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Grounds for Termination:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <strong>Terms violations</strong> — repeated or serious breaches</li>
                        <li>• <strong>Payment failures</strong> — unpaid subscriptions or chargebacks</li>
                        <li>• <strong>Fraudulent activity</strong> — misuse or abuse of services</li>
                        <li>• <strong>Legal compliance</strong> — required by law or regulation</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-2">Process & Appeals:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Warning notices for first-time violations</li>
                        <li>• Immediate termination for severe violations</li>
                        <li>• Appeal process available for disputed decisions</li>
                        <li>• Data retention per legal requirements</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Survival of Terms</h4>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Some provisions of this agreement continue even after termination:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">📝 Intellectual Property</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ul className="space-y-1 text-xs">
                          <li>• Ownership rights remain with creators</li>
                          <li>• License grants may survive for hosted content</li>
                          <li>• Copyright protections continue</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">⚖️ Legal Protections</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ul className="space-y-1 text-xs">
                          <li>• Disclaimers and liability limitations</li>
                          <li>• Dispute resolution procedures</li>
                          <li>• Governing law and jurisdiction</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">💼 Obligations</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ul className="space-y-1 text-xs">
                          <li>• Payment obligations for services used</li>
                          <li>• Confidentiality agreements</li>
                          <li>• Post-termination conduct restrictions</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Disclaimers & Liability */}
          <Section id="disclaimers" title="Service Disclaimers & Limitation of Liability">
            <div className="space-y-6">
              <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertTitle className="text-yellow-900 dark:text-yellow-100">Important Legal Disclaimers</AlertTitle>
                <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                  Please read these limitations carefully as they affect your legal rights and remedies.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Service Disclaimers</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-4">
                        <h5 className="font-medium text-sm mb-2">"As-Is" Service Provision</h5>
                        <p className="text-xs text-muted-foreground mb-2">Erudyte services are provided without warranties of any kind:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• No guarantee of uninterrupted or error-free service</li>
                          <li>• Content accuracy and completeness not warranted</li>
                          <li>• Third-party integrations may have limitations</li>
                          <li>• Platform features may change or be discontinued</li>
                          <li>• Educational outcomes cannot be guaranteed</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-4">
                        <h5 className="font-medium text-sm mb-2">Educational Disclaimers</h5>
                        <p className="text-xs text-muted-foreground mb-2">While we strive for excellence, we cannot guarantee:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• Specific learning outcomes or skill acquisition</li>
                          <li>• Employment or career advancement results</li>
                          <li>• Recognition of certificates by all institutions</li>
                          <li>• Compatibility with all learning styles or needs</li>
                          <li>• Achievement of personal or professional goals</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Limitation of Liability</h4>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      To the maximum extent permitted by law, Erudyte's liability is limited as follows:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">💰 Monetary Limits</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-xs text-muted-foreground">Total liability limited to:</p>
                          <ul className="space-y-1 text-xs">
                            <li>• Fees paid in the 12 months preceding the claim</li>
                            <li>• Or $100 USD, whichever is greater</li>
                            <li>• No liability for lost profits or indirect damages</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">🚫 Excluded Damages</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-xs text-muted-foreground">We are not liable for:</p>
                          <ul className="space-y-1 text-xs">
                            <li>• Indirect, incidental, or consequential damages</li>
                            <li>• Loss of data, revenue, or business opportunities</li>
                            <li>• Damages from third-party content or links</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">⚖️ Legal Exceptions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-xs text-muted-foreground">Limitations don't apply to:</p>
                          <ul className="space-y-1 text-xs">
                            <li>• Death or personal injury from negligence</li>
                            <li>• Fraud or fraudulent misrepresentation</li>
                            <li>• Violations of applicable consumer protection laws</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Governing Law & Disputes */}
          <Section id="governing-law" title="Governing Law & Dispute Resolution">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">🌍 Governing Law</CardTitle>
                    <CardDescription>Which laws apply to this agreement</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Jurisdiction Determination:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <strong>Individual users:</strong> Laws of California, United States</li>
                        <li>• <strong>Enterprise customers:</strong> Per contracting entity specified in order form</li>
                        <li>• <strong>Educational institutions:</strong> May be governed by institutional agreement</li>
                        <li>• <strong>International users:</strong> Local consumer protection laws may apply</li>
                      </ul>
                    </div>
                    <div className="text-xs text-muted-foreground p-2 bg-blue-50 dark:bg-blue-950 rounded">
                      <strong>Note:</strong> Some jurisdictions may not allow certain limitations, in which case they apply only to the maximum extent permitted.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">⚖️ Dispute Resolution</CardTitle>
                    <CardDescription>How conflicts are resolved</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Resolution Process:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <strong>Informal resolution:</strong> Contact support for direct discussion</li>
                        <li>• <strong>Mediation:</strong> Third-party mediation for complex disputes</li>
                        <li>• <strong>Arbitration:</strong> Binding arbitration as specified in order forms</li>
                        <li>• <strong>Court jurisdiction:</strong> Federal or state courts as applicable</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-2">Special Provisions:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Emergency injunctive relief available</li>
                        <li>• Small claims court jurisdiction preserved</li>
                        <li>• Class action waiver may apply per agreement</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <Scale className="h-4 w-4" />
                <AlertTitle>Fair Resolution</AlertTitle>
                <AlertDescription>
                  We're committed to fair, efficient dispute resolution. Most issues can be resolved through direct communication with our support team. For complex disputes, we'll work with you to find appropriate resolution mechanisms.
                </AlertDescription>
              </Alert>
            </div>
          </Section>

          {/* Changes to Terms */}
          <Section id="changes" title="Changes to Terms & Agreement Updates">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">📝 Update Process</CardTitle>
                    <CardDescription>How and when we modify these terms</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Reasons for Updates:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <strong>Legal compliance</strong> — changes in applicable laws</li>
                        <li>• <strong>Security improvements</strong> — enhanced protection measures</li>
                        <li>• <strong>New features</strong> — additional services or capabilities</li>
                        <li>• <strong>Operational changes</strong> — business process improvements</li>
                        <li>• <strong>Clarifications</strong> — better explanation of existing terms</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-2">Notification Methods:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Email notice to your registered address</li>
                        <li>• In-platform notifications and banners</li>
                        <li>• Updated "Last Modified" date on this page</li>
                        <li>• Blog posts for significant changes</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">⏰ Effective Dates & Your Options</CardTitle>
                    <CardDescription>When changes take effect and your choices</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Timeline for Changes:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <strong>Material changes:</strong> 30-day advance notice</li>
                        <li>• <strong>Minor updates:</strong> Immediate effect with notification</li>
                        <li>• <strong>Legal requirements:</strong> Immediate when required by law</li>
                        <li>• <strong>Security updates:</strong> Immediate for protection purposes</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-2">Your Options:</h5>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• <strong>Accept changes:</strong> Continue using services normally</li>
                        <li>• <strong>Disagree with changes:</strong> Cancel your account before effective date</li>
                        <li>• <strong>Continued use:</strong> Constitutes acceptance of updated terms</li>
                        <li>• <strong>Grandfathering:</strong> May apply for existing paid subscribers</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <RefreshCw className="h-4 w-4" />
                <AlertTitle>Transparent Updates</AlertTitle>
                <AlertDescription>
                  We're committed to transparent communication about changes. Material changes will be notified in advance, and continued use constitutes acceptance. Version history is available upon request.
                </AlertDescription>
              </Alert>
            </div>
          </Section>

          {/* Additional Legal Provisions */}
          <Section id="additional" title="Additional Legal Provisions">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">🔗 Entire Agreement</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-xs text-muted-foreground">This User Agreement, together with our Privacy Policy and any specific service agreements, constitutes the complete agreement between you and Erudyte. It supersedes all prior agreements and communications.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">⚖️ Severability</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-xs text-muted-foreground">If any provision of this agreement is found unenforceable, the remaining provisions will continue in full force. Invalid provisions will be modified to the minimum extent necessary to make them enforceable.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">🚫 Waiver</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-xs text-muted-foreground">Our failure to enforce any right or provision doesn't constitute a waiver. All rights and remedies are cumulative and may be exercised independently or together.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">📋 Assignment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-xs text-muted-foreground">You may not assign your rights under this agreement. Erudyte may assign this agreement in connection with a merger, acquisition, or sale of assets with notice to users.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          {/* Contact Information */}
          <Section id="contact" title="Questions & Contact Information">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">📞 Legal Inquiries</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div>
                        <strong className="text-sm">General Legal Questions:</strong>
                        <br />
                        <Link href="mailto:legal@erudyte.com" className="text-primary hover:underline text-sm">
                          legal@erudyte.com
                        </Link>
                      </div>
                      <div>
                        <strong className="text-sm">Contract Disputes:</strong>
                        <br />
                        <Link href="mailto:disputes@erudyte.com" className="text-primary hover:underline text-sm">
                          disputes@erudyte.com
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">🏢 Business Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <p><strong>Erudyte, Inc.</strong><br />
                      Legal Department<br />
                      123 Education Boulevard<br />
                      San Francisco, CA 94105<br />
                      United States</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          {/* Footer */}
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <div className="flex items-start gap-4">
              <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Legal Foundation for Learning</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  This User Agreement establishes the legal framework for your educational journey with Erudyte. We've designed these terms to be fair, transparent, and protective of both your rights and our ability to provide excellent educational services. Thank you for being part of our learning community.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span><strong>Effective Date:</strong> August 27, 2025</span>
                  <span><strong>Version:</strong> 3.0</span>
                  <span><strong>Next Review:</strong> February 27, 2026</span>
                </div>
                <div className="flex gap-4 mt-3">
                  <Link href="/legal/privacy" className="text-primary hover:underline text-sm">Privacy Policy</Link>
                  <Link href="/legal/community-guidelines" className="text-primary hover:underline text-sm">Community Guidelines</Link>
                  <Link href="/legal/accessibility" className="text-primary hover:underline text-sm">Accessibility Statement</Link>
                  <Link href="/legal/terms" className="text-primary hover:underline text-sm">Terms of Service</Link>
                </div>
              </div>
            </div>
          </div>
        </PageShell>
      </div>
    </>
  )
}
