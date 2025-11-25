"use client";

import { LayoutDashboard, Package, ShoppingCart, Megaphone, FileText, User, Home } from "lucide-react";
import { DashboardSidebar, NavigationItem } from "@/components/dashboard-sidebar";
import { authService } from "@/lib/auth";
import { useState, useEffect } from "react";

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
  const [userName, setUserName] = useState("Supplier User");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const user = authService.getUser();
    if (user?.nome) {
      setUserName(user.nome);
    }
  }, []);

  if (!mounted) {
    return <DashboardSidebar navigation={navigation} panelTitle="Supplier Panel" userName="Supplier User" />;
  }

  return <DashboardSidebar navigation={navigation} panelTitle="Supplier Panel" userName={userName} />;
}
