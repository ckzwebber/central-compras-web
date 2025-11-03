"use client";

import { LayoutDashboard, Package, ShoppingCart, Megaphone, FileText, User, Home } from "lucide-react";
import { DashboardSidebar, NavigationItem } from "@/components/dashboard-sidebar";

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/supplier", icon: LayoutDashboard },
  { name: "Products", href: "/supplier/products", icon: Package },
  { name: "Orders", href: "/supplier/orders", icon: ShoppingCart },
  { name: "Campaigns", href: "/supplier/campaigns", icon: Megaphone },
  { name: "Commercial Terms", href: "/supplier/terms", icon: FileText },
  { name: "Profile", href: "/supplier/profile", icon: User },
];

export function SupplierSidebar() {
  return <DashboardSidebar navigation={navigation} panelTitle="Supplier Panel" userName="Supplier User" />;
}
