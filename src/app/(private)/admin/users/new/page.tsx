"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSection } from "@/components/admin/form-section";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { adminService } from "@/lib/admin.service";
import type { CreateUserData } from "@/types/user";
import { adminAddressesService } from "@/lib/admin-addresses.service";

export default function NewUserPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);

      const addressData = {
        estado: formData.get("estado") as string,
        cidade: formData.get("cidade") as string,
        bairro: formData.get("bairro") as string,
        rua: formData.get("rua") as string,
        numero: formData.get("numero") as string,
        cep: formData.get("cep") as string,
        complemento: (formData.get("complemento") as string) || null,
      };

      const createdAddress = await adminAddressesService.createAddress(addressData);

      const userData: CreateUserData = {
        nome: formData.get("nome") as string,
        sobrenome: formData.get("sobrenome") as string,
        email: formData.get("email") as string,
        senha: formData.get("senha") as string,
        confirmedPassword: formData.get("confirmedPassword") as string,
        telefone: (formData.get("telefone") as string) || null,
        funcao: formData.get("funcao") as "loja" | "fornecedor" | "admin",
        endereco_id: createdAddress.id,
      };

      await adminService.createUser(userData);
      router.push("/admin/users");
    } catch (err: any) {
      setError(err.response.data.message ? err.response.data.message : "Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8">
          <Button asChild variant="link" className="group mb-4 gap-2 px-0 text-sm text-zinc-300 hover:text-white">
            <Link href="/admin/users">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to users
            </Link>
          </Button>

          <h1 className="text-3xl font-bold tracking-tight text-white">New User</h1>
          <p className="text-sm text-zinc-400">Register a new user in the system.</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection title="Personal Information" description="Basic user details">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome">First Name</Label>
                <Input id="nome" name="nome" placeholder="e.g., João" required className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sobrenome">Last Name</Label>
                <Input id="sobrenome" name="sobrenome" placeholder="e.g., Silva" required className="border-zinc-800 bg-zinc-950" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="user@email.com" required className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Phone</Label>
                <Input id="telefone" name="telefone" type="tel" placeholder="(11) 99999-9999" className="border-zinc-800 bg-zinc-950" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="senha">Password</Label>
                <Input id="senha" name="senha" type="password" placeholder="Minimum 8 characters" required minLength={8} className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="confirmedPassword">Confirm Password</Label>
                  <Input id="confirmedPassword" name="confirmedPassword" type="password" placeholder="Minimum 8 characters" required minLength={8} className="border-zinc-800 bg-zinc-950" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="funcao">Role</Label>
              <select
                id="funcao"
                name="funcao"
                required
                className="h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-200 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40">
                <option value="">Select a role</option>
                <option value="loja">Store (Loja)</option>
                <option value="fornecedor">Supplier (Fornecedor)</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </FormSection>

          <FormSection title="Address" description="User location details">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cep">ZIP Code</Label>
                <Input id="cep" name="cep" placeholder="00000000" required maxLength={8} className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">State</Label>
                <select
                  id="estado"
                  name="estado"
                  required
                  className="h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-200 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40">
                  <option value="">Select</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cidade">City</Label>
                <Input id="cidade" name="cidade" placeholder="e.g., São Paulo" required className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bairro">Neighborhood</Label>
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
              <Input id="complemento" name="complemento" placeholder="e.g., Apt 5" className="border-zinc-800 bg-zinc-950" />
            </div>
          </FormSection>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="default" onClick={() => router.push("/admin/users")} className="text-zinc-300 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create User"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
