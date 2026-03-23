"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { SiWolframlanguage } from "react-icons/si";
import { ArrowLeft, Home, AlertTriangle, ServerCrash, RefreshCw, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ErrorConfig {
  code: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
}

const errorConfigs: Record<string, ErrorConfig> = {
  "404": {
    code: "404",
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist or has been moved",
    icon: <SearchX className="h-10 w-10" />,
    iconBg: "bg-yellow-500/10",
    iconBorder: "border-yellow-500/20",
    iconColor: "text-yellow-400",
  },
  "500": {
    code: "500",
    title: "Internal Server Error",
    description: "Something went wrong on our end. We're working to fix it.",
    icon: <ServerCrash className="h-10 w-10" />,
    iconBg: "bg-red-500/10",
    iconBorder: "border-red-500/20",
    iconColor: "text-red-400",
  },
  "403": {
    code: "403",
    title: "Access Denied",
    description: "You don't have permission to access this page",
    icon: <AlertTriangle className="h-10 w-10" />,
    iconBg: "bg-orange-500/10",
    iconBorder: "border-orange-500/20",
    iconColor: "text-orange-400",
  },
  default: {
    code: "Error",
    title: "Something Went Wrong",
    description: "An unexpected error occurred. Please try again.",
    icon: <AlertTriangle className="h-10 w-10" />,
    iconBg: "bg-zinc-500/10",
    iconBorder: "border-zinc-500/20",
    iconColor: "text-zinc-400",
  },
};

function ErrorPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusCode = searchParams.get("code") || "default";

  const config = errorConfigs[statusCode] || errorConfigs.default;

  const handleTryAgain = () => {
    router.refresh();
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

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
                <div className={`inline-flex h-20 w-20 items-center justify-center rounded-full border ${config.iconBg} ${config.iconBorder}`}>
                  <div className={config.iconColor}>{config.icon}</div>
                </div>
              </div>

              <div className="space-y-1">
                {config.code !== "Error" && <div className="text-6xl font-bold text-white">{config.code}</div>}
                <CardTitle className="text-2xl font-bold text-white">{config.title}</CardTitle>
                <CardDescription className="text-zinc-400">{config.description}</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <Separator className="bg-zinc-800" />

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <p className="text-sm text-zinc-300">
                  {statusCode === "404" && <>If you typed the URL directly, please check the spelling. If you clicked a link, it may be outdated or broken.</>}
                  {statusCode === "500" && <>This error has been logged and our team has been notified. We apologize for the inconvenience and are working to resolve it.</>}
                  {statusCode === "403" && <>This page is restricted. If you believe you should have access, please contact your administrator or try logging in.</>}
                  {!["404", "500", "403"].includes(statusCode) && <>Please try refreshing the page or return to the home page. If the problem persists, contact our support team.</>}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {statusCode !== "404" && (
                  <Button onClick={handleTryAgain} className="flex-1 gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </Button>
                )}
                <Button asChild variant="link" className={`gap-2 ${statusCode !== "404" ? "flex-1" : "w-full"}`}>
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>

              {statusCode !== "404" && (
                <Button variant="outline" onClick={handleGoBack} className="w-full gap-2 border-zinc-800 bg-zinc-900 hover:bg-zinc-800">
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </Button>
              )}

              <Separator className="bg-zinc-800" />

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
            <p>© 2025 Guri&apos;s Store. All rights reserved.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-zinc-950" />}>
      <ErrorPageContent />
    </Suspense>
  );
}
