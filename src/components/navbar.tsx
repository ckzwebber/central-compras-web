"use client";

import { SiWolframlanguage } from "react-icons/si";
import { FiSearch } from "react-icons/fi";
import { LayoutDashboard, LogIn, LogOut } from "lucide-react";
import { CartSheet } from "./cart-sheet";
import { Button } from "./ui/button";
import { useRef, useEffect, useState } from "react";
import useCart from "@/hooks/states/use-cart";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authService } from "@/lib/auth.service";
import { produtosService } from "@/lib/produtos.service";
import type { User } from "@/types/auth";
import type { Produto } from "@/types/produto";

export const Navbar = () => {
  const cartRef = useRef<{ open: () => void }>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const { cart } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Produto[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const userFunction = user?.funcao || "store";

  useEffect(() => {
    setMounted(true);
    setUser(authService.getUser());

    if (typeof window !== "undefined") {
      (window as any).openCart = () => cartRef.current?.open();

      const params = new URLSearchParams(window.location.search);
      const search = params.get("search");
      if (search) {
        setSearchQuery(search);
      }
    }
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length < 1) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const results = await produtosService.search(searchQuery);
        setSuggestions(results.slice(0, 5));
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();

    setShowSuggestions(false);

    if (pathname !== "/") {
      router.push(`/?search=${encodeURIComponent(trimmed)}`);
    } else if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("search", trimmed);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
      window.dispatchEvent(new CustomEvent("searchChanged", { detail: trimmed }));
    }
  };

  const handleSelectSuggestion = (produto: Produto) => {
    setShowSuggestions(false);
    setSearchQuery("");
    router.push(`/product/${produto.id}`);
  };

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
        <div ref={searchRef} className="relative w-full max-w-md">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              className="pt-2 pb-2 pl-3 pr-10 rounded-lg w-full border border-zinc-800 focus:outline-none focus:border-zinc-500 text-sm"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors">
              <FiSearch size={16} />
            </button>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-zinc-950 border border-zinc-800 rounded-lg shadow-xl z-50 overflow-hidden">
              {suggestions.map((produto) => (
                <button
                  key={produto.id}
                  onClick={() => handleSelectSuggestion(produto)}
                  className="w-full px-4 py-3 text-left hover:bg-zinc-800 transition-colors border-b border-zinc-800 last:border-b-0 flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{produto.nome}</p>
                    <p className="text-xs text-zinc-400 truncate">{produto.descricao}</p>
                  </div>
                  <p className="text-sm font-semibold text-green-400 whitespace-nowrap">R$ {produto.valor_unitario.toFixed(2)}</p>
                </button>
              ))}
            </div>
          )}
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

        {(!user || userFunction === "loja" || userFunction === "usuario") && <CartSheet ref={cartRef} />}
      </div>
    </nav>
  );
};
