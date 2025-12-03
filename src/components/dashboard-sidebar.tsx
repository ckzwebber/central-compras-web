"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LucideIcon } from "lucide-react";
import { SiWolframlanguage } from "react-icons/si";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth.service";

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface DashboardSidebarProps {
  navigation: NavigationItem[];
  panelTitle: string;
  userLabel?: string;
  userName?: string;
  onLogout?: () => void;
}

export function DashboardSidebar({ navigation, panelTitle, userLabel = "Logged in as", userName = "User", onLogout }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      authService.logout();
      router.push("/login");
    }
  };

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950/80 p-6">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-black">
            <SiWolframlanguage size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Guri's Store</h1>
            <p className="text-xs text-zinc-500">{panelTitle}</p>
          </div>
        </div>

        <Separator className="bg-zinc-800" />

        <nav className="flex flex-col gap-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all", isActive ? "bg-zinc-900 text-white" : "text-zinc-400 hover:bg-zinc-900/50 hover:text-white")}>
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <Separator className="bg-zinc-800" />

        <div className="space-y-3">
          <div className="rounded-lg bg-zinc-900/50 p-3">
            <p className="text-xs text-zinc-500">{userLabel}</p>
            <p className="text-sm font-medium text-white">{userName}</p>
          </div>

          <Button variant="default" className="w-full justify-start gap-3 text-zinc-400 hover:text-white" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
