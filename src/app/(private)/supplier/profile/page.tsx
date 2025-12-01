"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, AlertCircle } from "lucide-react";
import { supplierService, type SupplierProfile } from "@/lib/supplier.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSection } from "@/components/admin/form-section";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SupplierProfilePage() {
  const [profile, setProfile] = useState<SupplierProfile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await supplierService.getProfile();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData(e.currentTarget);

      const updateData = {
        razao_social: formData.get("razaoSocial") as string,
        nome_fantasia: formData.get("nomeFantasia") as string,
        descricao: formData.get("descricao") as string,
      };

      await supplierService.updateProfile(updateData);
      setSuccess(true);
      await fetchProfile();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto max-w-4xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Profile</h1>
            <p className="text-sm text-zinc-400">Manage your company information</p>
          </div>
        </div>

        {/* Success Alert */}
        {success && (
          <Alert className="mb-6 border-green-800 bg-green-950/20">
            <AlertDescription className="text-green-400">Profile updated successfully!</AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-red-800 bg-red-950/20">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <FormSection title="Company Information" description="Basic company data">
            <div className="space-y-2">
              <Label htmlFor="razaoSocial">Company Name</Label>
              <Input id="razaoSocial" name="razaoSocial" defaultValue={profile?.razao_social} required className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nomeFantasia">Trade Name</Label>
              <Input id="nomeFantasia" name="nomeFantasia" defaultValue={profile?.nome_fantasia} required className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input id="cnpj" name="cnpj" defaultValue={profile?.cnpj} disabled className="border-zinc-800 bg-zinc-900 text-zinc-500" />
              <p className="text-xs text-zinc-500">CNPJ cannot be changed. Contact support if needed.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Description</Label>
              <textarea
                id="descricao"
                name="descricao"
                placeholder="Brief company description..."
                defaultValue={profile?.descricao || ""}
                rows={3}
                className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 transition placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </FormSection>

          {/* Actions */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
