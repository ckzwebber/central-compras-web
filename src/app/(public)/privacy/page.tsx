import type { Metadata } from "next";
import Link from "next/link";
import { SiWolframlanguage } from "react-icons/si";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// SEO Metadata
export const metadata: Metadata = {
  title: "Privacy Policy | Guri's Store",
  description: "Learn how Guri's Store collects, uses, and protects your personal information. Read our comprehensive Privacy Policy for B2B marketplace users.",
  robots: "index, follow",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Link href="/" className="inline-flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-800 bg-black shadow-lg transition-transform hover:scale-105">
              <SiWolframlanguage size={36} className="text-white" />
            </Link>
          </div>

          {/* Privacy Card */}
          <Card className="border-zinc-800 bg-zinc-950/80 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold text-white">Privacy Policy</CardTitle>
              <CardDescription className="text-zinc-400">Last updated: November 3, 2025</CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Introduction */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
                <p className="text-sm leading-relaxed text-zinc-300">
                  At Guri&apos;s Store, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, and protect your data
                  when you use our B2B marketplace platform.
                </p>
                <p className="text-sm leading-relaxed text-zinc-300">
                  This policy applies to all users of the platform, including stores, suppliers, and administrators. By using Guri&apos;s Store, you consent to the practices described in this policy.
                </p>
              </section>

              <Separator className="bg-zinc-800" />

              {/* Information Collection */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">2. Information We Collect</h2>
                <p className="text-sm leading-relaxed text-zinc-300">We collect various types of information to provide and improve our services:</p>

                <h3 className="text-base font-semibold text-white mt-4">2.1 Information You Provide</h3>
                <ul className="ml-6 space-y-2 text-sm text-zinc-300">
                  <li className="list-disc">
                    <strong className="text-white">Account Information:</strong> Name, email, phone number, company name, CNPJ
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Business Information:</strong> Company address, business category, payment details
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Profile Information:</strong> Profile picture, business description, preferences
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Transaction Data:</strong> Order history, payment information, invoices
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Communications:</strong> Messages, support tickets, feedback
                  </li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-4">2.2 Automatically Collected Information</h3>
                <ul className="ml-6 space-y-2 text-sm text-zinc-300">
                  <li className="list-disc">Device information (IP address, browser type, operating system)</li>
                  <li className="list-disc">Usage data (pages visited, time spent, features used)</li>
                  <li className="list-disc">Log data (access times, errors, performance metrics)</li>
                  <li className="list-disc">Location data (approximate location based on IP address)</li>
                </ul>
              </section>

              <Separator className="bg-zinc-800" />

              {/* Data Use */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">3. How We Use Your Information</h2>
                <p className="text-sm leading-relaxed text-zinc-300">We use the collected information for the following purposes:</p>
                <ul className="ml-6 space-y-2 text-sm text-zinc-300">
                  <li className="list-disc">
                    <strong className="text-white">Platform Operation:</strong> Provide, maintain, and improve our services
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Account Management:</strong> Create and manage your account, authenticate users
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Transaction Processing:</strong> Facilitate orders, process payments, generate invoices
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Communication:</strong> Send notifications, updates, and support responses
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Analytics:</strong> Understand usage patterns and improve user experience
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Security:</strong> Detect and prevent fraud, abuse, and security incidents
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Compliance:</strong> Meet legal and regulatory obligations
                  </li>
                </ul>
              </section>

              <Separator className="bg-zinc-800" />

              {/* Data Sharing */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">4. Information Sharing</h2>
                <p className="text-sm leading-relaxed text-zinc-300">We do not sell your personal information. We may share your data in the following circumstances:</p>
                <ul className="ml-6 space-y-2 text-sm text-zinc-300">
                  <li className="list-disc">
                    <strong className="text-white">Between Users:</strong> Contact and business information shared between stores and suppliers for transactions
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Service Providers:</strong> Third-party services that help us operate the platform (payment processors, hosting providers)
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Legal Requirements:</strong> When required by law or to protect rights and safety
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales
                  </li>
                </ul>
                <p className="text-sm leading-relaxed text-zinc-300">All third-party service providers are required to protect your information and use it only for the purposes we specify.</p>
              </section>

              <Separator className="bg-zinc-800" />

              {/* Cookies */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">5. Cookies and Tracking Technologies</h2>
                <p className="text-sm leading-relaxed text-zinc-300">We use cookies and similar technologies to enhance your experience on our platform:</p>
                <ul className="ml-6 space-y-2 text-sm text-zinc-300">
                  <li className="list-disc">
                    <strong className="text-white">Essential Cookies:</strong> Required for platform functionality (login, cart, preferences)
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Analytics Cookies:</strong> Help us understand how users interact with the platform
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Performance Cookies:</strong> Monitor platform performance and optimize loading times
                  </li>
                </ul>
                <p className="text-sm leading-relaxed text-zinc-300">You can control cookie preferences through your browser settings, but disabling certain cookies may limit platform functionality.</p>
              </section>

              <Separator className="bg-zinc-800" />

              {/* Data Security */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">6. Data Storage and Security</h2>
                <p className="text-sm leading-relaxed text-zinc-300">We implement robust security measures to protect your information:</p>
                <ul className="ml-6 space-y-2 text-sm text-zinc-300">
                  <li className="list-disc">Encryption of data in transit and at rest</li>
                  <li className="list-disc">Secure authentication and authorization mechanisms</li>
                  <li className="list-disc">Regular security audits and vulnerability assessments</li>
                  <li className="list-disc">Access controls and employee training</li>
                  <li className="list-disc">Secure data centers with physical and network security</li>
                </ul>
                <p className="text-sm leading-relaxed text-zinc-300">
                  While we strive to protect your data, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but are committed to continuous improvement.
                </p>
              </section>

              <Separator className="bg-zinc-800" />

              {/* User Rights */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">7. Your Rights</h2>
                <p className="text-sm leading-relaxed text-zinc-300">You have the following rights regarding your personal information:</p>
                <ul className="ml-6 space-y-2 text-sm text-zinc-300">
                  <li className="list-disc">
                    <strong className="text-white">Access:</strong> Request a copy of the personal data we hold about you
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Correction:</strong> Update or correct inaccurate information
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Deletion:</strong> Request deletion of your data (subject to legal requirements)
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Portability:</strong> Receive your data in a structured, machine-readable format
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Objection:</strong> Object to certain processing of your data
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Withdrawal:</strong> Withdraw consent for data processing (where applicable)
                  </li>
                </ul>
                <p className="text-sm leading-relaxed text-zinc-300">To exercise these rights, please contact us using the information provided below.</p>
              </section>

              <Separator className="bg-zinc-800" />

              {/* Data Retention */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">8. Data Retention</h2>
                <p className="text-sm leading-relaxed text-zinc-300">We retain your information for as long as necessary to:</p>
                <ul className="ml-6 space-y-2 text-sm text-zinc-300">
                  <li className="list-disc">Provide our services and fulfill transactions</li>
                  <li className="list-disc">Comply with legal, tax, and accounting obligations</li>
                  <li className="list-disc">Resolve disputes and enforce agreements</li>
                  <li className="list-disc">Prevent fraud and maintain platform security</li>
                </ul>
                <p className="text-sm leading-relaxed text-zinc-300">When data is no longer needed, we securely delete or anonymize it in accordance with our data retention policies.</p>
              </section>

              <Separator className="bg-zinc-800" />

              {/* Changes */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">9. Changes to Privacy Policy</h2>
                <p className="text-sm leading-relaxed text-zinc-300">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make significant changes, we will:
                </p>
                <ul className="ml-6 space-y-2 text-sm text-zinc-300">
                  <li className="list-disc">Update the &quot;Last updated&quot; date at the top of this page</li>
                  <li className="list-disc">Notify users via email or platform notification</li>
                  <li className="list-disc">Provide a prominent notice on the platform</li>
                </ul>
                <p className="text-sm leading-relaxed text-zinc-300">Continued use of the platform after changes constitutes acceptance of the updated policy.</p>
              </section>

              <Separator className="bg-zinc-800" />

              {/* Contact */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">10. Contact Information</h2>
                <p className="text-sm leading-relaxed text-zinc-300">If you have questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 space-y-2">
                  <p className="text-sm text-zinc-300">
                    <strong className="text-white">Email:</strong>{" "}
                    <a href="mailto:support@guristore.com" className="text-zinc-400 hover:text-white hover:underline">
                      support@guristore.com
                    </a>
                  </p>
                  <p className="text-sm text-zinc-300">
                    <strong className="text-white">Phone:</strong>{" "}
                    <a href="tel:+551112345678" className="text-zinc-400 hover:text-white hover:underline">
                      +55 (11) 1234-5678
                    </a>
                  </p>
                  <p className="text-sm text-zinc-300">
                    <strong className="text-white">Address:</strong> Rua Manoel Agostinho da Silva, 130 - Santa Augusta, Criciúma, SC - 88805-410
                  </p>
                  <p className="text-sm text-zinc-300">
                    <strong className="text-white">Data Protection Officer:</strong>{" "}
                    <a href="mailto:dpo@guristore.com" className="text-zinc-400 hover:text-white hover:underline">
                      dpo@guristore.com
                    </a>
                  </p>
                </div>
              </section>

              <Separator className="bg-zinc-800" />

              {/* Back Button */}
              <div className="flex justify-center pt-4">
                <Link href="/">
                  <Button variant="default" className="gap-2 border-zinc-800 bg-zinc-900 hover:bg-zinc-800">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-zinc-500">
            <p>© 2024 Guri&apos;s Store. All rights reserved.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
