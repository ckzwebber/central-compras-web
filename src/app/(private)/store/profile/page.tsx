"use client";

import { useState } from "react";
import { Save, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function StoreProfilePage() {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    nomeFantasia: "Store Example",
    cnpj: "12.345.678/0001-90",
    responsavel: "John Doe",
    telefone: "(11) 98765-4321",
    email: "contact@storeexample.com",
  });

  // Address state
  const [address, setAddress] = useState({
    cep: "01310-100",
    estado: "SP",
    cidade: "São Paulo",
    bairro: "Centro",
    rua: "Avenida Paulista",
    numero: "1578",
    complemento: "Suite 200",
  });

  // Password state
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Profile data:", profile);
    alert("Profile updated successfully!");
    setIsSavingProfile(false);
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAddress(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Address data:", address);
    alert("Address updated successfully!");
    setIsSavingAddress(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setIsChangingPassword(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Password changed");
    alert("Password changed successfully!");
    setIsChangingPassword(false);
    setShowPasswordDialog(false);
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Store Profile</h1>
          <p className="text-sm text-zinc-400">Manage your store information and credentials</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Store Information */}
          <Card className="border-zinc-800 bg-zinc-950/80">
            <CardHeader>
              <CardTitle className="text-white">Store Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nomeFantasia" className="text-zinc-300">
                    Store Name
                  </Label>
                  <Input id="nomeFantasia" value={profile.nomeFantasia} onChange={(e) => setProfile({ ...profile, nomeFantasia: e.target.value })} className="border-zinc-800 bg-zinc-900 text-white" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnpj" className="text-zinc-300">
                    CNPJ
                  </Label>
                  <Input id="cnpj" value={profile.cnpj} onChange={(e) => setProfile({ ...profile, cnpj: e.target.value })} placeholder="00.000.000/0000-00" className="border-zinc-800 bg-zinc-900 text-white" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsavel" className="text-zinc-300">
                    Contact Person
                  </Label>
                  <Input id="responsavel" value={profile.responsavel} onChange={(e) => setProfile({ ...profile, responsavel: e.target.value })} className="border-zinc-800 bg-zinc-900 text-white" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-zinc-300">
                    Phone
                  </Label>
                  <Input id="telefone" value={profile.telefone} onChange={(e) => setProfile({ ...profile, telefone: e.target.value })} placeholder="(00) 00000-0000" className="border-zinc-800 bg-zinc-900 text-white" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300">
                    Email
                  </Label>
                  <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="border-zinc-800 bg-zinc-900 text-white" />
                </div>

                <Button type="submit" disabled={isSavingProfile} className="w-full gap-2">
                  <Save className="h-4 w-4" />
                  {isSavingProfile ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="border-zinc-800 bg-zinc-950/80">
            <CardHeader>
              <CardTitle className="text-white">Address</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cep" className="text-zinc-300">
                      ZIP Code
                    </Label>
                    <Input id="cep" value={address.cep} onChange={(e) => setAddress({ ...address, cep: e.target.value })} placeholder="00000-000" className="border-zinc-800 bg-zinc-900 text-white" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estado" className="text-zinc-300">
                      State
                    </Label>
                    <Input id="estado" value={address.estado} onChange={(e) => setAddress({ ...address, estado: e.target.value })} className="border-zinc-800 bg-zinc-900 text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cidade" className="text-zinc-300">
                    City
                  </Label>
                  <Input id="cidade" value={address.cidade} onChange={(e) => setAddress({ ...address, cidade: e.target.value })} className="border-zinc-800 bg-zinc-900 text-white" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bairro" className="text-zinc-300">
                    District
                  </Label>
                  <Input id="bairro" value={address.bairro} onChange={(e) => setAddress({ ...address, bairro: e.target.value })} className="border-zinc-800 bg-zinc-900 text-white" />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="rua" className="text-zinc-300">
                      Street
                    </Label>
                    <Input id="rua" value={address.rua} onChange={(e) => setAddress({ ...address, rua: e.target.value })} className="border-zinc-800 bg-zinc-900 text-white" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numero" className="text-zinc-300">
                      Number
                    </Label>
                    <Input id="numero" value={address.numero} onChange={(e) => setAddress({ ...address, numero: e.target.value })} className="border-zinc-800 bg-zinc-900 text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complemento" className="text-zinc-300">
                    Complement (Optional)
                  </Label>
                  <Input id="complemento" value={address.complemento} onChange={(e) => setAddress({ ...address, complemento: e.target.value })} className="border-zinc-800 bg-zinc-900 text-white" />
                </div>

                <Button type="submit" disabled={isSavingAddress} className="w-full gap-2">
                  <Save className="h-4 w-4" />
                  {isSavingAddress ? "Saving..." : "Save Address"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Login Credentials Section */}
        <Card className="mt-8 border-zinc-800 bg-zinc-950/80">
          <CardHeader>
            <CardTitle className="text-white">Login Credentials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Login Email</p>
                  <p className="text-lg font-semibold text-white">store@example.com</p>
                  <p className="text-xs text-zinc-500">This email is used to sign in</p>
                </div>
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Password</p>
                <p className="text-sm text-zinc-400">Change your account password</p>
              </div>
              <Button variant="outline" onClick={() => setShowPasswordDialog(true)} className="gap-2 border-zinc-700">
                <Key className="h-4 w-4" />
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-100">
          <DialogHeader>
            <DialogTitle className="text-white">Change Password</DialogTitle>
            <DialogDescription className="text-zinc-400">Enter your current password and choose a new one</DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-zinc-300">
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                className="border-zinc-800 bg-zinc-900 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-zinc-300">
                New Password
              </Label>
              <Input id="newPassword" type="password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} className="border-zinc-800 bg-zinc-900 text-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-zinc-300">
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                className="border-zinc-800 bg-zinc-900 text-white"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="default" onClick={() => setShowPasswordDialog(false)} className="border-zinc-700 text-zinc-300 hover:text-white">
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
