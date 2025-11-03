"use client";

import { LayoutDashboard, ShoppingBag, ShoppingCart, Package, User, Home } from "lucide-react";
import { DashboardSidebar, NavigationItem } from "@/components/dashboard-sidebar";

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/store", icon: LayoutDashboard },
  { name: "Products", href: "/store/products", icon: ShoppingBag },
  { name: "My Cart", href: "/store/cart", icon: ShoppingCart },
  { name: "My Orders", href: "/store/orders", icon: Package },
  { name: "Profile", href: "/store/profile", icon: User },
];

export function StoreSidebar() {
  return <DashboardSidebar navigation={navigation} panelTitle="Store Panel" userName="Store User" />;
}
