"use client";

import { useState, useEffect } from "react";
import { Key, Loader2, AlertCircle, User, Store, Save, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSection } from "@/components/admin/form-section";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { jwtDecode } from "jwt-decode";
import { User as userType } from "@/types/auth";
import { userService } from "@/lib/user.service";
import { UpdateUserData, UpdatePasswordData, UpdateStoreData } from "@/types/user";

interface StoreData {
  id: string;
  nome: string;
  cnpj: string;
  usuario_id: string;
  endereco_id: string | null;
}

export default function StoreProfilePage() {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSavingUser, setIsSavingUser] = useState(false);
  const [isSavingStore, setIsSavingStore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);

  const [userForm, setUserForm] = useState({
    nome: "",
    sobrenome: "",
    email: "",
  });

  const [storeForm, setStoreForm] = useState({
    nome: "",
    cnpj: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem("auth_token");
        if (!token) {
          setError("User not authenticated");
          setIsLoading(false);
          return;
        }

        const payload: userType = jwtDecode(token);

        const userResponse = await userService.getUser(payload.sub);
        if (userResponse.success && userResponse.data) {
          const freshUserData = userResponse.data;
          const mergedUserData = { ...payload, ...freshUserData };
          setUserData(mergedUserData);
          setUserForm({
            nome: freshUserData.nome,
            sobrenome: freshUserData.sobrenome,
            email: freshUserData.email,
          });
        } else {
          setUserData(payload);
          setUserForm({
            nome: payload.nome,
            sobrenome: payload.sobrenome,
            email: payload.email,
          });
        }

        const storeResponse = await userService.getMyStore();
        if (storeResponse.success && storeResponse.data && storeResponse.data.length > 0) {
          const store = storeResponse.data[0];
          setStoreData(store);
          setStoreForm({
            nome: store.nome || "",
            cnpj: store.cnpj || "",
          });
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Error loading data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData?.sub) return;

    setIsSavingUser(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const updateData: UpdateUserData = {};
      if (userForm.nome !== userData.nome) updateData.nome = userForm.nome;
      if (userForm.sobrenome !== userData.sobrenome) updateData.sobrenome = userForm.sobrenome;
      if (userForm.email !== userData.email) updateData.email = userForm.email;

      if (Object.keys(updateData).length === 0) {
        setSuccessMessage("No changes detected.");
        setIsSavingUser(false);
        return;
      }

      await userService.updateUser(userData.sub, updateData);

      const updatedUserResponse = await userService.getUser(userData.sub);
      if (updatedUserResponse.success && updatedUserResponse.data) {
        const updatedUser = updatedUserResponse.data;

        if (updatedUserResponse.data.token) {
          localStorage.setItem("auth_token", updatedUserResponse.data.token);
          const newPayload = jwtDecode(updatedUserResponse.data.token) as any;
          setUserData(newPayload);
          setUserForm({
            nome: newPayload.nome,
            sobrenome: newPayload.sobrenome,
            email: newPayload.email,
          });
        } else {
          setUserData({ ...userData, ...updatedUser });
          setUserForm({
            nome: updatedUser.nome,
            sobrenome: updatedUser.sobrenome,
            email: updatedUser.email,
          });
        }
      }

      setSuccessMessage("User data updated successfully!");

      if (updateData.email) {
        setTimeout(() => {
          localStorage.removeItem("auth_token");
          window.location.href = "/login";
        }, 2000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating user data.");
    } finally {
      setIsSavingUser(false);
    }
  };

  const handleUpdateStore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!storeData?.id) return;

    setIsSavingStore(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const updateData: UpdateStoreData = {};
      if (storeForm.nome !== storeData.nome) updateData.nome = storeForm.nome;
      if (storeForm.cnpj !== storeData.cnpj) updateData.cnpj = storeForm.cnpj;

      if (Object.keys(updateData).length === 0) {
        setSuccessMessage("No changes detected.");
        setIsSavingStore(false);
        return;
      }

      await userService.updateStore(storeData.id, updateData);

      const storeResponse = await userService.getMyStore();
      if (storeResponse.success && storeResponse.data && storeResponse.data.length > 0) {
        const updatedStore = storeResponse.data[0];
        setStoreData(updatedStore);
        setStoreForm({
          nome: updatedStore.nome || "",
          cnpj: updatedStore.cnpj || "",
        });
      }

      setSuccessMessage("Store data updated successfully!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating store data.");
    } finally {
      setIsSavingStore(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData?.sub) return;

    const formData = new FormData(e.currentTarget);
    const senhaAtual = formData.get("currentPassword") as string;
    const novaSenha = formData.get("newPassword") as string;
    const confirmarNovaSenha = formData.get("confirmPassword") as string;

    setError(null);
    setSuccessMessage(null);

    if (novaSenha !== confirmarNovaSenha) {
      setError("Passwords don't match!");
      return;
    }

    setIsChangingPassword(true);

    try {
      const passwordData: UpdatePasswordData = {
        senhaAtual,
        novaSenha,
        confirmarNovaSenha,
      };

      await userService.updatePassword(userData.sub, passwordData);

      setSuccessMessage("Password changed successfully!");
      setIsPasswordDialogOpen(false);
      e.currentTarget.reset();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error changing password.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Profile Settings</h1>
          <p className="text-sm text-zinc-400">Manage your account and store information</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 border-red-900 bg-red-950/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert className="mb-6 border-green-900 bg-green-950/50 text-green-100">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
          </div>
        ) : userData ? (
          <div className="space-y-6">
            <FormSection title="User Information" description="Your personal data">
              <form onSubmit={handleUpdateUser} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nome">First Name</Label>
                    <Input id="nome" name="nome" value={userForm.nome} onChange={(e) => setUserForm({ ...userForm, nome: e.target.value })} className="border-zinc-700 bg-zinc-900" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sobrenome">Last Name</Label>
                    <Input id="sobrenome" name="sobrenome" value={userForm.sobrenome} onChange={(e) => setUserForm({ ...userForm, sobrenome: e.target.value })} className="border-zinc-700 bg-zinc-900" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} className="border-zinc-700 bg-zinc-900" required />
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
                      <p className="mt-1 text-xs text-zinc-400">You are logged in as a store. Your account is automatically linked to place orders with suppliers.</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSavingUser} className="w-full sm:w-auto">
                    {isSavingUser ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save User Data
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </FormSection>

            {storeData && (
              <FormSection title="Store Information" description="Your establishment data">
                <form onSubmit={handleUpdateStore} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input id="storeName" name="storeName" value={storeForm.nome} onChange={(e) => setStoreForm({ ...storeForm, nome: e.target.value })} className="border-zinc-700 bg-zinc-900" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      name="cnpj"
                      value={storeForm.cnpj}
                      onChange={(e) => setStoreForm({ ...storeForm, cnpj: e.target.value })}
                      className="border-zinc-700 bg-zinc-900"
                      placeholder="00000000000000"
                      maxLength={14}
                      required
                    />
                  </div>

                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                    <div className="flex items-start gap-3">
                      <Store className="mt-0.5 h-5 w-5 text-zinc-400" />
                      <div>
                        <p className="text-sm font-medium text-white">Store ID</p>
                        <p className="mt-1 text-xs font-mono text-zinc-400">{storeData.id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSavingStore} className="w-full sm:w-auto">
                      {isSavingStore ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Store Data
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </FormSection>
            )}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="default" onClick={() => setIsPasswordDialogOpen(true)} className="w-full border-zinc-700 sm:w-auto">
                <Key className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </div>
          </div>
        ) : null}

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
                <Button type="button" variant="default" onClick={() => setIsPasswordDialogOpen(false)} disabled={isChangingPassword} className="border-zinc-700 text-zinc-300">
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
