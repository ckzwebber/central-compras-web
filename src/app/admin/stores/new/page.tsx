"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Copy, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSection } from "@/components/admin/form-section";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CredentialsDialog {
  open: boolean;
  email: string;
  password: string;
}

export default function NewStorePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [credentialsDialog, setCredentialsDialog] = useState<CredentialsDialog>({
    open: false,
    email: "",
    password: "",
  });
  const [copied, setCopied] = useState<"email" | "password" | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock generated credentials
    const generatedEmail = "store" + Math.floor(Math.random() * 10000) + "@guristore.com";
    const generatedPassword = Math.random().toString(36).slice(-8);

    setCredentialsDialog({
      open: true,
      email: generatedEmail,
      password: generatedPassword,
    });

    setIsSubmitting(false);
  };

  const copyToClipboard = (text: string, type: "email" | "password") => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCloseDialog = () => {
    setCredentialsDialog({ open: false, email: "", password: "" });
    router.push("/admin/stores");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8">
          <Button asChild variant="link" className="group mb-4 gap-2 px-0 text-sm text-zinc-300 hover:text-white">
            <Link href="/admin/stores">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to stores
            </Link>
          </Button>

          <h1 className="text-3xl font-bold tracking-tight text-white">New Store</h1>
          <p className="text-sm text-zinc-400">Register a new store in the system. Credentials will be generated automatically.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection title="Store Information" description="Basic data for store identification">
            <div className="space-y-2">
              <Label htmlFor="name">Store Name</Label>
              <Input id="name" name="name" placeholder="e.g., Center Supermarket" required className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input id="cnpj" name="cnpj" placeholder="00.000.000/0000-00" required className="border-zinc-800 bg-zinc-950" />
            </div>
          </FormSection>

          <FormSection title="Address" description="Store location">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="zipcode">ZIP Code</Label>
                <Input id="zipcode" name="zipcode" placeholder="00000-000" required className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <select
                  id="state"
                  name="state"
                  required
                  className="h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-200 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40">
                  <option value="">Select</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  {/* Add more states */}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" placeholder="e.g., São Paulo" required className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="neighborhood">Neighborhood</Label>
                <Input id="neighborhood" name="neighborhood" placeholder="e.g., Downtown" required className="border-zinc-800 bg-zinc-950" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <div className="space-y-2">
                <Label htmlFor="street">Street</Label>
                <Input id="street" name="street" placeholder="e.g., Flores Street" required className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Number</Label>
                <Input id="number" name="number" placeholder="123" required className="w-24 border-zinc-800 bg-zinc-950" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="complement">Complement (optional)</Label>
              <Input id="complement" name="complement" placeholder="e.g., Suite 5" className="border-zinc-800 bg-zinc-950" />
            </div>
          </FormSection>

          {/* Manager */}
          <FormSection title="Manager" description="Store manager details">
            <div className="space-y-2">
              <Label htmlFor="manager_name">Full Name</Label>
              <Input id="manager_name" name="manager_name" placeholder="e.g., João Silva" required className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="manager_email">Email</Label>
                <Input id="manager_email" name="manager_email" type="email" placeholder="joao@email.com" required className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager_phone">Phone</Label>
                <Input id="manager_phone" name="manager_phone" type="tel" placeholder="(11) 99999-9999" required className="border-zinc-800 bg-zinc-950" />
              </div>
            </div>
          </FormSection>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => router.push("/admin/stores")} className="text-zinc-300 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register Store"}
            </Button>
          </div>
        </form>
      </div>

      {/* Credentials Dialog */}
      <Dialog open={credentialsDialog.open} onOpenChange={handleCloseDialog}>
        <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-100">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              Store Registered Successfully!
            </DialogTitle>
            <DialogDescription className="text-zinc-400">Access credentials have been generated. Copy and send them to the manager.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">Access Email</Label>
              <div className="flex gap-2">
                <Input readOnly value={credentialsDialog.email} className="border-zinc-800 bg-zinc-900 text-white" />
                <Button type="button" variant="default" size="icon" className="border-zinc-800" onClick={() => copyToClipboard(credentialsDialog.email, "email")}>
                  {copied === "email" ? <CheckCircle2 className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-300">Temporary Password</Label>
              <div className="flex gap-2">
                <Input readOnly value={credentialsDialog.password} className="border-zinc-800 bg-zinc-900 font-mono text-white" />
                <Button type="button" variant="default" size="icon" className="border-zinc-800" onClick={() => copyToClipboard(credentialsDialog.password, "password")}>
                  {copied === "password" ? <CheckCircle2 className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <p className="text-sm text-zinc-400">⚠️ Important: Send these credentials to the manager. The password must be changed on first access.</p>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleCloseDialog} className="w-full">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
