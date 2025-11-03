"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSection } from "@/components/admin/form-section";

export default function NewCampaignPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Campaign created successfully!");
    router.push("/supplier/campaigns");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto max-w-4xl px-6 py-8">
        {/* Header */}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <FormSection title="Basic Information" description="Campaign details">
            <div className="space-y-2">
              <Label htmlFor="nome">Campaign Name</Label>
              <Input id="nome" name="nome" placeholder="e.g., Black Friday 2024" required className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Description</Label>
              <textarea
                id="descricao"
                name="descricao"
                placeholder="Brief campaign description..."
                required
                rows={3}
                className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 transition placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dataInicio">Start Date</Label>
                <Input id="dataInicio" name="dataInicio" type="date" required className="border-zinc-800 bg-zinc-950" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataFim">End Date</Label>
                <Input id="dataFim" name="dataFim" type="date" required className="border-zinc-800 bg-zinc-950" />
              </div>
            </div>
          </FormSection>

          {/* Campaign Conditions */}
          <FormSection title="Campaign Conditions" description="Define minimum requirements and discount">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="valorMinimo">Minimum Order Value (BRL)</Label>
                <Input id="valorMinimo" name="valorMinimo" type="number" step="0.01" min="0" placeholder="0.00" required className="border-zinc-800 bg-zinc-950" />
                <p className="text-xs text-zinc-500">Minimum total value to apply this campaign</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantidadeMinima">Minimum Quantity</Label>
                <Input id="quantidadeMinima" name="quantidadeMinima" type="number" min="1" placeholder="0" required className="border-zinc-800 bg-zinc-950" />
                <p className="text-xs text-zinc-500">Minimum number of items required</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descontoPercentual">Discount Percentage (%)</Label>
              <Input id="descontoPercentual" name="descontoPercentual" type="number" step="0.01" min="0" max="100" placeholder="0.00" required className="border-zinc-800 bg-zinc-950" />
              <p className="text-xs text-zinc-500">Percentage discount to be applied (0-100%)</p>
            </div>
          </FormSection>

          {/* Status */}
          <FormSection title="Status" description="Campaign activation">
            <div className="flex items-center gap-3">
              <input type="checkbox" id="status" name="status" defaultChecked className="h-4 w-4 rounded border-zinc-800 bg-zinc-950 text-primary focus:ring-2 focus:ring-primary/40" />
              <Label htmlFor="status" className="cursor-pointer font-normal">
                Activate campaign immediately
              </Label>
            </div>
            <p className="text-xs text-zinc-500">If unchecked, the campaign will be created but remain inactive</p>
          </FormSection>

          {/* Actions */}
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
