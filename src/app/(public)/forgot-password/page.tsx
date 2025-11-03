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
import { authService } from "@/lib/auth";

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
      // Enviar email de recuperação usando o serviço
      await authService.forgotPassword({ email });

      // Mostrar mensagem de sucesso
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
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Link href="/" className="inline-flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-800 bg-black shadow-lg transition-transform hover:scale-105">
              <SiWolframlanguage size={36} className="text-white" />
            </Link>
          </div>

          {/* Forgot Password Card */}
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
                    <Link href="/login">
                      <Button variant="outline" className="gap-2 border-zinc-800 bg-zinc-900 hover:bg-zinc-800">
                        <ArrowLeft className="h-4 w-4" />
                        Back to login
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Error Alert */}
                  {error && (
                    <Alert variant="destructive" className="border-red-900 bg-red-950/50">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Email Field */}
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

                  {/* Submit Button */}
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

                  {/* Back to Login */}
                  <div className="text-center">
                    <Link href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white">
                      <ArrowLeft className="h-4 w-4" />
                      Back to login
                    </Link>
                  </div>
                </form>
              )}
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
