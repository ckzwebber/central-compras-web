"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, MoreVertical, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data
const mockSuppliers = [
  {
    id: "1",
    razaoSocial: "Distribuidora ABC Ltda",
    nomeFantasia: "ABC Distribuidora",
    cnpj: "12.345.678/0001-90",
    email: "contato@abc.com",
    telefone: "(11) 3333-4444",
    cidade: "São Paulo",
    estado: "SP",
  },
  {
    id: "2",
    razaoSocial: "Fornecedor XYZ S.A.",
    nomeFantasia: "XYZ Atacado",
    cnpj: "98.765.432/0001-10",
    email: "vendas@xyz.com",
    telefone: "(21) 2222-3333",
    cidade: "Rio de Janeiro",
    estado: "RJ",
  },
  {
    id: "3",
    razaoSocial: "Importadora Global Ltda",
    nomeFantasia: "Global Import",
    cnpj: "11.222.333/0001-44",
    email: "import@global.com",
    telefone: "(31) 4444-5555",
    cidade: "Belo Horizonte",
    estado: "MG",
  },
];

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSuppliers = mockSuppliers.filter(
    (supplier) => supplier.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) || supplier.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase()) || supplier.cnpj.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
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

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input placeholder="Search by company name, trade name or CNPJ..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border-zinc-800 bg-zinc-950 pl-10" />
          </div>
        </div>

        {/* Suppliers List */}
        {filteredSuppliers.length > 0 ? (
          <div className="grid gap-4">
            {filteredSuppliers.map((supplier) => (
              <Card key={supplier.id} className="border-zinc-800 bg-zinc-950/80">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{supplier.nomeFantasia}</h3>
                        <span className="text-sm text-zinc-500">
                          {supplier.cidade} - {supplier.estado}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-zinc-400">{supplier.razaoSocial}</p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <p className="text-xs text-zinc-500">CNPJ</p>
                          <p className="text-sm text-zinc-300">{supplier.cnpj}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500">Email</p>
                          <p className="text-sm text-zinc-300">{supplier.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500">Phone</p>
                          <p className="text-sm text-zinc-300">{supplier.telefone}</p>
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-zinc-400">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-950">
                        <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-900 focus:text-white">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 focus:bg-zinc-900 focus:text-red-400">
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
    </div>
  );
}
