"use client";
import { useMemo, useState } from "react";
import { Produto } from "@/types/produto";
import { ProductCard } from "./product-card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export const Home = () => {
  const produtos: Produto[] = [
    {
      id: "1",
      nome: "Produto 1",
      descricao: "Descrição do Produto 1",
      valor_unitario: 10.0,
      imagem_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGEKk1DaaAsuqNnnM9yrZ_6OK6I7CiM1EFEg&s",
      quantidade_estoque: 100,
      categoria: "Categoria 1",
      criado_em: new Date(),
      atualizado_em: new Date(),
    },
    {
      id: "2",
      nome: "Produto 2",
      descricao: "Descrição do Produto 2",
      valor_unitario: 20.0,
      imagem_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEJYnk19-jrGFPClIRsq16Ni2KtX-xgqkJkA&s",
      quantidade_estoque: 200,
      categoria: "Categoria 2",
      criado_em: new Date(),
      atualizado_em: new Date(),
    },
  ];
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<"relevance" | "price-asc" | "price-desc">("relevance");

  const categories = useMemo(() => Array.from(new Set(produtos.map((produto) => produto.categoria))), [produtos]);

  const toggleCategory = (categoria: string) => {
    setSelectedCategories((prev) => (prev.includes(categoria) ? prev.filter((c) => c !== categoria) : [...prev, categoria]));
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const nMin = minPrice ? Number(minPrice) : undefined;
    const nMax = maxPrice ? Number(maxPrice) : undefined;

    return produtos
      .filter((p) => (q ? p.nome.toLowerCase().includes(q) || p.descricao.toLowerCase().includes(q) : true))
      .filter((p) => (selectedCategories.length > 0 ? selectedCategories.includes(p.categoria) : true))
      .filter((p) => (nMin !== undefined ? p.valor_unitario >= nMin : true))
      .filter((p) => (nMax !== undefined ? p.valor_unitario <= nMax : true));
  }, [produtos, query, selectedCategories, minPrice, maxPrice]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sortBy === "price-asc") {
      arr.sort((a, b) => a.valor_unitario - b.valor_unitario);
    } else if (sortBy === "price-desc") {
      arr.sort((a, b) => b.valor_unitario - a.valor_unitario);
    }
    return arr;
  }, [filtered, sortBy]);

  const clearFilters = () => {
    setQuery("");
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("relevance");
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="overflow-hidden rounded-3xl border bg-white">
          <div className="p-8 sm:p-14 text-center">
            <p className="mb-2 text-xs uppercase tracking-widest text-zinc-500">Bem-vindo</p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">Encontre produtos incríveis para o seu negócio</h1>
            <p className="mt-3 mx-auto max-w-2xl text-zinc-600">Pesquise, compare e compre com praticidade.</p>

            <div className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Input placeholder="Busque por produtos, categorias, marcas..." value={query} onChange={(e) => setQuery(e.target.value)} className="h-11 sm:max-w-[560px]" />
              <Button className="h-11 px-6">Buscar</Button>
            </div>

            {/* Quick categories */}
            {categories.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {categories.map((cat) => (
                  <Button key={cat} variant={selectedCategories.includes(cat) ? "default" : "outline"} onClick={() => toggleCategory(cat)} className="h-8 rounded-full px-3 text-sm">
                    {cat}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Toolbar + Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-600">
            Mostrando <span className="font-medium text-zinc-900">{sorted.length}</span> produtos
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Price */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="minPrice" className="text-xs text-zinc-500">
                  Min
                </Label>
                <Input id="minPrice" type="number" inputMode="decimal" placeholder="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="h-9 w-24" />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="maxPrice" className="text-xs text-zinc-500">
                  Max
                </Label>
                <Input id="maxPrice" type="number" inputMode="decimal" placeholder="1000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="h-9 w-24" />
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <Button variant={sortBy === "relevance" ? "default" : "outline"} className="h-9" onClick={() => setSortBy("relevance")}>
                Relevância
              </Button>
              <Button variant={sortBy === "price-asc" ? "default" : "outline"} className="h-9" onClick={() => setSortBy("price-asc")}>
                Preço ↑
              </Button>
              <Button variant={sortBy === "price-desc" ? "default" : "outline"} className="h-9" onClick={() => setSortBy("price-desc")}>
                Preço ↓
              </Button>
              <Button variant="ghost" onClick={clearFilters} className="h-9">
                Limpar
              </Button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((produto) => (
            <div key={produto.id} className="transition-transform duration-200 hover:-translate-y-0.5">
              <ProductCard {...produto} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
