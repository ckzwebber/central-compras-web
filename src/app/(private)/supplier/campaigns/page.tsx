"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Plus, MoreVertical, Edit, Trash2, Power, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { supplierService } from "@/lib/supplier.service";
import type { SupplierCampaign } from "@/types/supplier";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<SupplierCampaign | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleOpenDialog = (campaign?: SupplierCampaign) => {
    if (campaign) {
      setEditingCampaign(campaign);
    } else {
      setEditingCampaign(null);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCampaign(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const campaignData = {
        nome: formData.get("nome") as string,
        descricao: (formData.get("descricao") as string) || undefined,
        valor_min: formData.get("valor_min") ? parseFloat(formData.get("valor_min") as string) : undefined,
        quantidade_min: formData.get("quantidade_min") ? parseInt(formData.get("quantidade_min") as string) : undefined,
        desconto_porcentagem: parseFloat(formData.get("desconto_porcentagem") as string),
      };

      if (editingCampaign) {
        const updated = await supplierService.updateCampaign(editingCampaign.id, campaignData);
        setCampaigns(campaigns.map((c) => (c.id === editingCampaign.id ? updated : c)));
      } else {
        const created = await supplierService.createCampaign(campaignData);
        setCampaigns([...campaigns, created]);
      }

      handleCloseDialog();
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "Failed to save campaign");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (id: string) => {
    const campaign = campaigns.find((c) => c.id === id);
    if (campaign) {
      handleOpenDialog(campaign);
    }
  };

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
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Campaigns</h1>
            <p className="text-sm text-zinc-400">Manage your promotional campaigns</p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-100">
          <DialogHeader>
            <DialogTitle className="text-white">{editingCampaign ? "Edit Campaign" : "New Campaign"}</DialogTitle>
            <DialogDescription className="text-zinc-400">Define promotional conditions and discounts</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Campaign Name</Label>
              <Input id="nome" name="nome" required defaultValue={editingCampaign?.nome || ""} placeholder="Summer Sale" className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Description</Label>
              <Input id="descricao" minLength={10} name="descricao" defaultValue={editingCampaign?.descricao || ""} placeholder="Special discount for summer season" className="border-zinc-800 bg-zinc-950" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="desconto_porcentagem">Discount (%)</Label>
                <Input
                  id="desconto_porcentagem"
                  name="desconto_porcentagem"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  required
                  defaultValue={editingCampaign?.desconto_porcentagem || ""}
                  placeholder="10.00"
                  className="border-zinc-800 bg-zinc-950"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor_min">Min. Value (R$) (optional)</Label>
                <Input id="valor_min" name="valor_min" type="number" step="0.01" min="0" defaultValue={editingCampaign?.valor_min || ""} placeholder="100.00" className="border-zinc-800 bg-zinc-950" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantidade_min">Min. Quantity (optional)</Label>
              <Input id="quantidade_min" name="quantidade_min" type="number" min="1" defaultValue={editingCampaign?.quantidade_min || ""} placeholder="10" className="border-zinc-800 bg-zinc-950" />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog} disabled={isSubmitting} className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>{editingCampaign ? "Update" : "Create"}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
