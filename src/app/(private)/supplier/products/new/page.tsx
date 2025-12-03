"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { supplierService } from "@/lib/supplier.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSection } from "@/components/admin/form-section";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function NewSupplierProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);

      const productData = {
        nome: formData.get("nome") as string,
        descricao: formData.get("descricao") as string,
        categoria: formData.get("categoria") as string,
        valor_unitario: parseFloat(formData.get("valorUnitario") as string),
        quantidade_estoque: parseInt(formData.get("estoque") as string),
        imagem_url: formData.get("imagem_url") as string,
      };

      await supplierService.createProduct(productData);
      router.push("/supplier/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8">
          <Button asChild variant="link" className="group mb-4 gap-2 px-0 text-sm text-zinc-300 hover:text-white">
            <Link href="/supplier/products">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to products
            </Link>
          </Button>

          <h1 className="text-3xl font-bold tracking-tight text-white">New Product</h1>
          <p className="text-sm text-zinc-400">Add a new product to your catalog.</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection title="Basic Information" description="Main product details">
            <div className="space-y-2">
              <Label htmlFor="nome">Product Name</Label>
              <Input id="nome" name="nome" placeholder="e.g., Notebook Dell Inspiron 15" required className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Description</Label>
              <textarea
                id="descricao"
                name="descricao"
                placeholder="Brief product description..."
                required
                rows={3}
                className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 transition placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imagem_url">Image URL</Label>
              <Input id="imagem_url" name="imagem_url" type="url" placeholder="https://example.com/image.jpg" className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Category</Label>
              <select
                id="categoria"
                name="categoria"
                required
                className="h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-200 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40">
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
                <option value="Furniture">Furniture</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Software">Software</option>
              </select>
            </div>
          </FormSection>

          <FormSection title="Pricing & Stock" description="Product pricing and inventory information">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="valorUnitario">Unit Price (BRL)</Label>
                <Input id="valorUnitario" name="valorUnitario" type="number" step="0.01" min="0" placeholder="0.00" required className="border-zinc-800 bg-zinc-950" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estoque">Stock Quantity</Label>
                <Input id="estoque" name="estoque" type="number" min="0" placeholder="0" required className="border-zinc-800 bg-zinc-950" />
              </div>
            </div>
          </FormSection>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="default" onClick={() => router.push("/supplier/products")} className="text-zinc-300 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Register Product"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
