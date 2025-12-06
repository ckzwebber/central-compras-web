"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, TrendingUp, Plus, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { supplierService } from "@/lib/supplier.service";
import { Alert, AlertDescription } from "@/components/ui/alert";

const statusConfig = {
  pendente: { label: "Pending", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  processando: { label: "Processing", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  enviado: { label: "Shipped", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  entregue: { label: "Delivered", color: "bg-green-500/10 text-green-400 border-green-500/20" },
  cancelado: { label: "Cancelled", color: "bg-red-500/10 text-red-400 border-red-500/20" },
};

export default function SupplierDashboardPage() {
  const [statistics, setStatistics] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsData, ordersData] = await Promise.all([supplierService.getStatistics(), supplierService.getMyOrders()]);

      setStatistics(statsData);
      setRecentOrders(ordersData.data.slice(0, 4));
      console.log(ordersData);
      console.log(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="container mx-auto px-6 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Products",
      value: statistics?.totalProducts?.toString() || "0",
      icon: Package,
      description: "Active in catalog",
      color: "text-blue-400",
    },
    {
      title: "Total Orders",
      value: statistics?.totalOrders?.toString() || "0",
      icon: ShoppingCart,
      description: "All time orders",
      color: "text-purple-400",
    },
    {
      title: "Pending Orders",
      value: statistics?.pendingOrders?.toString() || "0",
      icon: ShoppingCart,
      description: "Awaiting processing",
      color: "text-yellow-400",
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(statistics?.monthlyRevenue || 0),
      icon: TrendingUp,
      description: "Current month",
      color: "text-green-400",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-sm text-zinc-400">Welcome to your supplier panel</p>
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
              <Link href="/supplier/products/new">
                <Plus className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium text-white">New Product</span>
              </Link>
            </Button>
            <Button asChild variant="default" className="h-auto flex-col gap-2 border-zinc-800 py-6 hover:bg-zinc-900">
              <Link href="/supplier/campaigns/new">
                <Plus className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium text-white">New Campaign</span>
              </Link>
            </Button>
            <Button asChild variant="default" className="h-auto flex-col gap-2 border-zinc-800 py-6 hover:bg-zinc-900">
              <Link href="/supplier/orders">
                <ShoppingCart className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium text-white">View Orders</span>
              </Link>
            </Button>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
            <Button asChild variant="link" className="text-zinc-400 hover:text-white">
              <Link href="/supplier/orders">View all</Link>
            </Button>
          </div>

          <Card className="border-zinc-800 bg-zinc-950/80">
            <CardContent className="p-0">
              <div className="divide-y divide-zinc-800">
                {recentOrders.length === 0 ? (
                  <div className="p-8 text-center text-zinc-400">No orders yet</div>
                ) : (
                  recentOrders.map((order) => {
                    const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pendente;
                    return (
                      <div key={order.id} className="flex items-center justify-between p-4 transition hover:bg-zinc-900/60">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm font-medium text-white">#{order.id.slice(0, 8)}</span>
                            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.color}`}>{status.label}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-4 text-sm text-zinc-400">
                            <span>{order.loja.nome || "Store"}</span>
                            <span>•</span>
                            <span>{formatDate(order.criado_em)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-white">{formatCurrency(parseFloat(order.valor_total))}</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
