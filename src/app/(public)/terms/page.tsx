import type { Metadata } from "next";
import Link from "next/link";
import { SiWolframlanguage } from "react-icons/si";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Terms of Service | Guri's Store",
  description: "Read the Terms of Service for Guri's Store B2B marketplace platform. Learn about platform usage, user responsibilities, and your rights.",
  robots: "index, follow",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center">
            <Link href="/" className="inline-flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-800 bg-black shadow-lg transition-transform hover:scale-105">
              <SiWolframlanguage size={36} className="text-white" />
            </Link>
          </div>

          <Card className="border-zinc-800 bg-zinc-950/80 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold text-white">Terms of Service</CardTitle>
              <CardDescription className="text-zinc-400">Last updated: November 3, 2025</CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
                <p className="text-sm leading-relaxed text-zinc-300">
                  Welcome to Guri&apos;s Store, a B2B marketplace platform that connects stores with suppliers. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them
                  carefully before proceeding.
                </p>
                <p className="text-sm leading-relaxed text-zinc-300">
                  These terms govern your access to and use of the Guri&apos;s Store platform, whether you are a store, supplier, or administrator. If you do not agree with these terms, please do not use our services.
                </p>
              </section>

              <Separator className="bg-zinc-800" />

              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">2. Platform Use</h2>
                <p className="text-sm leading-relaxed text-zinc-300">Guri&apos;s Store provides a centralized marketplace for B2B transactions. The platform allows:</p>
                <ul className="ml-6 space-y-2 text-sm text-zinc-300">
                  <li className="list-disc">
                    <strong className="text-white">Stores:</strong> Browse and purchase products from multiple suppliers
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Suppliers:</strong> List products, manage inventory, and fulfill orders
                  </li>
                  <li className="list-disc">
                    <strong className="text-white">Administrators:</strong> Manage platform operations, users, and content
                  </li>
                </ul>
                <p className="text-sm leading-relaxed text-zinc-300">You agree to use the platform only for lawful business purposes and in accordance with all applicable laws and regulations.</p>
              </section>

              <Separator className="bg-zinc-800" />

              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">3. Accounts and Credentials</h2>
                <p className="text-sm leading-relaxed text-zinc-300">To access certain features of the platform, you must create an account. You are responsible for:</p>
                <ul className="ml-6 space-y-2 text-sm text-zinc-300">
                  <li className="list-disc">Providing accurate and complete information during registration</li>
                  <li className="list-disc">Maintaining the security of your account credentials</li>
                  <li className="list-disc">All activities that occur under your account</li>
                  <li className="list-disc">Notifying us immediately of any unauthorized use</li>
                </ul>
                <p className="text-sm leading-relaxed text-zinc-300">We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activities.</p>
              </section>

              <Separator className="bg-zinc-800" />

              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">4. User Responsibilities</h2>
                <p className="text-sm leading-relaxed text-zinc-300">As a user of Guri&apos;s Store, you agree to:</p>
                <ul className="ml-6 space-y-2 text-sm text-zinc-300">
                  <li className="list-disc">Provide accurate product information and pricing (suppliers)</li>
                  <li className="list-disc">Fulfill orders promptly and professionally (suppliers)</li>
                  <li className="list-disc">Make payments in accordance with agreed terms (stores)</li>
                  <li className="list-disc">Not engage in fraudulent, abusive, or illegal activities</li>
                  <li className="list-disc">Respect intellectual property rights of others</li>
                  <li className="list-disc">Not attempt to compromise the security of the platform</li>
                </ul>
              </section>

              <Separator className="bg-zinc-800" />

              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">5. Intellectual Property</h2>
                <p className="text-sm leading-relaxed text-zinc-300">
                  All content, features, and functionality of the Guri&apos;s Store platform, including but not limited to text, graphics, logos, icons, images, and software, are the exclusive property of Guri&apos;s
                  Store and are protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p className="text-sm leading-relaxed text-zinc-300">You may not reproduce, distribute, modify, or create derivative works from any content on the platform without our express written permission.</p>
              </section>

              <Separator className="bg-zinc-800" />

              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">6. Transactions and Payments</h2>
                <p className="text-sm leading-relaxed text-zinc-300">All transactions through the platform are subject to the following:</p>
                <ul className="ml-6 space-y-2 text-sm text-zinc-300">
                  <li className="list-disc">Prices are determined by suppliers and may be subject to change</li>
                  <li className="list-disc">Payment terms are agreed upon between stores and suppliers</li>
                  <li className="list-disc">Guri&apos;s Store may charge platform fees or commissions</li>
                  <li className="list-disc">All prices are displayed in Brazilian Real (BRL)</li>
                </ul>
              </section>

              <Separator className="bg-zinc-800" />

              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">7. Limitation of Liability</h2>
                <p className="text-sm leading-relaxed text-zinc-300">To the maximum extent permitted by law, Guri&apos;s Store shall not be liable for:</p>
                <ul className="ml-6 space-y-2 text-sm text-zinc-300">
                  <li className="list-disc">Any indirect, incidental, or consequential damages</li>
                  <li className="list-disc">Loss of profits, data, or business opportunities</li>
                  <li className="list-disc">Disputes between stores and suppliers</li>
                  <li className="list-disc">Product quality, delivery delays, or service issues</li>
                  <li className="list-disc">System downtime or technical failures</li>
                </ul>
                <p className="text-sm leading-relaxed text-zinc-300">The platform is provided &quot;as is&quot; without warranties of any kind, either express or implied.</p>
              </section>

              <Separator className="bg-zinc-800" />

              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">8. Changes to Terms</h2>
                <p className="text-sm leading-relaxed text-zinc-300">
                  We reserve the right to modify these Terms of Service at any time. When we make changes, we will update the &quot;Last updated&quot; date at the top of this page. Continued use of the platform after
                  changes constitutes acceptance of the modified terms.
                </p>
                <p className="text-sm leading-relaxed text-zinc-300">We encourage you to review these terms periodically to stay informed about your rights and responsibilities.</p>
              </section>

              <Separator className="bg-zinc-800" />

              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-white">9. Contact Information</h2>
                <p className="text-sm leading-relaxed text-zinc-300">If you have any questions about these Terms of Service, please contact us:</p>
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
                </div>
              </section>

              <Separator className="bg-zinc-800" />

              <div className="flex justify-center pt-4">
                <Button asChild variant="link" className="gap-2 text-white">
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-zinc-500">
            <p>© 2025 Guri&apos;s Store. All rights reserved.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
