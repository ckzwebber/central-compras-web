"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Truck, Package, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mock data
const stats = [
  {
    title: "Total Stores",
    value: "24",
    icon: Store,
    description: "+3 this month",
    color: "text-blue-400",
  },
  {
    title: "Suppliers",
    value: "12",
    icon: Truck,
    description: "+2 this month",
    color: "text-green-400",
  },
  {
    title: "Products",
    value: "156",
    icon: Package,
    description: "+18 this month",
    color: "text-purple-400",
  },
  {
    title: "Orders",
    value: "89",
    icon: ShoppingCart,
    description: "+12 this week",
    color: "text-yellow-400",
  },
];

const recentOrders = [
  { id: "ORD-001", store: "Center Store", value: 1250.0, status: "Processing" },
  { id: "ORD-002", store: "SuperMix", value: 890.5, status: "Delivered" },
  { id: "ORD-003", store: "MegaStore", value: 2100.0, status: "Pending" },
  { id: "ORD-004", store: "Plus Store", value: 450.0, status: "Processing" },
];

const recentRegistrations = [
  { type: "Store", name: "New ABC Store", date: "2 days ago" },
  { type: "Supplier", name: "XYZ Distribution", date: "3 days ago" },
  { type: "Store", name: "Top Supermarket", date: "5 days ago" },
];

export default function AdminDashboard() {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-sm text-zinc-400">Overview of Central Purchasing System</p>
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

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Orders */}
          <Card className="border-zinc-800 bg-zinc-950/80">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={order.id}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">{order.id}</p>
                        <p className="text-xs text-zinc-500">{order.store}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-white">{formatCurrency(order.value)}</p>
                        <span className={`inline-block text-xs ${order.status === "Delivered" ? "text-green-400" : order.status === "Processing" ? "text-yellow-400" : "text-zinc-400"}`}>{order.status}</span>
                      </div>
                    </div>
                    {index < recentOrders.length - 1 && <Separator className="mt-4 bg-zinc-800" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Registrations */}
          <Card className="border-zinc-800 bg-zinc-950/80">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">Recent Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRegistrations.map((reg, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="inline-block rounded-full border border-zinc-800 bg-zinc-900/50 px-2 py-0.5 text-xs text-zinc-400">{reg.type}</span>
                          <p className="text-sm font-medium text-white">{reg.name}</p>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-500">{reg.date}</p>
                    </div>
                    {index < recentRegistrations.length - 1 && <Separator className="mt-4 bg-zinc-800" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
