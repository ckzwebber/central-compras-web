"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Eye, Package as PackageIcon, Loader2, AlertCircle, Truck, CheckCircle, XCircle } from "lucide-react";
import { supplierService } from "@/lib/supplier.service";
import type { SupplierOrder } from "@/types/supplier";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

type OrderStatus = "pendente" | "processando" | "enviado" | "entregue" | "cancelado";

const statusConfig = {
  pendente: { label: "Pending", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  processando: { label: "Processing", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  enviado: { label: "Shipped", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  entregue: { label: "Delivered", color: "bg-green-500/10 text-green-400 border-green-500/20" },
  cancelado: { label: "Canceled", color: "bg-red-500/10 text-red-400 border-red-500/20" },
};

export default function SupplierOrdersPage() {
  const [orders, setOrders] = useState<SupplierOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<SupplierOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await supplierService.getMyOrders();
      setOrders(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const getAvailableStatusTransitions = (currentStatus: string): OrderStatus[] => {
    switch (currentStatus) {
      case "pendente":
        return ["processando", "cancelado"];
      case "processando":
        return ["enviado", "cancelado"];
      case "enviado":
        return ["entregue"];
      case "entregue":
        return [];
      case "cancelado":
        return [];
      default:
        return [];
    }
  };

  const filteredOrders = useMemo(() => {
    let filteredOrders = orders;

    if (filterStatus !== "all") {
      filteredOrders = filteredOrders.filter((order) => order.status === filterStatus);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredOrders = filteredOrders.filter((order) => order.id.toLowerCase().includes(query) || order.loja.nome.toLowerCase().includes(query));
    }

    return filteredOrders;
  }, [searchQuery, filterStatus, orders]);

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

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Orders</h1>
          <p className="text-sm text-zinc-400">Manage orders from stores</p>
        </div>

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
              variant={filterStatus === "pendente" ? "default" : "outline"}
              onClick={() => setFilterStatus("pendente")}
              className={filterStatus !== "pendente" ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white" : ""}>
              Pending
            </Button>
            <Button
              variant={filterStatus === "processando" ? "default" : "outline"}
              onClick={() => setFilterStatus("processando")}
              className={filterStatus !== "processando" ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white" : ""}>
              Processing
            </Button>
            <Button
              variant={filterStatus === "enviado" ? "default" : "outline"}
              onClick={() => setFilterStatus("enviado")}
              className={filterStatus !== "enviado" ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white" : ""}>
              Shipped
            </Button>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
          </div>
        )}

        {error && !loading && (
          <Alert className="border-red-800 bg-red-950/20">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        )}

        {!loading && !error && (
          <>
            {filteredOrders.length === 0 ? (
              <Card className="border-zinc-800 bg-zinc-950/80">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-zinc-400">{searchQuery || filterStatus !== "all" ? "No orders found matching your filters." : "No orders yet."}</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const status = statusConfig[order.status as OrderStatus];
                  const availableTransitions = getAvailableStatusTransitions(order.status);

                  return (
                    <Card key={order.id} className="border-zinc-800 bg-zinc-950/80 transition hover:border-zinc-700 hover:bg-zinc-900/60">
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-3">
                                <h3 className="text-lg font-semibold text-white">{order.id.slice(0, 8)}</h3>
                                <span className={`rounded-full border px-3 py-1 text-xs font-medium ${status.color}`}>{status.label}</span>
                              </div>
                              <div className="space-y-1 text-sm text-zinc-400">
                                <p>
                                  <span className="font-medium text-zinc-300">Store:</span> {order.loja.nome}
                                </p>
                                <p>
                                  <span className="font-medium text-zinc-300">Date:</span> {formatDate(order.criado_em)}
                                </p>
                                <p className="text-base font-semibold text-white">Total: {formatCurrency(order.valor_total)}</p>
                              </div>
                            </div>
                            <Button onClick={() => setSelectedOrder(order)} variant="default" size="sm" className="sm:w-auto">
                              <Eye className="mr-2 h-4 w-4" />
                              See Details
                            </Button>
                          </div>

                          {availableTransitions.length > 0 && (
                            <div className="border-t border-zinc-800 pt-4">
                              <p className="mb-2 text-xs font-medium text-zinc-400">Quick Actions</p>
                              <div className="flex flex-wrap gap-2">
                                {availableTransitions.map((transition) => {
                                  const transitionConfig = statusConfig[transition];
                                  let icon = null;

                                  if (transition === "processando") icon = <Loader2 className="h-4 w-4" />;
                                  if (transition === "enviado") icon = <Truck className="h-4 w-4" />;
                                  if (transition === "entregue") icon = <CheckCircle className="h-4 w-4" />;
                                  if (transition === "cancelado") icon = <XCircle className="h-4 w-4" />;

                                  return (
                                    <Button
                                      key={transition}
                                      size="sm"
                                      variant="outline"
                                      disabled={updatingStatus}
                                      onClick={async () => {
                                        try {
                                          setUpdatingStatus(true);
                                          await supplierService.updateOrderStatus(order.id, transition);
                                          await fetchOrders();
                                        } catch (err) {
                                          setError(err instanceof Error ? err.message : "Failed to update order status");
                                        } finally {
                                          setUpdatingStatus(false);
                                        }
                                      }}
                                      className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                                      {updatingStatus ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <span className="mr-2">{icon}</span>}
                                      {transitionConfig.label}
                                    </Button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
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
            <DialogDescription className="text-zinc-400">{selectedOrder?.id.slice(0, 8)}</DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-white">Order Information</h3>
                <div className="space-y-1 text-sm text-zinc-400">
                  <p>
                    <span className="font-medium text-zinc-300">Store:</span> {selectedOrder.loja.nome}
                  </p>
                  <p>
                    <span className="font-medium text-zinc-300">Date:</span> {formatDate(selectedOrder.criado_em)}
                  </p>
                  <p>
                    <span className="font-medium text-zinc-300">Status:</span>{" "}
                    <span className={`ml-1 rounded-full border px-2 py-0.5 text-xs ${statusConfig[selectedOrder.status as OrderStatus].color}`}>{statusConfig[selectedOrder.status as OrderStatus].label}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <span className="text-sm font-medium text-zinc-300">Total Amount:</span>
                <span className="text-2xl font-bold text-white">{formatCurrency(selectedOrder.valor_total)}</span>
              </div>

              {getAvailableStatusTransitions(selectedOrder.status).length > 0 && (
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <h3 className="mb-3 text-sm font-semibold text-white">Update Order Status</h3>
                  <div className="flex gap-2">
                    {getAvailableStatusTransitions(selectedOrder.status).map((status) => {
                      const statusConf = statusConfig[status];
                      let icon = null;

                      if (status === "processando") icon = <Loader2 className="h-4 w-4" />;
                      if (status === "enviado") icon = <Truck className="h-4 w-4" />;
                      if (status === "entregue") icon = <CheckCircle className="h-4 w-4" />;
                      if (status === "cancelado") icon = <XCircle className="h-4 w-4" />;

                      return (
                        <Button
                          key={status}
                          size="default"
                          variant="outline"
                          disabled={updatingStatus}
                          onClick={async () => {
                            try {
                              setUpdatingStatus(true);
                              await supplierService.updateOrderStatus(selectedOrder.id, status);
                              await fetchOrders();
                              setSelectedOrder(null);
                            } catch (err) {
                              setError(err instanceof Error ? err.message : "Failed to update order status");
                            } finally {
                              setUpdatingStatus(false);
                            }
                          }}
                          className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                          {updatingStatus ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <span className="mr-2">{icon}</span>}
                          {statusConf.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
