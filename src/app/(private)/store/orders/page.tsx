"use client";

import { useState } from "react";
import { Package, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface OrderProduct {
  id: string;
  nome: string;
  quantidade: number;
  valorUnitario: number;
  subtotal: number;
}

interface Order {
  id: string;
  fornecedor: {
    id: string;
    nome: string;
  };
  valorTotal: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  dataCriacao: Date;
  produtos: OrderProduct[];
  cashback?: number;
  prazoEntrega?: number;
  condicoesComerciais?: {
    descontoPercentual?: number;
    prazoNegociado?: number;
  };
}

const mockOrders: Order[] = [
  {
    id: "PED-001",
    fornecedor: { id: "1", nome: "Tech Distribuidora" },
    valorTotal: 8459.88,
    status: "delivered",
    dataCriacao: new Date("2024-10-15"),
    produtos: [
      {
        id: "1",
        nome: "Notebook Dell Inspiron 15",
        quantidade: 2,
        valorUnitario: 3299.99,
        subtotal: 6599.98,
      },
      {
        id: "2",
        nome: "Mouse Logitech MX Master 3",
        quantidade: 4,
        valorUnitario: 459.9,
        subtotal: 1839.6,
      },
    ],
    cashback: 169.2,
    prazoEntrega: 7,
    condicoesComerciais: {
      descontoPercentual: 5,
      prazoNegociado: 30,
    },
  },
  {
    id: "PED-002",
    fornecedor: { id: "2", nome: "Office Solutions" },
    valorTotal: 3597.0,
    status: "processing",
    dataCriacao: new Date("2024-10-28"),
    produtos: [
      {
        id: "3",
        nome: "Cadeira Gamer DT3Sports",
        quantidade: 3,
        valorUnitario: 1199.0,
        subtotal: 3597.0,
      },
    ],
    cashback: 71.94,
    prazoEntrega: 5,
  },
  {
    id: "PED-003",
    fornecedor: { id: "1", nome: "Tech Distribuidora" },
    valorTotal: 1899.99,
    status: "shipped",
    dataCriacao: new Date("2024-11-01"),
    produtos: [
      {
        id: "4",
        nome: 'Monitor LG UltraWide 29"',
        quantidade: 1,
        valorUnitario: 1899.99,
        subtotal: 1899.99,
      },
    ],
    prazoEntrega: 3,
  },
];

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  processing: { label: "Processing", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  shipped: { label: "Shipped", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  delivered: { label: "Delivered", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  cancelled: { label: "Cancelled", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

export default function StoreOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = statusFilter === "all" ? mockOrders : mockOrders.filter((order) => order.status === statusFilter);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white">My Orders</h1>
          <p className="text-sm text-zinc-400">Track and manage your purchase orders</p>
        </div>

        {/* Status Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
            className={statusFilter !== "all" ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white" : ""}>
            All Orders
          </Button>
          {Object.entries(statusConfig).map(([status, config]) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className={statusFilter !== status ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white" : ""}>
              {config.label}
            </Button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card className="border-zinc-800 bg-zinc-950/80">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Package className="mb-4 h-16 w-16 text-zinc-600" />
              <p className="mb-2 text-lg text-zinc-300">No orders found</p>
              <p className="text-sm text-zinc-500">Try adjusting the filters</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="border-zinc-800 bg-zinc-950/80 transition hover:border-zinc-700">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{order.id}</h3>
                        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusConfig[order.status].color}`}>{statusConfig[order.status].label}</span>
                      </div>
                      <p className="text-sm text-zinc-400">
                        Supplier: <span className="text-zinc-200">{order.fornecedor.nome}</span>
                      </p>
                    </div>
                    <Button variant="default" size="sm" onClick={() => setSelectedOrder(order)} className="gap-2">
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-zinc-500">Total Amount</p>
                      <p className="text-lg font-bold text-white">{formatCurrency(order.valorTotal)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Order Date</p>
                      <p className="text-sm text-zinc-200">{formatDate(order.dataCriacao)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Items</p>
                      <p className="text-sm text-zinc-200">{order.produtos.reduce((sum, p) => sum + p.quantidade, 0)} products</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl border-zinc-800 bg-zinc-950 text-zinc-100">
          <DialogHeader>
            <DialogTitle className="text-white">Order Details</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {selectedOrder?.id} • {selectedOrder && formatDate(selectedOrder.dataCriacao)}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Supplier Info */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500">Supplier</p>
                    <p className="text-lg font-semibold text-white">{selectedOrder.fornecedor.nome}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusConfig[selectedOrder.status].color}`}>{statusConfig[selectedOrder.status].label}</span>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-white">Products</h3>
                <div className="space-y-3">
                  {selectedOrder.produtos.map((product) => (
                    <div key={product.id} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/30 p-3">
                      <div className="flex-1">
                        <p className="font-medium text-white">{product.nome}</p>
                        <p className="text-sm text-zinc-400">
                          {formatCurrency(product.valorUnitario)} × {product.quantidade}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-white">{formatCurrency(product.subtotal)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-zinc-800" />

              {/* Commercial Terms & Benefits */}
              {(selectedOrder.condicoesComerciais || selectedOrder.cashback) && (
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <h3 className="mb-3 text-sm font-semibold text-white">Commercial Terms & Benefits</h3>
                  <div className="space-y-2 text-sm">
                    {selectedOrder.condicoesComerciais?.descontoPercentual && (
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Discount Applied</span>
                        <span className="text-green-400">{selectedOrder.condicoesComerciais.descontoPercentual}%</span>
                      </div>
                    )}
                    {selectedOrder.condicoesComerciais?.prazoNegociado && (
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Payment Term</span>
                        <span className="text-zinc-200">{selectedOrder.condicoesComerciais.prazoNegociado} days</span>
                      </div>
                    )}
                    {selectedOrder.cashback && (
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Cashback</span>
                        <span className="text-green-400">{formatCurrency(selectedOrder.cashback)}</span>
                      </div>
                    )}
                    {selectedOrder.prazoEntrega && (
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Delivery Time</span>
                        <span className="text-zinc-200">{selectedOrder.prazoEntrega} days</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-white">Total Amount</span>
                  <span className="text-2xl font-bold text-white">{formatCurrency(selectedOrder.valorTotal)}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
