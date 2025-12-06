"use client";

import { useState, useEffect } from "react";
import { Package, Eye, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { pedidosService } from "@/lib/pedidos.service";
import { Pedido } from "@/types/pedido";

const statusConfig = {
  pendente: { label: "Pending", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  processando: { label: "Processing", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  enviado: { label: "Shipped", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  entregue: { label: "Delivered", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  cancelado: { label: "Cancelled", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

export default function StoreOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Pedido | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPedidos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await pedidosService.getMeusPedidos();
        setPedidos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar pedidos");
      } finally {
        setIsLoading(false);
      }
    };

    loadPedidos();
  }, []);

  const filteredOrders = statusFilter === "all" ? pedidos : pedidos.filter((order) => order.status === statusFilter);

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
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white">My Orders</h1>
          <p className="text-sm text-zinc-400">Track and manage your purchase orders</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 border-red-900 bg-red-950/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
          </div>
        ) : (
          <>
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

            {filteredOrders.length === 0 ? (
              <Card className="border-zinc-800 bg-zinc-950/80">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Package className="mb-4 h-16 w-16 text-zinc-600" />
                  <p className="mb-2 text-lg text-zinc-300">No orders found</p>
                  <p className="text-sm text-zinc-500">{statusFilter === "all" ? "You haven't placed any orders yet" : "Try adjusting the filters"}</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pendente;
                  return (
                    <Card key={order.id} className="border-zinc-800 bg-zinc-950/80 transition hover:border-zinc-700">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold text-white">{order.id}</h3>
                              <span className={`rounded-full border px-3 py-1 text-xs font-medium ${status.color}`}>{status.label}</span>
                            </div>
                            <p className="text-sm text-zinc-400">
                              Loja: <span className="text-zinc-200">{order.loja?.nome || "N/A"}</span>
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
                            <p className="text-lg font-bold text-white">{formatCurrency(parseFloat(order.valor_total))}</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500">Order Date</p>
                            <p className="text-sm text-zinc-200">{formatDate(new Date(order.criado_em))}</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500">Payment Method</p>
                            <p className="text-sm text-zinc-200">{order.forma_pagamento.replace(/_/g, " ")}</p>
                          </div>
                        </div>
                        {order.itens && order.itens.length > 0 && (
                          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
                            <p className="mb-1 text-xs text-zinc-500">Products ({order.itens.length})</p>
                            <div className="space-y-1">
                              {order.itens.slice(0, 2).map((item) => (
                                <p key={item.id} className="text-sm text-zinc-300">
                                  {item.produto_nome || "Produto"} - {item.quantidade}x
                                </p>
                              ))}
                              {order.itens.length > 2 && <p className="text-xs text-zinc-500">+{order.itens.length - 2} more items</p>}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl border-zinc-800 bg-zinc-950 text-zinc-100">
          <DialogHeader>
            <DialogTitle className="text-white">Order Details</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {selectedOrder?.id} • {selectedOrder && formatDate(new Date(selectedOrder.criado_em))}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500">Loja</p>
                    <p className="text-lg font-semibold text-white">{selectedOrder.loja?.nome || "N/A"}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusConfig[selectedOrder.status as keyof typeof statusConfig]?.color || statusConfig.pendente.color}`}>
                    {statusConfig[selectedOrder.status as keyof typeof statusConfig]?.label || "Pending"}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-white">Products</h3>
                <div className="space-y-3">
                  {selectedOrder.itens && selectedOrder.itens.length > 0 ? (
                    selectedOrder.itens.map((item) => (
                      <div key={item.id} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/30 p-3">
                        <div className="flex-1">
                          <p className="font-medium text-white">{item.produto_nome || "Produto"}</p>
                          <p className="text-sm text-zinc-400">
                            {formatCurrency(parseFloat(item.valor_unitario))} × {item.quantidade}
                          </p>
                        </div>
                        <p className="text-lg font-bold text-white">{formatCurrency(parseFloat(item.valor_unitario) * item.quantidade)}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-400">Nenhum produto encontrado</p>
                  )}
                </div>
              </div>

              <Separator className="bg-zinc-800" />

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <h3 className="mb-3 text-sm font-semibold text-white">Order Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Payment Method</span>
                    <span className="text-zinc-200">{selectedOrder.forma_pagamento.replace(/_/g, " ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Delivery Term</span>
                    <span className="text-zinc-200">{selectedOrder.prazo_dias} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Order Date</span>
                    <span className="text-zinc-200">{formatDate(new Date(selectedOrder.criado_em))}</span>
                  </div>
                  {selectedOrder.enviado_em && (
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Shipped Date</span>
                      <span className="text-zinc-200">{formatDate(new Date(selectedOrder.enviado_em))}</span>
                    </div>
                  )}
                  {selectedOrder.entregue_em && (
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Delivered Date</span>
                      <span className="text-zinc-200">{formatDate(new Date(selectedOrder.entregue_em))}</span>
                    </div>
                  )}
                  {selectedOrder.descricao && (
                    <div className="pt-2">
                      <p className="text-zinc-400">Description:</p>
                      <p className="text-zinc-200">{selectedOrder.descricao}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-white">Total Amount</span>
                  <span className="text-2xl font-bold text-white">{formatCurrency(parseFloat(selectedOrder.valor_total))}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
