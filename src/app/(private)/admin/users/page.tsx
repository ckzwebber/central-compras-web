"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, MoreVertical, Trash2, Loader2, AlertCircle, Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import * as adminService from "@/lib/admin.service";
import { User } from "@/types/user";

type UserType = "admin" | "loja" | "fornecedor" | "usuario";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<UserType | "all">("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.adminService.getAllUsers();
      setUsers(data.data);
      console.log(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      setDeleting(true);
      await adminService.adminService.deleteUser(userToDelete.id);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      await fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
      setDeleteDialogOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  const filteredUsers = useMemo(() => {
    let filteredList = users;

    if (filterType !== "all") {
      filteredList = filteredList.filter((user) => user.funcao === filterType);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredList = filteredList.filter((user) => user.nome.toLowerCase().includes(query) || user.email.toLowerCase().includes(query));
    }

    return filteredList;
  }, [users, searchQuery, filterType]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getUserTypeConfig = (type: UserType) => {
    const configs = {
      admin: { label: "Admin", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
      loja: { label: "Store", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
      fornecedor: { label: "Supplier", color: "bg-green-500/10 text-green-400 border-green-500/20" },
      usuario: { label: "User", color: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
    };
    return configs[type];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">Users</h1>
            <p className="text-sm text-zinc-400">Manage system users and their permissions</p>
          </div>
          <Card className="border-zinc-800 bg-zinc-950/80">
            <CardContent className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Users</h1>
            <p className="text-sm text-zinc-400">Manage system users and their permissions</p>
          </div>
          <Button asChild className="sm:w-auto">
            <Link href="/admin/users/new">
              <Plus className="mr-2 h-4 w-4" />
              New User
            </Link>
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input placeholder="Search by name or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border-zinc-800 bg-zinc-950 pl-10" />
          </div>

          <div className="flex gap-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              onClick={() => setFilterType("all")}
              className={filterType !== "all" ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white" : ""}>
              All
            </Button>
            <Button
              variant={filterType === "admin" ? "default" : "outline"}
              onClick={() => setFilterType("admin")}
              className={filterType !== "admin" ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white" : ""}>
              Admins
            </Button>
            <Button
              variant={filterType === "loja" ? "default" : "outline"}
              onClick={() => setFilterType("loja")}
              className={filterType !== "loja" ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white" : ""}>
              Stores
            </Button>
            <Button
              variant={filterType === "fornecedor" ? "default" : "outline"}
              onClick={() => setFilterType("fornecedor")}
              className={filterType !== "fornecedor" ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white" : ""}>
              Suppliers
            </Button>
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <Card className="border-zinc-800 bg-zinc-950/80">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-zinc-400">No users found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((user) => {
              const typeConfig = getUserTypeConfig(user.funcao);
              return (
                <Card key={user.id} className="border-zinc-800 bg-zinc-950/80 transition hover:border-zinc-700 hover:bg-zinc-900/60">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-1 items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white">{user.nome}</h3>
                            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${typeConfig.color}`}>{typeConfig.label}</span>
                          </div>
                          <p className="mt-0.5 text-sm text-zinc-400">{user.email}</p>
                        </div>

                        <div className="hidden text-sm text-zinc-400 sm:block">Registered: {formatDate(user.criado_em)}</div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="default" size="icon" className="h-8 w-8 text-zinc-400">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-950">
                          <DropdownMenuItem onClick={() => handleDeleteClick(user)} className="text-red-400 focus:bg-zinc-900 focus:text-red-400">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="border-zinc-800 bg-zinc-950">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete User</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Are you sure you want to delete <span className="font-semibold text-white">{userToDelete?.nome}</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} disabled={deleting} className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50">
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
