"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, Megaphone, TrendingUp, Plus } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Products",
    value: "156",
    icon: Package,
    description: "Active in catalog",
    color: "text-blue-400",
  },
  {
    title: "Pending Orders",
    value: "23",
    icon: ShoppingCart,
    description: "Awaiting processing",
    color: "text-yellow-400",
  },
  {
    title: "Active Campaigns",
    value: "4",
    icon: Megaphone,
    description: "Running promotions",
    color: "text-green-400",
  },
  {
    title: "Monthly Revenue",
    value: "R$ 45,890",
    icon: TrendingUp,
    description: "Current month",
    color: "text-purple-400",
  },
];

const recentOrders = [
  {
    id: "#ORD-1234",
    store: "Supermercado ABC",
    date: "2024-11-01",
    total: 2459.9,
    status: "pending" as const,
  },
  {
    id: "#ORD-1233",
    store: "Loja do Bairro",
    date: "2024-11-01",
    total: 1299.5,
    status: "processing" as const,
  },
  {
    id: "#ORD-1232",
    store: "Minimercado XYZ",
    date: "2024-10-31",
    total: 3890.0,
    status: "shipped" as const,
  },
  {
    id: "#ORD-1231",
    store: "Mercearia Central",
    date: "2024-10-31",
    total: 890.75,
    status: "delivered" as const,
  },
];

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  processing: { label: "Processing", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  shipped: { label: "Shipped", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  delivered: { label: "Delivered", color: "bg-green-500/10 text-green-400 border-green-500/20" },
};

export default function SupplierDashboardPage() {
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
          <p className="text-sm text-zinc-400">Welcome to your supplier panel</p>
        </div>

        {/* Stats Grid */}
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

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Button asChild variant="outline" className="h-auto flex-col gap-2 border-zinc-800 py-6 hover:bg-zinc-900">
              <Link href="/supplier/products/new">
                <Plus className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium text-white">New Product</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto flex-col gap-2 border-zinc-800 py-6 hover:bg-zinc-900">
              <Link href="/supplier/campaigns/new">
                <Plus className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium text-white">New Campaign</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto flex-col gap-2 border-zinc-800 py-6 hover:bg-zinc-900">
              <Link href="/supplier/orders">
                <ShoppingCart className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium text-white">View Orders</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
            <Button asChild variant="ghost" className="text-zinc-400 hover:text-white">
              <Link href="/supplier/orders">View all</Link>
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
                          <span>{order.store}</span>
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
      </div>
    </div>
  );
}
