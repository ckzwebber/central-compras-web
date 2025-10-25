"use client";
import { useMemo, useState } from "react";
import { Produto } from "@/types/produto";
import { FiltersCard, ProductFilters, defaultFilters } from "./filters-card";
import { ProductCard } from "./product-card";

const MOCK_PRODUTOS: Produto[] = [
  {
    id: "1",
    nome: "Product 1",
    descricao: "Detailed description of Product 1",
    valor_unitario: 10.0,
    imagem_url: "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=2048&q=75",
    quantidade_estoque: 100,
    categoria: "Category 1",
    criado_em: new Date("2024-01-08T10:00:00Z"),
    atualizado_em: new Date("2024-06-12T12:00:00Z"),
  },
  {
    id: "2",
    nome: "Product 2",
    descricao: "Detailed description of Product 2",
    valor_unitario: 20.0,
    imagem_url: "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=2048&q=75",
    quantidade_estoque: 200,
    categoria: "Category 2",
    criado_em: new Date("2024-02-18T10:00:00Z"),
    atualizado_em: new Date("2024-07-21T12:00:00Z"),
  },
  {
    id: "3",
    nome: "Product 3",
    descricao: "Detailed description of Product 3",
    valor_unitario: 15.5,
    imagem_url: "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fhoodie-1.png%3Fv%3D1690003482&w=2048&q=75",
    quantidade_estoque: 80,
    categoria: "Category 1",
    criado_em: new Date("2024-03-10T10:00:00Z"),
    atualizado_em: new Date("2024-09-05T12:00:00Z"),
  },
];

export const Home = () => {
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters);

  const categories = useMemo(() => {
    const unique = new Set(MOCK_PRODUTOS.map((produto) => produto.categoria));
    return Array.from(unique).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();

    return MOCK_PRODUTOS.filter((produto) => {
      const matchesSearch = normalizedSearch.length === 0 || produto.nome.toLowerCase().includes(normalizedSearch) || produto.descricao.toLowerCase().includes(normalizedSearch);

      const matchesCategory = filters.category === "all" || produto.categoria === filters.category;

      const matchesMin = filters.minPrice === null || produto.valor_unitario >= filters.minPrice;

      const matchesMax = filters.maxPrice === null || produto.valor_unitario <= filters.maxPrice;

      return matchesSearch && matchesCategory && matchesMin && matchesMax;
    });
  }, [filters]);

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight">Catalog</h1>
        <p className="text-sm text-muted-foreground">Explore available products and apply filters to refine your search.</p>{" "}
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="lg:max-w-[280px]">
          <FiltersCard filters={filters} categories={categories} onFiltersChange={setFilters} />
        </aside>

        <section className="flex flex-col gap-6">
          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((produto) => (
                <ProductCard key={produto.id} produto={produto} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">No products found. Adjust the filters to view other items.</div>
          )}
        </section>
      </div>
    </main>
  );
};
