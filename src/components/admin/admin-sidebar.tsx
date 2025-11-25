"use client";

import { LayoutDashboard, Store, Package, Users, Truck, Home } from "lucide-react";
import { DashboardSidebar, NavigationItem } from "@/components/dashboard-sidebar";
import { authService } from "@/lib/auth";
import { useState, useEffect } from "react";

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Stores", href: "/admin/stores", icon: Store },
  { name: "Suppliers", href: "/admin/suppliers", icon: Truck },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Users", href: "/admin/users", icon: Users },
];

export function AdminSidebar() {
  const [userName, setUserName] = useState("Admin User");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const user = authService.getUser();
    if (user?.nome) {
      setUserName(user.nome);
    }
  }, []);

  if (!mounted) {
    return <DashboardSidebar navigation={navigation} panelTitle="Admin Panel" userName="Admin User" />;
  }

  return <DashboardSidebar navigation={navigation} panelTitle="Admin Panel" userName={userName} />;
}
