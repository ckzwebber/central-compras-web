"use client";

import Link from "next/link";
import { SiWolframlanguage } from "react-icons/si";
import { ArrowLeft, Home, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Link href="/" className="inline-flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-800 bg-black shadow-lg transition-transform hover:scale-105">
              <SiWolframlanguage size={36} className="text-white" />
            </Link>
          </div>

          {/* Error Card */}
          <Card className="border-zinc-800 bg-zinc-950/80 shadow-xl">
            <CardHeader className="space-y-4 text-center">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/20">
                  <SearchX className="h-10 w-10 text-yellow-400" />
                </div>
              </div>

              {/* Error Code */}
              <div className="space-y-1">
                <div className="text-6xl font-bold text-white">404</div>
                <CardTitle className="text-2xl font-bold text-white">Page Not Found</CardTitle>
                <CardDescription className="text-zinc-400">The page you&apos;re looking for doesn&apos;t exist or has been moved</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <Separator className="bg-zinc-800" />

              {/* Helpful Message */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <p className="text-sm text-zinc-300">If you typed the URL directly, please check the spelling. If you clicked a link, it may be outdated or broken.</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/" className="flex-1">
                  <Button className="w-full gap-2">
                    <Home className="h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
                <Button variant="default" onClick={() => window.history.back()} className="flex-1 gap-2 border-zinc-800 bg-zinc-900 hover:bg-zinc-800">
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </Button>
              </div>

              <Separator className="bg-zinc-800" />

              {/* Help Links */}
              <div className="text-center text-sm text-zinc-400">
                <p className="mb-2">Need help?</p>
                <div className="flex justify-center gap-4">
                  <Link href="/contact" className="hover:text-white hover:underline">
                    Contact Support
                  </Link>
                  <span className="text-zinc-700">•</span>
                  <Link href="/" className="hover:text-white hover:underline">
                    Browse Products
                  </Link>
                </div>
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
