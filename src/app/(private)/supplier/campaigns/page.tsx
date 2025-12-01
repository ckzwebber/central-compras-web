"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Plus, MoreVertical, Edit, Trash2, Power, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { supplierService, type SupplierCampaign } from "@/lib/supplier.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

type CampaignStatus = "ativo" | "inativo";

export default function SupplierCampaignsPage() {
  const [campaigns, setCampaigns] = useState<SupplierCampaign[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<CampaignStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await supplierService.getCampaigns();
      setCampaigns(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesSearch = campaign.nome.toLowerCase().includes(searchQuery.toLowerCase()) || (campaign.descricao?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesStatus = filterStatus === "all" || campaign.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [campaigns, searchQuery, filterStatus]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const handleEdit = (id: string) => {};

  const handleDelete = async (id: string) => {
    try {
      await supplierService.deleteCampaign(id);
      setCampaigns(campaigns.filter((c) => c.id !== id));
      setDeleteDialogOpen(false);
      setCampaignToDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete campaign");
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: CampaignStatus) => {
    try {
      const newStatus: CampaignStatus = currentStatus === "ativo" ? "inativo" : "ativo";
      const updated = await supplierService.updateCampaign(id, { status: newStatus });
      setCampaigns(campaigns.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update campaign status");
    }
  };

  const confirmDelete = (id: string) => {
    setCampaignToDelete(id);
    setDeleteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Search & Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input placeholder="Search campaigns..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border-zinc-800 bg-zinc-950 pl-10" />
          </div>

          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              className={filterStatus !== "all" ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white" : ""}>
              All
            </Button>
            <Button
              variant={filterStatus === "ativo" ? "default" : "outline"}
              onClick={() => setFilterStatus("ativo")}
              className={filterStatus !== "ativo" ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white" : ""}>
              Active
            </Button>
            <Button
              variant={filterStatus === "inativo" ? "default" : "outline"}
              onClick={() => setFilterStatus("inativo")}
              className={filterStatus !== "inativo" ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white" : ""}>
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
                            campaign.status === "ativo"
                              ? "border-green-500/20 bg-green-500/10 text-green-400"
                              : campaign.status === "inativo"
                              ? "border-zinc-700 bg-zinc-800/50 text-zinc-400"
                              : "border-red-500/20 bg-red-500/10 text-red-400"
                          }`}>
                          {campaign.status === "ativo" ? "Active" : campaign.status === "inativo" ? "Inactive" : "Expired"}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-zinc-400">{campaign.descricao}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="default" size="icon" className="h-8 w-8 text-zinc-400">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-950">
                        <DropdownMenuItem onClick={() => handleEdit(campaign.id)} className="text-zinc-300 focus:bg-zinc-900 focus:text-zinc-300">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleStatus(campaign.id, campaign.status)}
                          className={campaign.status === "ativo" ? "text-yellow-400 focus:bg-zinc-900 focus:text-yellow-400" : "text-green-400 focus:bg-zinc-900 focus:text-green-400"}>
                          <Power className="mr-2 h-4 w-4" />
                          {campaign.status === "ativo" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-zinc-800" />
                        <DropdownMenuItem onClick={() => confirmDelete(campaign.id)} className="text-red-400 focus:bg-zinc-900 focus:text-red-400">
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
                      <span className="text-lg font-bold text-green-400">{campaign.desconto_porcentagem}%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Min. Value:</span>
                      <span className="font-medium text-white">{campaign.valor_min ? formatCurrency(campaign.valor_min) : "N/A"}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Min. Qty:</span>
                      <span className="font-medium text-white">{campaign.quantidade_min ? `${campaign.quantidade_min} items` : "N/A"}</span>
                    </div>

                    {(campaign.criado_em || campaign.atualizado_em) && (
                      <div className="border-t border-zinc-800 pt-3">
                        <div className="flex items-center justify-between text-xs text-zinc-500">
                          {campaign.criado_em && <span>Created: {formatDate(campaign.criado_em)}</span>}
                          {campaign.atualizado_em && <span>Updated: {formatDate(campaign.atualizado_em)}</span>}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="border-zinc-800 bg-zinc-950">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Campaign</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">Are you sure you want to delete this campaign? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => campaignToDelete && handleDelete(campaignToDelete)} className="bg-red-600 text-white hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
