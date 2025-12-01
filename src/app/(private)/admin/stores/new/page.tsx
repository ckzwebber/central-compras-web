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
import * as adminStoresService from "@/lib/admin-stores.service";
import * as adminService from "@/lib/admin.service";

export default function NewStorePage() {
  const router = useRouter();
  const [users, setUsers] = useState<adminService.User[]>([]);
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
      // Filter to only users with role "loja" (store)
      const storeUsers = data.data.filter((user: any) => user.funcao === "loja");
      setUsers(storeUsers);
    } catch (err) {
      setError("Failed to load users");
      console.log(err);
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

      // Find selected user to get their endereco_id
      const selectedUser = users.find((u) => u.id === selectedUserId);
      if (!selectedUser) {
        throw new Error("Selected user not found");
      }

      if (!selectedUser.endereco_id) {
        throw new Error("Selected user must have an address registered");
      }

      // Create store with same endereco_id as the user
      const storeData: adminStoresService.CreateStoreData = {
        nome: formData.get("name") as string,
        cnpj: formData.get("cnpj") as string,
        usuario_id: selectedUserId,
        endereco_id: selectedUser.endereco_id,
      };

      await adminStoresService.adminStoresService.createStore(storeData);
      router.push("/admin/stores");
    } catch (err: any) {
      setError(err.response.data.message ? err.response.data.message : "Failed to create store");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingUsers) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="container mx-auto max-w-4xl px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">New Store</h1>
            <p className="text-sm text-zinc-400">Register a new store in the system.</p>
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
            <Link href="/admin/stores">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to stores
            </Link>
          </Button>

          <h1 className="text-3xl font-bold tracking-tight text-white">New Store</h1>
          <p className="text-sm text-zinc-400">Register a new store in the system.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection title="Store Information" description="Basic data for store identification">
            <div className="space-y-2">
              <Label htmlFor="name">Store Name</Label>
              <Input id="name" name="name" placeholder="e.g., Center Supermarket" required className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" name="cnpj" placeholder="00.000.000/0000-00" required className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="usuario_id">Store Owner (User)</Label>
                <select
                  id="usuario_id"
                  name="usuario_id"
                  required
                  className="h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-200 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40">
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.nome} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </FormSection>{" "}
          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="default" onClick={() => router.push("/admin/stores")} className="text-zinc-300 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register Store"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
