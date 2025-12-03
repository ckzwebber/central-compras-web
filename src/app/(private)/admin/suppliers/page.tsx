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
import * as adminSuppliersService from "@/lib/admin-suppliers.service";
import { Fornecedor } from "@/types/fornecedor";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState<Fornecedor | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminSuppliersService.adminSuppliersService.getAllSuppliers();
      setSuppliers(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load suppliers");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (supplier: Fornecedor) => {
    setSupplierToDelete(supplier);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!supplierToDelete) return;

    try {
      setDeleting(true);
      await adminSuppliersService.adminSuppliersService.deleteSupplier(supplierToDelete.id);
      setDeleteDialogOpen(false);
      setSupplierToDelete(null);
      await fetchSuppliers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete supplier");
      setDeleteDialogOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  const filteredSuppliers = suppliers.filter(
    (supplier) => supplier.razao_social?.toLowerCase().includes(searchTerm.toLowerCase()) || supplier.nome_fantasia?.toLowerCase().includes(searchTerm.toLowerCase()) || supplier.cnpj?.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Suppliers</h1>
              <p className="text-sm text-zinc-400">Manage registered suppliers in the system</p>
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
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Suppliers</h1>
            <p className="text-sm text-zinc-400">Manage registered suppliers in the system</p>
          </div>
          <Button asChild>
            <Link href="/admin/suppliers/new">
              <Plus className="mr-2 h-4 w-4" />
              New Supplier
            </Link>
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input placeholder="Search by company name, trade name or CNPJ..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border-zinc-800 bg-zinc-950 pl-10" />
          </div>
        </div>

        {filteredSuppliers.length > 0 ? (
          <div className="grid gap-4">
            {filteredSuppliers.map((supplier) => (
              <Card key={supplier.id} className="border-zinc-800 bg-zinc-950/80">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{supplier.nome_fantasia || "N/A"}</h3>
                      </div>
                      <p className="mt-1 text-sm text-zinc-400">{supplier.razao_social || "N/A"}</p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        <div>
                          <p className="text-xs text-zinc-500">CNPJ</p>
                          <p className="text-sm text-zinc-300">{supplier.cnpj || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500">User ID</p>
                          <p className="text-sm text-zinc-300">{supplier.usuario_id || "N/A"}</p>
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
                        <DropdownMenuItem onClick={() => handleDeleteClick(supplier)} className="text-red-400 focus:bg-zinc-900 focus:text-red-400">
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
              <p className="text-zinc-400">No suppliers found with the search terms.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="border-zinc-800 bg-zinc-950">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Supplier</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Are you sure you want to delete <span className="font-semibold text-white">{supplierToDelete?.nome_fantasia}</span>? This action cannot be undone.
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
