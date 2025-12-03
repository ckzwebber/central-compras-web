"use client";

import { useEffect } from "react";
import Link from "next/link";
import { SiWolframlanguage } from "react-icons/si";
import { ArrowLeft, Home, AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Error occurred:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="mb-8 flex justify-center">
            <Link href="/" className="inline-flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-800 bg-black shadow-lg transition-transform hover:scale-105">
              <SiWolframlanguage size={36} className="text-white" />
            </Link>
          </div>

          <Card className="border-zinc-800 bg-zinc-950/80 shadow-xl">
            <CardHeader className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
                  <AlertTriangle className="h-10 w-10 text-red-400" />
                </div>
              </div>

              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold text-white">Something Went Wrong</CardTitle>
                <CardDescription className="text-zinc-400">An unexpected error occurred. We&apos;re sorry for the inconvenience.</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <Separator className="bg-zinc-800" />

              {error.message && (
                <Alert variant="destructive" className="border-red-900 bg-red-950/50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-red-300">{error.message}</AlertDescription>
                </Alert>
              )}

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <p className="text-sm text-zinc-300">This error has been logged and our team has been notified. Please try again or return to the home page.</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={reset} className="flex-1 gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button asChild variant="default" className="flex-1 gap-2">
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>

              <Separator className="bg-zinc-800" />

              {error.digest && (
                <div className="text-center">
                  <p className="text-xs text-zinc-500">
                    Error ID: <span className="font-mono text-zinc-400">{error.digest}</span>
                  </p>
                </div>
              )}

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

          <div className="mt-8 text-center text-sm text-zinc-500">
            <p>© 2024 Guri&apos;s Store. All rights reserved.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
