"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, MoreVertical, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data
const mockStores = [
  {
    id: "1",
    name: "Center Supermarket",
    cnpj: "12.345.678/0001-90",
    manager: "João Silva",
    email: "joao@center.com",
    city: "São Paulo",
    state: "SP",
  },
  {
    id: "2",
    name: "MegaPlus Store",
    cnpj: "98.765.432/0001-10",
    manager: "Maria Santos",
    email: "maria@megaplus.com",
    city: "Rio de Janeiro",
    state: "RJ",
  },
  {
    id: "3",
    name: "SuperMix Wholesale",
    cnpj: "11.222.333/0001-44",
    manager: "Carlos Pereira",
    email: "carlos@supermix.com",
    city: "Belo Horizonte",
    state: "MG",
  },
];

export default function StoresPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStores = mockStores.filter((store) => store.name.toLowerCase().includes(searchTerm.toLowerCase()) || store.cnpj.includes(searchTerm) || store.manager.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Stores</h1>
            <p className="text-sm text-zinc-400">Manage registered stores in the system</p>
          </div>
          <Button asChild>
            <Link href="/admin/stores/new">
              <Plus className="mr-2 h-4 w-4" />
              New Store
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input placeholder="Search by name, CNPJ or manager..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border-zinc-800 bg-zinc-950 pl-10" />
          </div>
        </div>

        {/* Stores List */}
        {filteredStores.length > 0 ? (
          <div className="grid gap-4">
            {filteredStores.map((store) => (
              <Card key={store.id} className="border-zinc-800 bg-zinc-950/80">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{store.name}</h3>
                        <span className="text-sm text-zinc-500">
                          {store.city} - {store.state}
                        </span>
                      </div>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <p className="text-xs text-zinc-500">CNPJ</p>
                          <p className="text-sm text-zinc-300">{store.cnpj}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500">Manager</p>
                          <p className="text-sm text-zinc-300">{store.manager}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500">Email</p>
                          <p className="text-sm text-zinc-300">{store.email}</p>
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
              <p className="text-zinc-400">No stores found with the search terms.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
