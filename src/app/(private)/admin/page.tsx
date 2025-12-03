"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, Truck, Package, Users, Loader2, AlertCircle, UserPlus, PackagePlus, Building2 } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { adminService } from "@/lib/admin.service";

interface Statistics {
  totalUsers: number;
  totalStores: number;
  totalSuppliers: number;
  totalProducts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminService.getStatistics();
        setStats(data);
      } catch (err) {
        setError("Failed to load dashboard statistics");
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const statsCards = stats
    ? [
        {
          title: "Total Users",
          value: stats.totalUsers.toString(),
          icon: Users,
          description: "Registered users",
          color: "text-blue-400",
        },
        {
          title: "Total Stores",
          value: stats.totalStores.toString(),
          icon: Store,
          description: "Active stores",
          color: "text-green-400",
        },
        {
          title: "Suppliers",
          value: stats.totalSuppliers.toString(),
          icon: Truck,
          description: "Active suppliers",
          color: "text-purple-400",
        },
        {
          title: "Products",
          value: stats.totalProducts.toString(),
          icon: Package,
          description: "Available products",
          color: "text-yellow-400",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Admin Dashboard</h1>
          <p className="text-sm text-zinc-400">Central Purchasing System Administration</p>
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
            <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {statsCards.map((stat) => (
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
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Button asChild variant="default" className="h-auto flex-col gap-2 border-zinc-800 py-6 hover:bg-zinc-900">
                  <Link href="/admin/users">
                    <UserPlus className="h-5 w-5 text-blue-400" />
                    <span className="text-sm font-medium text-white">Manage Users</span>
                  </Link>
                </Button>
                <Button asChild variant="default" className="h-auto flex-col gap-2 border-zinc-800 py-6 hover:bg-zinc-900">
                  <Link href="/admin/products">
                    <PackagePlus className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm font-medium text-white">Manage Products</span>
                  </Link>
                </Button>
                <Button asChild variant="default" className="h-auto flex-col gap-2 border-zinc-800 py-6 hover:bg-zinc-900">
                  <Link href="/admin/suppliers">
                    <Truck className="h-5 w-5 text-purple-400" />
                    <span className="text-sm font-medium text-white">Manage Suppliers</span>
                  </Link>
                </Button>
                <Button asChild variant="default" className="h-auto flex-col gap-2 border-zinc-800 py-6 hover:bg-zinc-900">
                  <Link href="/admin/stores">
                    <Building2 className="h-5 w-5 text-green-400" />
                    <span className="text-sm font-medium text-white">Manage Stores</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-zinc-800 bg-zinc-950/80">
                <CardHeader>
                  <CardTitle className="text-white">System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                        <Users className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">User Management</p>
                        <p className="text-xs text-zinc-400">All systems operational</p>
                      </div>
                    </div>
                    <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                        <Package className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Product Catalog</p>
                        <p className="text-xs text-zinc-400">All systems operational</p>
                      </div>
                    </div>
                    <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                        <Store className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Store Network</p>
                        <p className="text-xs text-zinc-400">All systems operational</p>
                      </div>
                    </div>
                    <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-800 bg-zinc-950/80">
                <CardHeader>
                  <CardTitle className="text-white">Quick Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Active Users</span>
                    <span className="text-lg font-semibold text-white">{stats?.totalUsers || 0}</span>
                  </div>
                  <div className="h-px bg-zinc-800"></div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Total Products</span>
                    <span className="text-lg font-semibold text-white">{stats?.totalProducts || 0}</span>
                  </div>
                  <div className="h-px bg-zinc-800"></div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Active Suppliers</span>
                    <span className="text-lg font-semibold text-white">{stats?.totalSuppliers || 0}</span>
                  </div>
                  <div className="h-px bg-zinc-800"></div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Registered Stores</span>
                    <span className="text-lg font-semibold text-white">{stats?.totalStores || 0}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
