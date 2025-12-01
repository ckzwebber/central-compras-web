"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, MoreVertical, Trash2, Loader2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import * as adminStoresService from "@/lib/admin-stores.service";

export default function StoresPage() {
  const [stores, setStores] = useState<adminStoresService.Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState<adminStoresService.Store | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminStoresService.adminStoresService.getAllStores();
      setStores(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load stores");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (store: adminStoresService.Store) => {
    setStoreToDelete(store);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!storeToDelete) return;

    try {
      setDeleting(true);
      await adminStoresService.adminStoresService.deleteStore(storeToDelete.id);
      setDeleteDialogOpen(false);
      setStoreToDelete(null);
      await fetchStores();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete store");
      setDeleteDialogOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  console.log("Stores:", stores);

  const filteredStores = stores.filter((store) => store.nome.toLowerCase().includes(searchTerm.toLowerCase()) || store.cnpj?.includes(searchTerm) || (store.usuario_id && String(store.usuario_id).includes(searchTerm)));

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Stores</h1>
              <p className="text-sm text-zinc-400">Manage registered stores in the system</p>
            </div>
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
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Stores</h1>
            <p className="text-sm text-zinc-400">Manage registered stores in the system</p>
          </div>
          <Button asChild>
            <Link href="/admin/stores/new">
              <Plus className="mr-2 h-4 w-4" />
              New Store
            </Link>
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input placeholder="Search by name, CNPJ or manager..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border-zinc-800 bg-zinc-950 pl-10" />
          </div>
        </div>

        {/* Stores List */}
        {filteredStores.length > 0 ? (
          <div className="grid gap-4">
            {filteredStores.map((store) => (
              <Card key={store.id} className="border-zinc-800 bg-zinc-950/80">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{store.nome || "N/A"}</h3>
                        <span className="text-sm text-zinc-500">
                          {store.criado_em || "N/A"} - {store.atualizado_em || "N/A"}
                        </span>
                      </div>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <p className="text-xs text-zinc-500">CNPJ</p>
                          <p className="text-sm text-zinc-300">{store.cnpj || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500">User ID</p>
                          <p className="text-sm text-zinc-300">{store.usuario_id}</p>
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="default" size="icon" className="text-zinc-400">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-950">
                        <DropdownMenuItem onClick={() => handleDeleteClick(store)} className="text-red-400 focus:bg-zinc-900 focus:text-red-400">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-zinc-800 bg-zinc-950/80">
            <CardContent className="p-12 text-center">
              <p className="text-zinc-400">No stores found with the search terms.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="border-zinc-800 bg-zinc-950">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Store</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Are you sure you want to delete <span className="font-semibold text-white">{storeToDelete?.nome}</span>? This action cannot be undone.
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
