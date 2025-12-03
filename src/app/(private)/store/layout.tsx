"use client";

import { StoreSidebar } from "@/components/store/store-sidebar";
import { CartSheet } from "@/components/cart-sheet";
import { useRef, useEffect } from "react";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const cartRef = useRef<{ open: () => void }>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).openCart = () => cartRef.current?.open();
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <StoreSidebar />
      <main className="flex-1">{children}</main>
      <div style={{ position: "fixed", pointerEvents: "none", visibility: "hidden" }}>
        <CartSheet ref={cartRef} />
      </div>
    </div>
  );
}
