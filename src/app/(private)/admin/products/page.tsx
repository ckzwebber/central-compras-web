"use client";

import { useState, useMemo } from "react";
import { Search, Plus, MoreVertical, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Product {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  valorUnitario: number;
  estoque: number;
  fornecedor: {
    id: string;
    nomeFantasia: string;
  };
  imagemUrl?: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    nome: "Notebook Dell Inspiron 15",
    descricao: "Intel Core i5, 8GB RAM, 256GB SSD",
    categoria: "Electronics",
    valorUnitario: 3299.99,
    estoque: 45,
    fornecedor: {
      id: "1",
      nomeFantasia: "Tech Distribuidora",
    },
  },
  {
    id: "2",
    nome: "Mouse Logitech MX Master 3",
    descricao: "Wireless, Ergonomic, Programmable Buttons",
    categoria: "Accessories",
    valorUnitario: 459.9,
    estoque: 120,
    fornecedor: {
      id: "1",
      nomeFantasia: "Tech Distribuidora",
    },
  },
  {
    id: "3",
    nome: "Cadeira Gamer DT3Sports",
    descricao: "Ergonomic, Adjustable Height, Black/Red",
    categoria: "Furniture",
    valorUnitario: 1199.0,
    estoque: 28,
    fornecedor: {
      id: "2",
      nomeFantasia: "Office Solutions",
    },
  },
  {
    id: "4",
    nome: 'Monitor LG UltraWide 29"',
    descricao: "2560x1080, IPS, HDMI, USB-C",
    categoria: "Electronics",
    valorUnitario: 1899.99,
    estoque: 15,
    fornecedor: {
      id: "1",
      nomeFantasia: "Tech Distribuidora",
    },
  },
  {
    id: "5",
    nome: "Teclado Mecânico Keychron K2",
    descricao: "RGB, Bluetooth, Hot-swappable, Brown Switches",
    categoria: "Accessories",
    valorUnitario: 699.9,
    estoque: 8,
    fornecedor: {
      id: "3",
      nomeFantasia: "Importadora Global",
    },
  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return mockProducts;

    const query = searchQuery.toLowerCase();
    return mockProducts.filter((product) => product.nome.toLowerCase().includes(query) || product.categoria.toLowerCase().includes(query) || product.fornecedor.nomeFantasia.toLowerCase().includes(query));
  }, [searchQuery]);

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

  const handleEdit = (id: string) => {};

  const handleDelete = (id: string) => {
    // TODO: Show confirm dialog
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Products</h1>
            <p className="text-sm text-zinc-400">Manage products in the catalog</p>
          </div>
          <Button asChild className="sm:w-auto">
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              New Product
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input placeholder="Search by name, category or supplier..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border-zinc-800 bg-zinc-950 pl-10" />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Card className="border-zinc-800 bg-zinc-950/80">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-zinc-400">No products found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.estoque);
              return (
                <Card key={product.id} className="group border-zinc-800 bg-zinc-950/80 transition hover:border-zinc-700 hover:bg-zinc-900/60">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{product.nome}</h3>
                        <p className="mt-1 text-sm text-zinc-400">{product.descricao}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="default" size="icon" className="h-8 w-8 text-zinc-400">
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
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">Category:</span>
                      <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">{product.categoria}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">Supplier:</span>
                      <span className="text-zinc-200">{product.fornecedor.nomeFantasia}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">Unit Price:</span>
                      <span className="font-semibold text-white">{formatCurrency(product.valorUnitario)}</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-800 pt-3 text-sm">
                      <span className="text-zinc-400">Stock:</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${stockStatus.color}`}>{product.estoque} units</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
