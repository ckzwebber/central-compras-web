"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Plus, MoreVertical, Edit, Trash2, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supplierService } from "@/lib/supplier.service";
import type { SupplierProduct } from "@/types/supplier";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function SupplierProductsPage() {
  const [products, setProducts] = useState<SupplierProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SupplierProduct | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await supplierService.getMyProducts();
      setProducts(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;

    const query = searchQuery.toLowerCase();
    return products.filter((product) => product.nome.toLowerCase().includes(query) || product.categoria?.toLowerCase().includes(query));
  }, [searchQuery, products]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) {
      return { label: "Out of Stock", color: "text-red-400" };
    } else if (stock < 10) {
      return { label: "Low Stock", color: "text-yellow-400" };
    } else {
      return { label: "In Stock", color: "text-green-400" };
    }
  };

  const handleOpenDialog = (product?: SupplierProduct) => {
    if (product) {
      setEditingProduct(product);
    } else {
      setEditingProduct(null);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const productData = {
        nome: formData.get("nome") as string,
        descricao: (formData.get("descricao") as string) || undefined,
        imagem_url: (formData.get("imagem_url") as string) || undefined,
        valor_unitario: parseFloat(formData.get("valor_unitario") as string),
        quantidade_estoque: parseInt(formData.get("quantidade_estoque") as string),
        categoria: formData.get("categoria") as string,
      };

      if (editingProduct) {
        const updated = await supplierService.updateProduct(editingProduct.id, productData);
        setProducts(products.map((p) => (p.id === editingProduct.id ? updated : p)));
      } else {
        const created = await supplierService.createProduct(productData);
        setProducts([...products, created]);
      }

      handleCloseDialog();
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      handleOpenDialog(product);
    }
  };

  const handleDelete = (id: string) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await supplierService.deleteProduct(productToDelete);
      setProducts(products.filter((p) => p.id !== productToDelete));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">My Products</h1>
            <p className="text-sm text-zinc-400">Manage your product catalog</p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Product
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input placeholder="Search by name or category..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border-zinc-800 bg-zinc-950 pl-10" />
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
          </div>
        )}

        {error && !loading && (
          <Alert className="border-red-800 bg-red-950/20">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        )}

        {!loading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <Card className="border-zinc-800 bg-zinc-950/80">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-zinc-400">{searchQuery ? "No products found matching your search." : "No products yet. Create your first product!"}</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.quantidade_estoque);
                  const imagemUrl = product.imagem_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop";

                  return (
                    <Card key={product.id} className="group border-zinc-800 bg-zinc-950/80 transition hover:border-zinc-700 hover:bg-zinc-900/60">
                      <CardHeader className="p-0">
                        <div className="relative aspect-square w-full overflow-hidden rounded-t-lg bg-zinc-900">
                          <Image src={imagemUrl} alt={product.nome} fill className="object-cover transition group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                          <div className="absolute right-2 top-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="default" size="icon" className="h-8 w-8 bg-zinc-950/90 text-zinc-400 backdrop-blur-sm hover:bg-zinc-900">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-950">
                                <DropdownMenuItem onClick={() => handleEdit(product.id)} className="text-zinc-300 focus:bg-zinc-900 focus:text-zinc-300">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-red-400 focus:bg-zinc-900 focus:text-red-400">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 p-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{product.nome}</h3>
                          <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{product.descricao}</p>
                        </div>

                        {product.categoria && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-zinc-400">Category:</span>
                            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">{product.categoria}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-400">Unit Price:</span>
                          <span className="font-semibold text-white">{formatCurrency(product.valor_unitario)}</span>
                        </div>

                        <div className="flex items-center justify-between border-t border-zinc-800 pt-3 text-sm">
                          <span className="text-zinc-400">Stock:</span>
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${stockStatus.color}`}>{product.quantidade_estoque} units</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </>
        )}

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="border-zinc-800 bg-zinc-950">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Delete Product</AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-400">Are you sure you want to delete this product? This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-600 text-white hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-h-[90vh] overflow-y-auto border-zinc-800 bg-zinc-950 text-zinc-100">
            <DialogHeader>
              <DialogTitle className="text-white">{editingProduct ? "Edit Product" : "New Product"}</DialogTitle>
              <DialogDescription className="text-zinc-400">Manage your product information and inventory</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {editingProduct?.imagem_url && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-900">
                  <Image
                    src={editingProduct.imagem_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"}
                    alt={editingProduct.nome}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="nome">Product Name</Label>
                <Input id="nome" name="nome" required defaultValue={editingProduct?.nome || ""} placeholder="Product name" className="border-zinc-800 bg-zinc-950" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Description</Label>
                <Input id="descricao" minLength={10} name="descricao" defaultValue={editingProduct?.descricao || ""} placeholder="Product description" className="border-zinc-800 bg-zinc-950" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imagem_url">Image URL (optional)</Label>
                <Input id="imagem_url" name="imagem_url" type="url" defaultValue={editingProduct?.imagem_url || ""} placeholder="https://example.com/image.jpg" className="border-zinc-800 bg-zinc-950" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Category</Label>
                <Input id="categoria" name="categoria" required defaultValue={editingProduct?.categoria || ""} placeholder="Electronics, Clothing, etc." className="border-zinc-800 bg-zinc-950" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="valor_unitario">Unit Price (R$)</Label>
                  <Input
                    id="valor_unitario"
                    name="valor_unitario"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    defaultValue={editingProduct?.valor_unitario || ""}
                    placeholder="99.99"
                    className="border-zinc-800 bg-zinc-950"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantidade_estoque">Stock Quantity</Label>
                  <Input
                    id="quantidade_estoque"
                    name="quantidade_estoque"
                    type="number"
                    min="0"
                    required
                    defaultValue={editingProduct?.quantidade_estoque || ""}
                    placeholder="100"
                    className="border-zinc-800 bg-zinc-950"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog} disabled={isSubmitting} className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>{editingProduct ? "Update" : "Create"}</>
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
