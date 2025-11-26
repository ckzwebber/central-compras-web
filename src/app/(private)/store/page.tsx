"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, TrendingUp, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Total Orders",
    value: "47",
    icon: Package,
    description: "All time orders",
    color: "text-blue-400",
  },
  {
    title: "Pending Orders",
    value: "3",
    icon: ShoppingCart,
    description: "Awaiting delivery",
    color: "text-yellow-400",
  },
  {
    title: "Monthly Spending",
    value: "R$ 12,450",
    icon: TrendingUp,
    description: "Current month",
    color: "text-purple-400",
  },
];

const recentOrders = [
  {
    id: "#ORD-1234",
    supplier: "Tech Distribuidora",
    date: "2024-11-01",
    total: 2459.9,
    status: "delivered" as const,
  },
  {
    id: "#ORD-1233",
    supplier: "Office Solutions",
    date: "2024-10-31",
    total: 1299.5,
    status: "shipped" as const,
  },
  {
    id: "#ORD-1232",
    supplier: "Tech Distribuidora",
    date: "2024-10-30",
    total: 3890.0,
    status: "processing" as const,
  },
];

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  processing: { label: "Processing", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  shipped: { label: "Shipped", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  delivered: { label: "Delivered", color: "bg-green-500/10 text-green-400 border-green-500/20" },
};

const topSuppliers = [
  { name: "Tech Distribuidora", orders: 12, total: 45890.5 },
  { name: "Office Solutions", orders: 8, total: 28450.0 },
  { name: "Importadora Global", orders: 5, total: 15600.75 },
];

export default function StoreDashboardPage() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-sm text-zinc-400">Welcome to your store panel</p>
        </div>

        {/* Stats Grid */}
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

        {/* Quick Actions */}
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
          {/* Recent Orders */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
              <Button asChild variant="link" className="text-zinc-400 hover:text-white">
                <Link href="/store/orders">View all</Link>
              </Button>
            </div>

            <Card className="border-zinc-800 bg-zinc-950/80">
              <CardContent className="p-0">
                <div className="divide-y divide-zinc-800">
                  {recentOrders.map((order) => {
                    const status = statusConfig[order.status];
                    return (
                      <div key={order.id} className="flex items-center justify-between p-4 transition hover:bg-zinc-900/60">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm font-medium text-white">{order.id}</span>
                            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.color}`}>{status.label}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-4 text-sm text-zinc-400">
                            <span>{order.supplier}</span>
                            <span>•</span>
                            <span>{formatDate(order.date)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-white">{formatCurrency(order.total)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Suppliers */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-white">Top Suppliers</h2>
              <p className="text-sm text-zinc-400">Most ordered from</p>
            </div>

            <Card className="border-zinc-800 bg-zinc-950/80">
              <CardContent className="p-0">
                <div className="divide-y divide-zinc-800">
                  {topSuppliers.map((supplier, index) => (
                    <div key={supplier.name} className="flex items-center justify-between p-4 transition hover:bg-zinc-900/60">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
                          <span className="text-sm font-bold text-white">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{supplier.name}</p>
                          <p className="text-xs text-zinc-400">{supplier.orders} orders</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-white">{formatCurrency(supplier.total)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
