"use client";

import { LayoutDashboard, Store, Package, Users, Truck, Home } from "lucide-react";
import { DashboardSidebar, NavigationItem } from "@/components/dashboard-sidebar";

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Stores", href: "/admin/stores", icon: Store },
  { name: "Suppliers", href: "/admin/suppliers", icon: Truck },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Users", href: "/admin/users", icon: Users },
];

export function AdminSidebar() {
  return <DashboardSidebar navigation={navigation} panelTitle="Admin Panel" userName="Admin User" />;
}
