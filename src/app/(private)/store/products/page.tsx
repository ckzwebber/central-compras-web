"use client";

import { useMemo, useState } from "react";
import { Produto } from "@/types/produto";
import { FiltersCard, ProductFilters, defaultFilters } from "@/components/filters-card";
import { ProductCard } from "@/components/product-card";

const MOCK_PRODUTOS: Produto[] = [
  {
    id: "1",
    nome: "Notebook Dell Inspiron 15",
    descricao: "Intel Core i5, 8GB RAM, 256GB SSD",
    valor_unitario: 3299.99,
    imagem_url: "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=2048&q=75",
    quantidade_estoque: 45,
    categoria: "Electronics",
    criado_em: new Date("2024-01-08T10:00:00Z"),
    atualizado_em: new Date("2024-06-12T12:00:00Z"),
  },
  {
    id: "2",
    nome: "Mouse Logitech MX Master 3",
    descricao: "Wireless, Ergonomic, Programmable Buttons",
    valor_unitario: 459.9,
    imagem_url: "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=2048&q=75",
    quantidade_estoque: 120,
    categoria: "Accessories",
    criado_em: new Date("2024-02-18T10:00:00Z"),
    atualizado_em: new Date("2024-07-21T12:00:00Z"),
  },
  {
    id: "3",
    nome: "Cadeira Gamer DT3Sports",
    descricao: "Ergonomic, Adjustable Height, Black/Red",
    valor_unitario: 1199.0,
    imagem_url: "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fhoodie-1.png%3Fv%3D1690003482&w=2048&q=75",
    quantidade_estoque: 28,
    categoria: "Furniture",
    criado_em: new Date("2024-03-10T10:00:00Z"),
    atualizado_em: new Date("2024-09-05T12:00:00Z"),
  },
  {
    id: "4",
    nome: 'Monitor LG UltraWide 29"',
    descricao: "2560x1080, IPS, HDMI, USB-C",
    valor_unitario: 1899.99,
    imagem_url: "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=2048&q=75",
    quantidade_estoque: 15,
    categoria: "Electronics",
    criado_em: new Date("2024-04-15T10:00:00Z"),
    atualizado_em: new Date("2024-10-20T12:00:00Z"),
  },
  {
    id: "5",
    nome: "Teclado Mecânico Keychron K2",
    descricao: "RGB Backlight, Wireless/Wired, Hot-swappable",
    valor_unitario: 749.0,
    imagem_url: "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=2048&q=75",
    quantidade_estoque: 67,
    categoria: "Accessories",
    criado_em: new Date("2024-05-22T10:00:00Z"),
    atualizado_em: new Date("2024-08-30T12:00:00Z"),
  },
  {
    id: "6",
    nome: "Mesa Ajustável Standing Desk",
    descricao: "Electric Height Adjustment, 120x60cm, Black",
    valor_unitario: 2499.0,
    imagem_url: "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fhoodie-1.png%3Fv%3D1690003482&w=2048&q=75",
    quantidade_estoque: 12,
    categoria: "Furniture",
    criado_em: new Date("2024-06-05T10:00:00Z"),
    atualizado_em: new Date("2024-09-18T12:00:00Z"),
  },
];

export default function StoreProductsPage() {
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
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight">Product Catalog</h1>
          <p className="text-sm text-muted-foreground">Browse products from our suppliers and add them to your cart.</p>
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
              <div className="rounded-lg border border-dashed border-zinc-800 p-10 text-center text-sm text-zinc-400">No products found. Adjust the filters to view other items.</div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
