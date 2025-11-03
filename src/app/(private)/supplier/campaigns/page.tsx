"use client";

import { useState, useMemo } from "react";
import { Search, Plus, MoreVertical, Edit, Trash2, Power } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Campaign {
  id: string;
  nome: string;
  descricao: string;
  valorMinimo: number;
  quantidadeMinima: number;
  descontoPercentual: number;
  status: "active" | "inactive";
  dataInicio: string;
  dataFim: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    nome: "Black Friday 2024",
    descricao: "Special discounts for bulk purchases during Black Friday",
    valorMinimo: 5000,
    quantidadeMinima: 10,
    descontoPercentual: 15,
    status: "active",
    dataInicio: "2024-11-20",
    dataFim: "2024-11-30",
  },
  {
    id: "2",
    nome: "New Customers Welcome",
    descricao: "Special discount for first-time buyers",
    valorMinimo: 1000,
    quantidadeMinima: 5,
    descontoPercentual: 10,
    status: "active",
    dataInicio: "2024-01-01",
    dataFim: "2024-12-31",
  },
  {
    id: "3",
    nome: "Summer Sale",
    descricao: "Summer special offers",
    valorMinimo: 3000,
    quantidadeMinima: 8,
    descontoPercentual: 12,
    status: "inactive",
    dataInicio: "2024-12-01",
    dataFim: "2024-12-31",
  },
];

export default function SupplierCampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

  const filteredCampaigns = useMemo(() => {
    let campaigns = mockCampaigns;

    // Filter by status
    if (filterStatus !== "all") {
      campaigns = campaigns.filter((campaign) => campaign.status === filterStatus);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      campaigns = campaigns.filter((campaign) => campaign.nome.toLowerCase().includes(query) || campaign.descricao.toLowerCase().includes(query));
    }

    return campaigns;
  }, [searchQuery, filterStatus]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const handleEdit = (id: string) => {
    console.log("Edit campaign:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete campaign:", id);
    // TODO: Show confirm dialog
  };

  const handleToggleStatus = (id: string, currentStatus: "active" | "inactive") => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    console.log(`Toggle campaign ${id} to ${newStatus}`);
    // TODO: API call
    alert(`Campaign ${currentStatus === "active" ? "deactivated" : "activated"}`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Promotional Campaigns</h1>
            <p className="text-sm text-zinc-400">Manage your promotions and discounts</p>
          </div>
          <Button asChild className="sm:w-auto">
            <Link href="/supplier/campaigns/new">
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Link>
          </Button>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input placeholder="Search campaigns..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border-zinc-800 bg-zinc-950 pl-10" />
          </div>

          <div className="flex gap-2">
            <Button variant={filterStatus === "all" ? "default" : "outline"} onClick={() => setFilterStatus("all")} className={filterStatus !== "all" ? "border-zinc-800 text-zinc-950 hover:text-zinc-500" : ""}>
              All
            </Button>
            <Button variant={filterStatus === "active" ? "default" : "outline"} onClick={() => setFilterStatus("active")} className={filterStatus !== "active" ? "border-zinc-800 text-zinc-950 hover:text-zinc-500" : ""}>
              Active
            </Button>
            <Button
              variant={filterStatus === "inactive" ? "default" : "outline"}
              onClick={() => setFilterStatus("inactive")}
              className={filterStatus !== "inactive" ? "border-zinc-800 text-zinc-950 hover:text-zinc-500" : ""}>
              Inactive
            </Button>
          </div>
        </div>

        {/* Campaigns Grid */}
        {filteredCampaigns.length === 0 ? (
          <Card className="border-zinc-800 bg-zinc-950/80">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-zinc-400">No campaigns found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="group border-zinc-800 bg-zinc-950/80 transition hover:border-zinc-700 hover:bg-zinc-900/60">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-white">{campaign.nome}</h3>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                            campaign.status === "active" ? "border-green-500/20 bg-green-500/10 text-green-400" : "border-zinc-700 bg-zinc-800/50 text-zinc-400"
                          }`}>
                          {campaign.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-zinc-400">{campaign.descricao}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="default" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-950">
                        <DropdownMenuItem onClick={() => handleEdit(campaign.id)} className="text-zinc-300 hover:text-white">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleStatus(campaign.id, campaign.status)}
                          className={campaign.status === "active" ? "text-yellow-400 hover:text-yellow-300" : "text-green-400 hover:text-green-300"}>
                          <Power className="mr-2 h-4 w-4" />
                          {campaign.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-zinc-800" />
                        <DropdownMenuItem onClick={() => handleDelete(campaign.id)} className="text-red-400 hover:text-red-300">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Discount:</span>
                      <span className="text-lg font-bold text-green-400">{campaign.descontoPercentual}%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Min. Value:</span>
                      <span className="font-medium text-white">{formatCurrency(campaign.valorMinimo)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Min. Qty:</span>
                      <span className="font-medium text-white">{campaign.quantidadeMinima} items</span>
                    </div>

                    <div className="border-t border-zinc-800 pt-3">
                      <div className="flex items-center justify-between text-xs text-zinc-500">
                        <span>{formatDate(campaign.dataInicio)}</span>
                        <span>→</span>
                        <span>{formatDate(campaign.dataFim)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
