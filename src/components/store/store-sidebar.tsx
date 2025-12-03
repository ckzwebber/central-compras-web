"use client";

import { LayoutDashboard, ShoppingBag, ShoppingCart, Package, User, Home } from "lucide-react";
import { DashboardSidebar, NavigationItem } from "@/components/dashboard-sidebar";
import { authService } from "@/lib/auth.service";
import { useState, useEffect } from "react";

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/store", icon: LayoutDashboard },
  { name: "Products", href: "/store/products", icon: ShoppingBag },
  { name: "My Cart", href: "/store/cart", icon: ShoppingCart },
  { name: "My Orders", href: "/store/orders", icon: Package },
  { name: "Profile", href: "/store/profile", icon: User },
];

export function StoreSidebar() {
  const [userName, setUserName] = useState("Store User");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const user = authService.getUser();
    if (user?.nome) {
      setUserName(user.nome);
    }
  }, []);

  if (!mounted) {
    return <DashboardSidebar navigation={navigation} panelTitle="Store Panel" userName="Store User" />;
  }

  return <DashboardSidebar navigation={navigation} panelTitle="Store Panel" userName={userName} />;
}
