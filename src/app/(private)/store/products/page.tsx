"use client";

import { useEffect, useMemo, useState } from "react";
import { Produto } from "@/types/produto";
import { FiltersCard, ProductFilters, defaultFilters } from "@/components/filters-card";
import { ProductCard } from "@/components/product-card";
import { produtosService } from "@/lib/produtos.service";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function StoreProductsPage() {
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProdutos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await produtosService.getAll();
        setProdutos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar produtos");
      } finally {
        setIsLoading(false);
      }
    };

    loadProdutos();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(produtos.map((produto) => produto.categoria));
    return Array.from(unique).sort();
  }, [produtos]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();

    return produtos.filter((produto) => {
      const matchesSearch = normalizedSearch.length === 0 || produto.nome.toLowerCase().includes(normalizedSearch) || produto.descricao.toLowerCase().includes(normalizedSearch);

      const matchesCategory = filters.category === "all" || produto.categoria === filters.category;

      const matchesMin = filters.minPrice === null || produto.valor_unitario >= filters.minPrice;

      const matchesMax = filters.maxPrice === null || produto.valor_unitario <= filters.maxPrice;

      return matchesSearch && matchesCategory && matchesMin && matchesMax;
    });
  }, [filters, produtos]);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight">Product Catalog</h1>
          <p className="text-sm text-muted-foreground">Browse products from our suppliers and add them to your cart.</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 border-red-900 bg-red-950/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="lg:max-w-[280px]">
            <FiltersCard filters={filters} categories={categories} onFiltersChange={setFilters} />
          </aside>

          <section className="flex flex-col gap-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((produto) => (
                  <ProductCard key={produto.id} produto={produto} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-zinc-800 p-10 text-center text-sm text-zinc-400">No products found. Adjust the filters to view other items.</div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
