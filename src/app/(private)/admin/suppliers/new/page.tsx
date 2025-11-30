"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Copy, CheckCircle2, Mail } from "lucide-react";
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

export default function NewSupplierPage() {
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
    const generatedEmail = "supplier" + Math.floor(Math.random() * 10000) + "@guristore.com";
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

  const handleSendEmail = () => {
    // TODO: Implement email sending
  };

  const handleCloseDialog = () => {
    setCredentialsDialog({ open: false, email: "", password: "" });
    router.push("/admin/suppliers");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto max-w-4xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="link" className="group mb-4 gap-2 px-0 text-sm text-zinc-300 hover:text-white">
            <Link href="/admin/suppliers">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to suppliers
            </Link>
          </Button>

          <h1 className="text-3xl font-bold tracking-tight text-white">New Supplier</h1>
          <p className="text-sm text-zinc-400">Register a new supplier in the system. Credentials will be generated automatically.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <FormSection title="Company Information" description="Basic data for supplier identification">
            <div className="space-y-2">
              <Label htmlFor="razaoSocial">Company Name</Label>
              <Input id="razaoSocial" name="razaoSocial" placeholder="e.g., ABC Distribuidora Ltda" required className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nomeFantasia">Trade Name</Label>
              <Input id="nomeFantasia" name="nomeFantasia" placeholder="e.g., ABC Distribuidora" required className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input id="cnpj" name="cnpj" placeholder="00.000.000/0000-00" required className="border-zinc-800 bg-zinc-950" />
            </div>
          </FormSection>

          {/* Contact Information */}
          <FormSection title="Contact" description="Supplier contact information">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="contact@supplier.com" required className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Phone</Label>
                <Input id="telefone" name="telefone" type="tel" placeholder="(11) 99999-9999" required className="border-zinc-800 bg-zinc-950" />
              </div>
            </div>
          </FormSection>

          {/* Address */}
          <FormSection title="Address" description="Supplier location">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cep">ZIP Code</Label>
                <Input id="cep" name="cep" placeholder="00000-000" required className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">State</Label>
                <select
                  id="estado"
                  name="estado"
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
                <Label htmlFor="cidade">City</Label>
                <Input id="cidade" name="cidade" placeholder="e.g., São Paulo" required className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bairro">District</Label>
                <Input id="bairro" name="bairro" placeholder="e.g., Centro" required className="border-zinc-800 bg-zinc-950" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <div className="space-y-2">
                <Label htmlFor="rua">Street</Label>
                <Input id="rua" name="rua" placeholder="e.g., Rua das Flores" required className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero">Number</Label>
                <Input id="numero" name="numero" placeholder="123" required className="w-24 border-zinc-800 bg-zinc-950" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="complemento">Complement (optional)</Label>
              <Input id="complemento" name="complemento" placeholder="e.g., Building A" className="border-zinc-800 bg-zinc-950" />
            </div>
          </FormSection>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="default" onClick={() => router.push("/admin/suppliers")} className="text-zinc-300 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register Supplier"}
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
              Supplier Registered Successfully!
            </DialogTitle>
            <DialogDescription className="text-zinc-400">Access credentials have been generated. Copy and send to the supplier.</DialogDescription>
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
              <p className="text-sm text-zinc-400">⚠️ Important: Send these credentials to the supplier. The password must be changed on first access.</p>
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
