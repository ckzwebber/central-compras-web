"use client";

import { useState, useEffect } from "react";
import { Key, Loader2, AlertCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSection } from "@/components/admin/form-section";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { jwtDecode } from "jwt-decode";
import { User as userType } from "@/types/auth";

export default function StoreProfilePage() {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  // Carregar dados do usuário do token JWT
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem("auth_token");
        if (!token) {
          setError("Usuário não autenticado");
          setIsLoading(false);
          return;
        }

        // Decodificar JWT payload
        const payload: userType = jwtDecode(token);
        setUserData({
          nome: payload.nome,
          sobrenome: payload.sobrenome,
          email: payload.email,
          funcao: payload.funcao,
        });
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar dados do usuário");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

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

    try {
      // TODO: Implement password change API call
      console.log("Changing password...", { currentPassword, newPassword });
      alert("Password changed successfully!");
      setIsPasswordDialogOpen(false);
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Profile Settings</h1>
          <p className="text-sm text-zinc-400">Manage your account information</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 border-red-900 bg-red-950/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
          </div>
        ) : userData ? (
          <div className="space-y-6">
            {/* User Information */}
            <FormSection title="User Information" description="Your account details">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome">First Name</Label>
                  <Input id="nome" name="nome" defaultValue={userData.nome} disabled className="border-zinc-800 bg-zinc-900 text-zinc-500" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sobrenome">Last Name</Label>
                  <Input id="sobrenome" name="sobrenome" defaultValue={userData.sobrenome} disabled className="border-zinc-800 bg-zinc-900 text-zinc-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={userData.email} disabled className="border-zinc-800 bg-zinc-900 text-zinc-500" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="funcao">Role</Label>
                <Input id="funcao" name="funcao" defaultValue={userData.funcao} disabled className="border-zinc-800 bg-zinc-900 text-zinc-500" />
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="flex items-start gap-3">
                  <User className="mt-0.5 h-5 w-5 text-zinc-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Account Type: Store</p>
                    <p className="mt-1 text-xs text-zinc-400">You are logged in as a store. Your user account is automatically linked for placing orders with suppliers.</p>
                  </div>
                </div>
              </div>
            </FormSection>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsPasswordDialogOpen(true)} className="w-full border-zinc-700 sm:w-auto">
                <Key className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </div>
          </div>
        ) : null}

        {/* Change Password Dialog */}
        <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
          <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-100">
            <DialogHeader>
              <DialogTitle className="text-white">Change Password</DialogTitle>
              <DialogDescription className="text-zinc-400">Enter your current password and choose a new one.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleChangePassword}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" name="currentPassword" type="password" required className="border-zinc-700 bg-zinc-900" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" name="newPassword" type="password" required className="border-zinc-700 bg-zinc-900" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" required className="border-zinc-700 bg-zinc-900" />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsPasswordDialogOpen(false)} disabled={isChangingPassword} className="border-zinc-700 text-zinc-300">
                  Cancel
                </Button>
                <Button type="submit" disabled={isChangingPassword}>
                  {isChangingPassword ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Changing...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
