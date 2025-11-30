"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CommercialTerm {
  id: string;
  estado: string;
  cashback: number;
  prazoPagamento: number;
  acrescimo: number;
}

const brazilianStates = [
  { uf: "AC", name: "Acre" },
  { uf: "AL", name: "Alagoas" },
  { uf: "AP", name: "Amapá" },
  { uf: "AM", name: "Amazonas" },
  { uf: "BA", name: "Bahia" },
  { uf: "CE", name: "Ceará" },
  { uf: "DF", name: "Distrito Federal" },
  { uf: "ES", name: "Espírito Santo" },
  { uf: "GO", name: "Goiás" },
  { uf: "MA", name: "Maranhão" },
  { uf: "MT", name: "Mato Grosso" },
  { uf: "MS", name: "Mato Grosso do Sul" },
  { uf: "MG", name: "Minas Gerais" },
  { uf: "PA", name: "Pará" },
  { uf: "PB", name: "Paraíba" },
  { uf: "PR", name: "Paraná" },
  { uf: "PE", name: "Pernambuco" },
  { uf: "PI", name: "Piauí" },
  { uf: "RJ", name: "Rio de Janeiro" },
  { uf: "RN", name: "Rio Grande do Norte" },
  { uf: "RS", name: "Rio Grande do Sul" },
  { uf: "RO", name: "Rondônia" },
  { uf: "RR", name: "Roraima" },
  { uf: "SC", name: "Santa Catarina" },
  { uf: "SP", name: "São Paulo" },
  { uf: "SE", name: "Sergipe" },
  { uf: "TO", name: "Tocantins" },
];

const mockTerms: CommercialTerm[] = [
  { id: "1", estado: "SP", cashback: 2.5, prazoPagamento: 30, acrescimo: 0 },
  { id: "2", estado: "RJ", cashback: 3.0, prazoPagamento: 45, acrescimo: 50 },
  { id: "3", estado: "MG", cashback: 2.0, prazoPagamento: 30, acrescimo: 0 },
];

export default function SupplierTermsPage() {
  const [terms, setTerms] = useState<CommercialTerm[]>(mockTerms);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTerm, setEditingTerm] = useState<CommercialTerm | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getStateName = (uf: string) => {
    return brazilianStates.find((state) => state.uf === uf)?.name || uf;
  };

  const handleOpenDialog = (term?: CommercialTerm) => {
    if (term) {
      setEditingTerm(term);
    } else {
      setEditingTerm(null);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTerm(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const newTerm: CommercialTerm = {
      id: editingTerm?.id || String(Date.now()),
      estado: formData.get("estado") as string,
      cashback: parseFloat(formData.get("cashback") as string),
      prazoPagamento: parseInt(formData.get("prazoPagamento") as string),
      acrescimo: parseFloat(formData.get("acrescimo") as string),
    };

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (editingTerm) {
      setTerms(terms.map((t) => (t.id === editingTerm.id ? newTerm : t)));
    } else {
      setTerms([...terms, newTerm]);
    }

    setIsSubmitting(false);
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this commercial term?")) {
      setTerms(terms.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Commercial Terms</h1>
            <p className="text-sm text-zinc-400">Manage payment terms and conditions by state</p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Term
          </Button>
        </div>

        {/* Terms List */}
        {terms.length === 0 ? (
          <Card className="border-zinc-800 bg-zinc-950/80">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-zinc-400">No commercial terms found.</p>
              <Button onClick={() => handleOpenDialog()} variant="outline" className="mt-4 border-zinc-800">
                <Plus className="mr-2 h-4 w-4" />
                Add your first term
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {terms.map((term) => (
              <Card key={term.id} className="border-zinc-800 bg-zinc-950/80 transition hover:border-zinc-700 hover:bg-zinc-900/60">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-white">{term.estado}</CardTitle>
                      <p className="text-sm text-zinc-400">{getStateName(term.estado)}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(term)} className="h-8 w-8 text-zinc-400 hover:text-black">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(term.id)} className="h-8 w-8 text-zinc-400 hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Cashback:</span>
                    <span className="font-semibold text-green-400">{term.cashback}%</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Payment Term:</span>
                    <span className="font-medium text-white">{term.prazoPagamento} days</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-800 pt-3 text-sm">
                    <span className="text-zinc-400">Additional Fee:</span>
                    <span className="font-medium text-white">{formatCurrency(term.acrescimo)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-100">
          <DialogHeader>
            <DialogTitle className="text-white">{editingTerm ? "Edit Commercial Term" : "New Commercial Term"}</DialogTitle>
            <DialogDescription className="text-zinc-400">Define commercial conditions for a specific state</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="estado">State (UF)</Label>
              <select
                id="estado"
                name="estado"
                required
                defaultValue={editingTerm?.estado || ""}
                className="h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-200 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40">
                <option value="">Select a state</option>
                {brazilianStates.map((state) => (
                  <option key={state.uf} value={state.uf}>
                    {state.uf} - {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cashback">Cashback (%)</Label>
                <Input id="cashback" name="cashback" type="number" step="0.01" min="0" max="100" placeholder="0.00" required defaultValue={editingTerm?.cashback} className="border-zinc-800 bg-zinc-950" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prazoPagamento">Payment Term (days)</Label>
                <Input id="prazoPagamento" name="prazoPagamento" type="number" min="0" placeholder="0" required defaultValue={editingTerm?.prazoPagamento} className="border-zinc-800 bg-zinc-950" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="acrescimo">Additional Fee (BRL)</Label>
              <Input id="acrescimo" name="acrescimo" type="number" step="0.01" min="0" placeholder="0.00" required defaultValue={editingTerm?.acrescimo} className="border-zinc-800 bg-zinc-950" />
              <p className="text-xs text-zinc-500">Additional fee per unit (if applicable)</p>
            </div>

            <DialogFooter>
              <Button type="button" variant="default" onClick={handleCloseDialog} className="text-zinc-300 hover:text-white">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : editingTerm ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
