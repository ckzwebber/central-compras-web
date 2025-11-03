"use client";

import Link from "next/link";
import { SiWolframlanguage } from "react-icons/si";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Link href="/" className="inline-flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-800 bg-black shadow-lg transition-transform hover:scale-105">
              <SiWolframlanguage size={36} className="text-white" />
            </Link>
          </div>

          {/* Contact Card */}
          <Card className="border-zinc-800 bg-zinc-950/80 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-white">Request Access</CardTitle>
              <CardDescription className="text-zinc-400">Get in touch with our team to request access to the platform</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white">Contact Information</h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                    <Mail className="h-5 w-5 text-zinc-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Email</p>
                      <a href="mailto:support@guristore.com" className="text-sm text-zinc-400 hover:text-white hover:underline">
                        support@guristore.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                    <Phone className="h-5 w-5 text-zinc-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Phone</p>
                      <a href="tel:+551112345678" className="text-sm text-zinc-400 hover:text-white hover:underline">
                        +55 (11) 1234-5678
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                    <MapPin className="h-5 w-5 text-zinc-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Address</p>
                      <p className="text-sm text-zinc-400">
                        Rua Manoel Agostinho da Silva, 130 - Santa Augusta
                        <br />
                        Criciúma, SC - 88805-410
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-zinc-800" />

              {/* User Types */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white">Who can access the platform?</h3>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4 text-center">
                    <div className="mb-2 inline-flex rounded-full bg-purple-500/10 px-3 py-1">
                      <span className="text-xs font-medium text-purple-400">Admin</span>
                    </div>
                    <p className="text-xs text-zinc-400">Platform administrators</p>
                  </div>

                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4 text-center">
                    <div className="mb-2 inline-flex rounded-full bg-green-500/10 px-3 py-1">
                      <span className="text-xs font-medium text-green-400">Supplier</span>
                    </div>
                    <p className="text-xs text-zinc-400">Product suppliers</p>
                  </div>

                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4 text-center">
                    <div className="mb-2 inline-flex rounded-full bg-blue-500/10 px-3 py-1">
                      <span className="text-xs font-medium text-blue-400">Store</span>
                    </div>
                    <p className="text-xs text-zinc-400">Partner stores</p>
                  </div>
                </div>
              </div>

              <Separator className="bg-zinc-800" />

              {/* Instructions */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4">
                <p className="text-sm text-zinc-300">
                  <strong className="text-white">To request access:</strong>
                  <br />
                  Send an email to{" "}
                  <a href="mailto:support@guristore.com" className="text-white underline hover:text-zinc-300">
                    support@guristore.com
                  </a>{" "}
                  with the following information:
                </p>
                <ul className="mt-3 space-y-1 text-sm text-zinc-400">
                  <li>• Company name</li>
                  <li>• CNPJ (for Brazilian companies)</li>
                  <li>• Contact person name and position</li>
                  <li>• Phone number and email</li>
                  <li>• Account type (Admin, Supplier, or Store)</li>
                </ul>
              </div>

              {/* Back to Login */}
              <div className="text-center">
                <Link href="/login">
                  <Button variant="default" className="gap-2 border-zinc-800 bg-zinc-900 hover:bg-zinc-800">
                    <ArrowLeft className="h-4 w-4" />
                    Back to login
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
