"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSection } from "@/components/admin/form-section";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supplierService } from "@/lib/supplier.service";

export default function NewCampaignPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);

      const campaignData = {
        nome: formData.get("nome") as string,
        descricao: formData.get("descricao") as string,
        valor_min: parseFloat(formData.get("valorMinimo") as string) || undefined,
        quantidade_min: parseInt(formData.get("quantidadeMinima") as string) || undefined,
        desconto_porcentagem: parseFloat(formData.get("descontoPercentual") as string),
      };

      await supplierService.createCampaign(campaignData);
      router.push("/supplier/campaigns");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create campaign");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8">
          <Button asChild variant="link" className="group mb-4 gap-2 px-0 text-sm text-zinc-300 hover:text-white">
            <Link href="/supplier/campaigns">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to campaigns
            </Link>
          </Button>

          <h1 className="text-3xl font-bold tracking-tight text-white">New Campaign</h1>
          <p className="text-sm text-zinc-400">Create a new promotional campaign for your products.</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection title="Basic Information" description="Campaign details">
            <div className="space-y-2">
              <Label htmlFor="nome">Campaign Name</Label>
              <Input id="nome" name="nome" placeholder="e.g., Black Friday 2025" required className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Description</Label>
              <textarea
                id="descricao"
                name="descricao"
                placeholder="Brief campaign description... (10 characters minimum)"
                rows={3}
                minLength={10}
                className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 transition placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </FormSection>

          <FormSection title="Campaign Conditions" description="Define minimum requirements and discount">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="valorMinimo">Minimum Order Value (BRL)</Label>
                <Input id="valorMinimo" name="valorMinimo" type="number" step="0.01" min="0" placeholder="0.00" className="border-zinc-800 bg-zinc-950" />
                <p className="text-xs text-zinc-500">Minimum total value to apply this campaign (optional)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantidadeMinima">Minimum Quantity</Label>
                <Input id="quantidadeMinima" name="quantidadeMinima" type="number" min="1" placeholder="0" className="border-zinc-800 bg-zinc-950" />
                <p className="text-xs text-zinc-500">Minimum number of items required (optional)</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descontoPercentual">Discount Percentage (%)</Label>
              <Input id="descontoPercentual" name="descontoPercentual" type="number" step="0.01" min="0" max="100" placeholder="0.00" required className="border-zinc-800 bg-zinc-950" />
              <p className="text-xs text-zinc-500">Percentage discount to be applied (0-100%)</p>
            </div>
          </FormSection>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="default" onClick={() => router.push("/supplier/campaigns")} className="text-zinc-300 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Campaign"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
