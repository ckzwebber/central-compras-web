"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSection } from "@/components/admin/form-section";
import { Alert, AlertDescription } from "@/components/ui/alert";
import * as adminSuppliersService from "@/lib/admin-suppliers.service";
import * as adminService from "@/lib/admin.service";
import { CreateFornecedorData } from "@/types/fornecedor";
import { User } from "@/types/user";

export default function NewSupplierPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const data = await adminService.adminService.getAllUsers();
      const supplierUsers = data.data.filter((user: any) => user.funcao === "fornecedor");
      setUsers(supplierUsers);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const selectedUserId = formData.get("usuario_id") as string;

      const supplierData: CreateFornecedorData = {
        razao_social: formData.get("razaoSocial") as string,
        nome_fantasia: formData.get("nomeFantasia") as string,
        cnpj: formData.get("cnpj") as string,
        descricao: (formData.get("descricao") as string) || undefined,
        usuario_id: selectedUserId || undefined,
      };

      await adminSuppliersService.adminSuppliersService.createSupplier(supplierData);
      router.push("/admin/suppliers");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create supplier");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingUsers) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="container mx-auto max-w-4xl px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">New Supplier</h1>
            <p className="text-sm text-zinc-400">Register a new supplier in the system.</p>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8">
          <Button asChild variant="link" className="group mb-4 gap-2 px-0 text-sm text-zinc-300 hover:text-white">
            <Link href="/admin/suppliers">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to suppliers
            </Link>
          </Button>

          <h1 className="text-3xl font-bold tracking-tight text-white">New Supplier</h1>
          <p className="text-sm text-zinc-400">Register a new supplier in the system.</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection title="Company Information" description="Basic data for supplier identification">
            <div className="space-y-2">
              <Label htmlFor="razaoSocial">Company Name (Razão Social)</Label>
              <Input id="razaoSocial" name="razaoSocial" placeholder="e.g., ABC Distribuidora Ltda" className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nomeFantasia">Trade Name (Nome Fantasia)</Label>
              <Input id="nomeFantasia" name="nomeFantasia" placeholder="e.g., ABC Distribuidora" className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" name="cnpj" placeholder="00.000.000/0000-00" required className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="usuario_id">Associated User (optional)</Label>
                <select
                  id="usuario_id"
                  name="usuario_id"
                  className="h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-200 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40">
                  <option value="">No user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.nome} {user.sobrenome} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Description (optional)</Label>
              <textarea
                id="descricao"
                name="descricao"
                placeholder="Brief supplier description..."
                rows={3}
                className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 transition placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </FormSection>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="default" onClick={() => router.push("/admin/suppliers")} className="text-zinc-300 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register Supplier"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
