"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, TrendingUp, ShoppingBag, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { pedidosService } from "@/lib/pedidos.service";
import { Pedido } from "@/types/pedido";
import { Alert, AlertDescription } from "@/components/ui/alert";

const statusConfig = {
  pendente: { label: "Pending", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  enviado: { label: "Shipped", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  entregue: { label: "Delivered", color: "bg-green-500/10 text-green-400 border-green-500/20" },
  cancelado: { label: "Cancelled", color: "bg-red-500/10 text-red-400 border-red-500/20" },
};

export default function StoreDashboardPage() {
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

  const totalOrders = pedidos.length;
  const pendingOrders = pedidos.filter((p) => p.status === "pendente").length;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlySpending = pedidos
    .filter((p) => {
      const pedidoDate = new Date(p.criado_em);
      return pedidoDate.getMonth() === currentMonth && pedidoDate.getFullYear() === currentYear;
    })
    .reduce((sum, p) => sum + p.valor_total, 0);

  const recentOrders = pedidos.sort((a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime()).slice(0, 5);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      icon: Package,
      description: "All time orders",
      color: "text-blue-400",
    },
    {
      title: "Pending Orders",
      value: pendingOrders.toString(),
      icon: ShoppingCart,
      description: "Awaiting delivery",
      color: "text-yellow-400",
    },
    {
      title: "Monthly Spending",
      value: formatCurrency(monthlySpending),
      icon: TrendingUp,
      description: "Current month",
      color: "text-purple-400",
    },
  ];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-sm text-zinc-400">Welcome to your store panel</p>
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
            <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat) => (
                <Card key={stat.title} className="border-zinc-800 bg-zinc-950/80">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-zinc-400">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <p className="text-xs text-zinc-500">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Button asChild variant="default" className="h-auto flex-col gap-2 border-zinc-800 py-6 hover:bg-zinc-900">
                  <Link href="/store/products">
                    <ShoppingBag className="h-5 w-5 text-blue-400" />
                    <span className="text-sm font-medium text-white">Browse Products</span>
                  </Link>
                </Button>
                <Button asChild variant="default" className="h-auto flex-col gap-2 border-zinc-800 py-6 hover:bg-zinc-900">
                  <Link href="/store/cart">
                    <ShoppingCart className="h-5 w-5 text-green-400" />
                    <span className="text-sm font-medium text-white">View Cart</span>
                  </Link>
                </Button>
                <Button asChild variant="default" className="h-auto flex-col gap-2 border-zinc-800 py-6 hover:bg-zinc-900">
                  <Link href="/store/orders">
                    <Package className="h-5 w-5 text-purple-400" />
                    <span className="text-sm font-medium text-white">My Orders</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
                  <Button asChild variant="link" className="text-zinc-400 hover:text-white">
                    <Link href="/store/orders">View all</Link>
                  </Button>
                </div>

                <Card className="border-zinc-800 bg-zinc-950/80">
                  <CardContent className="p-0">
                    {recentOrders.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-10 text-center">
                        <Package className="mb-2 h-10 w-10 text-zinc-600" />
                        <p className="text-sm text-zinc-400">No orders yet</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-zinc-800">
                        {recentOrders.map((order) => {
                          const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pendente;
                          return (
                            <div key={order.id} className="flex items-center justify-between p-4 transition hover:bg-zinc-900/60">
                              <div className="flex-1">
                                <div className="flex items-center gap-3">
                                  <span className="font-mono text-sm font-medium text-white truncate w-40">{order.id}</span>
                                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.color}`}>{status.label}</span>
                                </div>
                                <div className="mt-1 flex items-center gap-4 text-sm text-zinc-400">
                                  <span>{order.loja?.nome || "Loja"}</span>
                                  <span>•</span>
                                  <span>{formatDate(new Date(order.criado_em).toISOString())}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold text-white">{formatCurrency(order.valor_total)}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-white">Order Status Summary</h2>
                  <p className="text-sm text-zinc-400">Current orders by status</p>
                </div>

                <Card className="border-zinc-800 bg-zinc-950/80">
                  <CardContent className="p-0">
                    <div className="divide-y divide-zinc-800">
                      {Object.entries(statusConfig).map(([status, config]) => {
                        const count = pedidos.filter((p) => p.status === status).length;
                        return (
                          <div key={status} className="flex items-center justify-between p-4 transition hover:bg-zinc-900/60">
                            <div className="flex items-center gap-3">
                              <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${config.color}`}>
                                <Package className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white">{config.label}</p>
                                <p className="text-xs text-zinc-400">{status}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-white">{count}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
