"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSection } from "@/components/admin/form-section";

export default function NewSupplierProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Product registered successfully!");
    router.push("/supplier/products");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto max-w-4xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="group mb-4 gap-2 px-0 text-sm text-zinc-300 hover:text-white">
            <Link href="/supplier/products">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to products
            </Link>
          </Button>

          <h1 className="text-3xl font-bold tracking-tight text-white">New Product</h1>
          <p className="text-sm text-zinc-400">Add a new product to your catalog.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
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

          {/* Pricing & Stock */}
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

          {/* Product Image */}
          <FormSection title="Product Image" description="Upload a product image (optional)">
            {selectedImage ? (
              <div className="relative">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                  <Image src={selectedImage} alt="Product preview" fill className="object-contain" />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveImage}
                  className="absolute right-2 top-2 h-8 w-8 border border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-900 hover:text-white">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-zinc-800 bg-zinc-900/50 p-12 transition hover:border-zinc-700">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-zinc-600" />
                  <div className="mt-4">
                    <label htmlFor="image-upload" className="cursor-pointer text-sm font-medium text-white hover:text-zinc-200">
                      Click to upload
                      <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    <p className="mt-1 text-xs text-zinc-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            )}
          </FormSection>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => router.push("/supplier/products")} className="text-zinc-300 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
