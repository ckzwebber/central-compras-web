"use client";

import { SiWolframlanguage } from "react-icons/si";
import { FiSearch } from "react-icons/fi";
import { LayoutDashboard, LogIn, LogOut } from "lucide-react";
import { CartSheet } from "./cart-sheet";
import { Button } from "./ui/button";
import { useRef, useEffect, useState } from "react";
import useCart from "@/hooks/states/use-cart";
import Link from "next/link";
import { authService } from "@/lib/auth";
import type { User } from "@/types/auth";

export const Navbar = () => {
  const cartRef = useRef<{ open: () => void }>(null);
  const { cart } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const userFunction = user?.funcao || "store";

  useEffect(() => {
    setMounted(true);
    setUser(authService.getUser());

    if (typeof window !== "undefined") {
      (window as any).openCart = () => cartRef.current?.open();
    }
  }, []);

  if (!mounted) {
    return (
      <nav className="w-full bg-zinc-950 pt-3 pb-3 pr-6 pl-6 text-white flex items-center hover:shadow-lg shadow-black/20 justify-between transition-all duration-300">
        <div className="flex items-center space-x-7 flex-1">
          <a href="/" className="bg-black p-2 rounded-lg flex items-center justify-center border border-zinc-800 hover:transform hover:scale-105 transition-transform">
            <SiWolframlanguage size={26} color="white" />
          </a>
          <a href="/" className="hover:underline font-bold text-sm">
            GURI'S STORE
          </a>
          <a href="/" className="hover:underline font-bold text-sm text-zinc-400 hover:text-white">
            All Products
          </a>
        </div>
        <div className="flex-1 flex justify-center px-4">
          <div className="relative w-full max-w-md">
            <input type="text" placeholder="Search for products..." className="pt-2 pb-2 pl-3 pr-10 rounded-lg w-full border border-zinc-800 focus:outline-none focus:border-zinc-500 text-sm" />
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={16} />
          </div>
        </div>
        <div className="flex-1 flex justify-end items-center gap-2">
          <div className="w-20 h-8" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full bg-zinc-950 pt-3 pb-3 pr-6 pl-6 text-white flex items-center hover:shadow-lg shadow-black/20 justify-between transition-all duration-300">
      <div className="flex items-center space-x-7 flex-1">
        <a href="/" className="bg-black p-2 rounded-lg flex items-center justify-center border border-zinc-800 hover:transform hover:scale-105 transition-transform">
          <SiWolframlanguage size={26} color="white" />
        </a>
        <a href="/" className="hover:underline font-bold text-sm">
          GURI'S STORE
        </a>
        <a href="/" className="hover:underline font-bold text-sm text-zinc-400 hover:text-white">
          All Products
        </a>
      </div>
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-md">
          <input type="text" placeholder="Search for products..." className="pt-2 pb-2 pl-3 pr-10 rounded-lg w-full border border-zinc-800 focus:outline-none focus:border-zinc-500 text-sm" />
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={16} />
        </div>
      </div>
      <div className="flex-1 flex justify-end items-center gap-2">
        {!user ? (
          <Link href="/login">
            <Button variant="link" size="sm" className="text-xs text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600">
              <LogIn className="h-3 w-3 mr-1" />
              Login
            </Button>
          </Link>
        ) : (
          <>
            {userFunction === "admin" && (
              <Link href="/admin">
                <Button variant="link" size="sm" className="text-xs text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600">
                  <LayoutDashboard className="h-3 w-3 mr-1" />
                  Admin
                </Button>
              </Link>
            )}
            {userFunction === "fornecedor" && (
              <Link href="/supplier">
                <Button variant="link" size="sm" className="text-xs text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600">
                  <LayoutDashboard className="h-3 w-3 mr-1" />
                  Supplier
                </Button>
              </Link>
            )}
            {(userFunction === "loja" || userFunction === "usuario") && (
              <Link href="/store">
                <Button variant="link" size="sm" className="text-xs text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600">
                  <LayoutDashboard className="h-3 w-3 mr-1" />
                  Store
                </Button>
              </Link>
            )}
            <Link href={"/login"} onClick={() => authService.logout()}>
              <Button variant="link" size="sm" className="text-xs text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600">
                <LogOut className="h-3 w-3 mr-1" />
                Logout
              </Button>
            </Link>
          </>
        )}

        <CartSheet ref={cartRef} />
      </div>
    </nav>
  );
};
