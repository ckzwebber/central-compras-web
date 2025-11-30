"use client";

import { useState, useMemo } from "react";
import { Search, Eye, Package as PackageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

interface OrderProduct {
  id: string;
  nome: string;
  quantidade: number;
  valorUnitario: number;
  subtotal: number;
}

interface Order {
  id: string;
  loja: {
    nome: string;
    cidade: string;
    estado: string;
  };
  data: string;
  valorTotal: number;
  status: OrderStatus;
  produtos: OrderProduct[];
  condicoesComerciais?: {
    cashback: number;
    prazo: number;
    acrescimo: number;
  };
}

const mockOrders: Order[] = [
  {
    id: "#ORD-1234",
    loja: {
      nome: "Supermercado ABC",
      cidade: "São Paulo",
      estado: "SP",
    },
    data: "2024-11-01T10:30:00",
    valorTotal: 2459.9,
    status: "pending",
    produtos: [
      { id: "1", nome: "Notebook Dell Inspiron 15", quantidade: 2, valorUnitario: 3299.99, subtotal: 6599.98 },
      { id: "2", nome: "Mouse Logitech MX Master 3", quantidade: 5, valorUnitario: 459.9, subtotal: 2299.5 },
    ],
    condicoesComerciais: {
      cashback: 2.5,
      prazo: 30,
      acrescimo: 0,
    },
  },
  {
    id: "#ORD-1233",
    loja: {
      nome: "Loja do Bairro",
      cidade: "Rio de Janeiro",
      estado: "RJ",
    },
    data: "2024-11-01T14:20:00",
    valorTotal: 1299.5,
    status: "processing",
    produtos: [{ id: "3", nome: "Cadeira Gamer DT3Sports", quantidade: 1, valorUnitario: 1199.0, subtotal: 1199.0 }],
    condicoesComerciais: {
      cashback: 3.0,
      prazo: 45,
      acrescimo: 50,
    },
  },
  {
    id: "#ORD-1232",
    loja: {
      nome: "Minimercado XYZ",
      cidade: "Belo Horizonte",
      estado: "MG",
    },
    data: "2024-10-31T09:15:00",
    valorTotal: 3890.0,
    status: "shipped",
    produtos: [{ id: "4", nome: 'Monitor LG UltraWide 29"', quantidade: 2, valorUnitario: 1899.99, subtotal: 3799.98 }],
  },
  {
    id: "#ORD-1231",
    loja: {
      nome: "Mercearia Central",
      cidade: "Curitiba",
      estado: "PR",
    },
    data: "2024-10-31T16:45:00",
    valorTotal: 890.75,
    status: "delivered",
    produtos: [{ id: "5", nome: "Teclado Mecânico Keychron K2", quantidade: 1, valorUnitario: 699.9, subtotal: 699.9 }],
  },
];

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  processing: { label: "Processing", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  shipped: { label: "Shipped", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  delivered: { label: "Delivered", color: "bg-green-500/10 text-green-400 border-green-500/20" },
};

export default function SupplierOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    let orders = mockOrders;

    // Filter by status
    if (filterStatus !== "all") {
      orders = orders.filter((order) => order.status === filterStatus);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      orders = orders.filter((order) => order.id.toLowerCase().includes(query) || order.loja.nome.toLowerCase().includes(query));
    }

    return orders;
  }, [searchQuery, filterStatus]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    // TODO: API call
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Orders</h1>
          <p className="text-sm text-zinc-400">Manage orders from stores</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input placeholder="Search by order ID or store..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border-zinc-800 bg-zinc-950 pl-10" />
          </div>

          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              className={filterStatus !== "all" ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white" : ""}>
              All
            </Button>
            <Button
              variant={filterStatus === "pending" ? "default" : "outline"}
              onClick={() => setFilterStatus("pending")}
              className={filterStatus !== "pending" ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white" : ""}>
              Pending
            </Button>
            <Button
              variant={filterStatus === "processing" ? "default" : "outline"}
              onClick={() => setFilterStatus("processing")}
              className={filterStatus !== "processing" ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white" : ""}>
              Processing
            </Button>
            <Button
              variant={filterStatus === "shipped" ? "default" : "outline"}
              onClick={() => setFilterStatus("shipped")}
              className={filterStatus !== "shipped" ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white" : ""}>
              Shipped
            </Button>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card className="border-zinc-800 bg-zinc-950/80">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-zinc-400">No orders found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => {
              const status = statusConfig[order.status];
              return (
                <Card key={order.id} className="border-zinc-800 bg-zinc-950/80 transition hover:border-zinc-700 hover:bg-zinc-900/60">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-1 items-center gap-4">
                        {/* Order Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-medium text-white">{order.id}</span>
                            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.color}`}>{status.label}</span>
                          </div>
                          <div className="mt-1 text-sm text-zinc-400">
                            <span className="font-medium text-zinc-300">{order.loja.nome}</span>
                            <span className="mx-2">•</span>
                            <span>
                              {order.loja.cidade}, {order.loja.estado}
                            </span>
                            <span className="mx-2">•</span>
                            <span>{formatDate(order.data)}</span>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="hidden text-right sm:block">
                          <div className="text-lg font-semibold text-white">{formatCurrency(order.valorTotal)}</div>
                          <div className="text-xs text-zinc-500">{order.produtos.length} item(s)</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)} className="border-zinc-800 text-zinc-950 hover:text-zinc-500">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        {order.status === "pending" && (
                          <Button size="sm" onClick={() => handleUpdateStatus(order.id, "processing")} className="bg-blue-600 hover:bg-blue-700">
                            <PackageIcon className="mr-2 h-4 w-4" />
                            Process
                          </Button>
                        )}
                        {order.status === "processing" && (
                          <Button size="sm" onClick={() => handleUpdateStatus(order.id, "shipped")} className="bg-purple-600 hover:bg-purple-700">
                            <PackageIcon className="mr-2 h-4 w-4" />
                            Ship
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl border-zinc-800 bg-zinc-950 text-zinc-100">
          <DialogHeader>
            <DialogTitle className="text-white">Order Details</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {selectedOrder?.id} - {selectedOrder?.loja.nome}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Store Info */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-white">Store Information</h3>
                <div className="space-y-1 text-sm text-zinc-400">
                  <p>
                    <span className="font-medium text-zinc-300">Name:</span> {selectedOrder.loja.nome}
                  </p>
                  <p>
                    <span className="font-medium text-zinc-300">Location:</span> {selectedOrder.loja.cidade}, {selectedOrder.loja.estado}
                  </p>
                  <p>
                    <span className="font-medium text-zinc-300">Date:</span> {formatDate(selectedOrder.data)}
                  </p>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-white">Products</h3>
                <div className="space-y-2">
                  {selectedOrder.produtos.map((produto) => (
                    <div key={produto.id} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{produto.nome}</p>
                        <p className="text-xs text-zinc-400">
                          {produto.quantidade}x {formatCurrency(produto.valorUnitario)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-white">{formatCurrency(produto.subtotal)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commercial Terms */}
              {selectedOrder.condicoesComerciais && (
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <h3 className="mb-2 text-sm font-semibold text-white">Commercial Terms Applied</h3>
                  <div className="grid gap-2 text-sm sm:grid-cols-3">
                    <div>
                      <span className="text-zinc-400">Cashback:</span>
                      <span className="ml-2 font-medium text-green-400">{selectedOrder.condicoesComerciais.cashback}%</span>
                    </div>
                    <div>
                      <span className="text-zinc-400">Payment Term:</span>
                      <span className="ml-2 font-medium text-zinc-200">{selectedOrder.condicoesComerciais.prazo} days</span>
                    </div>
                    <div>
                      <span className="text-zinc-400">Additional Fee:</span>
                      <span className="ml-2 font-medium text-zinc-200">{formatCurrency(selectedOrder.condicoesComerciais.acrescimo)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                <span className="text-sm font-medium text-zinc-300">Total:</span>
                <span className="text-2xl font-bold text-white">{formatCurrency(selectedOrder.valorTotal)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
