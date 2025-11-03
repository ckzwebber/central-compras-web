"use client";

import { useState } from "react";
import { Save, Key } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSection } from "@/components/admin/form-section";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const mockStoreData = {
  nomeFantasia: "Store Example",
  razaoSocial: "Store Example Ltda",
  cnpj: "12.345.678/0001-90",
  email: "contact@storeexample.com",
  telefone: "(11) 98765-4321",
  endereco: {
    cep: "01310-100",
    estado: "SP",
    cidade: "São Paulo",
    bairro: "Centro",
    rua: "Avenida Paulista",
    numero: "1578",
    complemento: "Suite 200",
  },
};

export default function StoreProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Profile updated successfully!");
    alert("Profile updated successfully!");
    setIsSubmitting(false);
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsChangingPassword(true);

    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      setIsChangingPassword(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Password changed successfully!");
    alert("Password changed successfully!");
    setIsChangingPassword(false);
    setIsPasswordDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto max-w-4xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Profile</h1>
            <p className="text-sm text-zinc-400">Manage your store information</p>
          </div>
          <Button onClick={() => setIsPasswordDialogOpen(true)} variant="outline" className="border-zinc-800 sm:w-auto text-black">
            <Key className="mr-2 h-4 w-4" />
            Change Password
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Store Information */}
          <FormSection title="Store Information" description="Basic store data">
            <div className="space-y-2">
              <Label htmlFor="razaoSocial">Company Name</Label>
              <Input id="razaoSocial" name="razaoSocial" defaultValue={mockStoreData.razaoSocial} required className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nomeFantasia">Trade Name</Label>
              <Input id="nomeFantasia" name="nomeFantasia" defaultValue={mockStoreData.nomeFantasia} required className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input id="cnpj" name="cnpj" defaultValue={mockStoreData.cnpj} disabled className="border-zinc-800 bg-zinc-900 text-zinc-500" />
              <p className="text-xs text-zinc-500">CNPJ cannot be changed. Contact support if needed.</p>
            </div>
          </FormSection>

          {/* Contact Information */}
          <FormSection title="Contact" description="Contact information">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={mockStoreData.email} required className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Phone</Label>
                <Input id="telefone" name="telefone" type="tel" defaultValue={mockStoreData.telefone} required className="border-zinc-800 bg-zinc-950" />
              </div>
            </div>
          </FormSection>

          {/* Address */}
          <FormSection title="Address" description="Store location">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cep">ZIP Code</Label>
                <Input id="cep" name="cep" defaultValue={mockStoreData.endereco.cep} required className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">State</Label>
                <select
                  id="estado"
                  name="estado"
                  required
                  defaultValue={mockStoreData.endereco.estado}
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
                <Input id="cidade" name="cidade" defaultValue={mockStoreData.endereco.cidade} required className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bairro">District</Label>
                <Input id="bairro" name="bairro" defaultValue={mockStoreData.endereco.bairro} required className="border-zinc-800 bg-zinc-950" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <div className="space-y-2">
                <Label htmlFor="rua">Street</Label>
                <Input id="rua" name="rua" defaultValue={mockStoreData.endereco.rua} required className="border-zinc-800 bg-zinc-950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero">Number</Label>
                <Input id="numero" name="numero" defaultValue={mockStoreData.endereco.numero} required className="w-24 border-zinc-800 bg-zinc-950" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="complemento">Complement (optional)</Label>
              <Input id="complemento" name="complemento" defaultValue={mockStoreData.endereco.complemento} className="border-zinc-800 bg-zinc-950" />
            </div>
          </FormSection>

          {/* Actions */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-100">
          <DialogHeader>
            <DialogTitle className="text-white">Change Password</DialogTitle>
            <DialogDescription className="text-zinc-400">Enter your current password and choose a new one</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" name="currentPassword" type="password" required className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" name="newPassword" type="password" required minLength={8} className="border-zinc-800 bg-zinc-950" />
              <p className="text-xs text-zinc-500">Minimum 8 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} className="border-zinc-800 bg-zinc-950" />
            </div>

            <DialogFooter>
              <Button type="button" variant="default" onClick={() => setIsPasswordDialogOpen(false)} className="text-zinc-300 hover:text-white">
                Cancel
              </Button>
              <Button type="submit" disabled={isChangingPassword}>
                {isChangingPassword ? "Changing..." : "Change Password"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
