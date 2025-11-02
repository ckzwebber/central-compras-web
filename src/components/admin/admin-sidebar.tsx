"use client";

import { LayoutDashboard, Store, Package, Users, Truck } from "lucide-react";
import { DashboardSidebar, NavigationItem } from "@/components/dashboard-sidebar";

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Stores", href: "/admin/lojas", icon: Store },
  { name: "Suppliers", href: "/admin/suppliers", icon: Truck },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Users", href: "/admin/users", icon: Users },
];

export function AdminSidebar() {
  return <DashboardSidebar navigation={navigation} panelTitle="Admin Panel" userName="Admin User" />;
}
