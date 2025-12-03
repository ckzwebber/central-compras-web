"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { SiWolframlanguage } from "react-icons/si";
import { AlertCircle, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { authService } from "@/lib/auth.service";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      await authService.forgotPassword({ email });

      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send recovery email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <Link href="/" className="inline-flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-800 bg-black shadow-lg transition-transform hover:scale-105">
              <SiWolframlanguage size={36} className="text-white" />
            </Link>
          </div>

          <Card className="border-zinc-800 bg-zinc-950/80 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-white">Reset your password</CardTitle>
              <CardDescription className="text-zinc-400">Enter your email and we&apos;ll send you a link to reset your password</CardDescription>
            </CardHeader>

            <CardContent>
              {success ? (
                <div className="space-y-6">
                  <Alert className="border-green-900 bg-green-950/50">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <AlertDescription className="text-green-300">Password recovery email sent successfully! Check your inbox.</AlertDescription>
                  </Alert>

                  <div className="text-center">
                    <Button asChild variant="link" className="gap-2 text-white">
                      <Link href="/login">
                        <ArrowLeft className="h-4 w-4" />
                        Back to login
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <Alert variant="destructive" className="border-red-900 bg-red-950/50">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-zinc-300">
                      Email address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus:border-zinc-700 focus:ring-zinc-700"
                      required
                      aria-label="Email address"
                    />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full gap-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send recovery email"
                    )}
                  </Button>

                  <div className="text-center">
                    <Button asChild variant="link" className="gap-2 text-white">
                      <Link href="/login">
                        <ArrowLeft className="h-4 w-4" />
                        Back to login
                      </Link>
                    </Button>
                  </div>
                </form>
              )}
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
