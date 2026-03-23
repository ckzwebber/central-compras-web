"use client";

import { useEffect, useMemo, useState } from "react";
import { Info, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const firstVisitStorageKey = "demo_credentials_seen_v1";

export function DemoCredentials() {
  const [open, setOpen] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const accounts = useMemo(() => {
    return [
      {
        label: "Admin",
        email: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL || "admin@demo.com",
        senha: process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD || "demo1234",
      },
      {
        label: "Supplier",
        email: process.env.NEXT_PUBLIC_DEMO_SUPPLIER_EMAIL || "fornecedor@demo.com",
        senha: process.env.NEXT_PUBLIC_DEMO_SUPPLIER_PASSWORD || "demo1234",
      },
      {
        label: "Store User",
        email: process.env.NEXT_PUBLIC_DEMO_USER_EMAIL || "usuario@demo.com",
        senha: process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD || "demo1234",
      },
    ];
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = window.localStorage.getItem(firstVisitStorageKey);
    if (!seen) {
      setOpen(true);
      window.localStorage.setItem(firstVisitStorageKey, "true");
    }
  }, []);

  const handleCopy = async (value, fieldKey) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldKey);
      setTimeout(() => setCopiedField(null), 1500);
    } catch (_error) {
      // Clipboard is optional for demo convenience.
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 border border-zinc-700 bg-zinc-900 text-zinc-100 shadow-lg hover:bg-zinc-800"
        variant="outline">
        <Info className="mr-2 h-4 w-4" />
        Demo Accounts
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-100 sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Demo Environment</DialogTitle>
            <DialogDescription className="text-zinc-400">
              This is an academic project running in demo mode. Use the credentials below to explore all three roles.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {accounts.map((account) => (
              <div key={account.label} className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-4">
                <div className="mb-2 text-sm font-semibold text-zinc-200">{account.label}</div>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-center justify-between rounded bg-zinc-900 px-3 py-2">
                    <span className="text-zinc-300">{account.email}</span>
                    <Button
                      type="button"
                      size="sm"
                      variant="default"
                      onClick={() => handleCopy(account.email, `${account.label}-email`)}
                      className="h-7 px-2 text-zinc-400 hover:text-zinc-100">
                      {copiedField === `${account.label}-email` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded bg-zinc-900 px-3 py-2">
                    <span className="text-zinc-300">{account.senha}</span>
                    <Button
                      type="button"
                      size="sm"
                      variant="default"
                      onClick={() => handleCopy(account.senha, `${account.label}-senha`)}
                      className="h-7 px-2 text-zinc-400 hover:text-zinc-100">
                      {copiedField === `${account.label}-senha` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="button" onClick={() => setOpen(false)}>
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
