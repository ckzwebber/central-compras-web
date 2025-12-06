"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Tag } from "lucide-react";
import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import useCart from "@/hooks/states/use-cart";
import { campanhasService } from "@/lib/campanhas.service";
import type { Campanha } from "@/types/campanha";

export const CartSheet = forwardRef((_, ref) => {
  const [open, setOpen] = useState(false);
  const { cart, setCart, updateCart, clearCart } = useCart();
  const cartItems = cart?.produtos || [];
  const [campanhaAplicavel, setCampanhaAplicavel] = useState<Campanha | null>(null);

  const setCartItems = (itemsOrUpdater: any[] | ((items: any[]) => any[])) => {
    const currentItems = cart?.produtos || [];
    const newItems = typeof itemsOrUpdater === "function" ? (itemsOrUpdater as (items: any[]) => any[])(currentItems) : itemsOrUpdater;
    const total = newItems.reduce((sum, item) => sum + item.valor_unitario * item.quantidade, 0);
    setCart({ ...(cart || { produtos: [], total: 0 }), produtos: newItems, total });
  };

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen((o) => !o),
  }));

  useEffect(() => {
    const calcularCampanha = async () => {
      if (cartItems.length > 0) {
        const fornecedorId = cartItems[0].fornecedor_id;
        const valorTotal = cartItems.reduce((total, item) => total + item.valor_unitario * item.quantidade, 0);
        const quantidadeTotal = cartItems.reduce((total, item) => total + item.quantidade, 0);

        const campanha = await campanhasService.verificarCampanhaAplicavel(fornecedorId, valorTotal, quantidadeTotal);
        setCampanhaAplicavel(campanha);
      } else {
        setCampanhaAplicavel(null);
      }
    };

    calcularCampanha();
  }, [cartItems]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.valor_unitario * item.quantidade, 0);
  const descontoAplicado = campanhaAplicavel ? (subtotal * campanhaAplicavel.desconto_porcentagem) / 100 : 0;
  const total = subtotal - descontoAplicado;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const increaseQuantity = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item)));
  };

  const decreaseQuantity = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCartItems((items) => items.filter((item) => item.id !== id || item.quantidade > 1).map((item) => (item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item)));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="default" size="icon" className="relative bg-black border-zinc-800 border hover:transform hover:scale-105 transition-transform ">
          <ShoppingCart className="h-6 w-6" />
          {cartItems.length > 0 && <span className="absolute bg-primary -top-2 -right-2 h-5 w-5 rounded-full text-xs text-primary-foreground flex items-center justify-center">{cartItems.length}</span>}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-zinc-950 border border-zinc-800 text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Shopping Cart</SheetTitle>
          <SheetDescription className="text-zinc-400">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4 m-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-zinc-400">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-zinc-800 pb-4">
                  <img src={item.imagem_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop"} alt={item.nome} className="h-20 w-20 rounded object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{item.nome}</h3>
                    <p className="text-sm text-zinc-400">Quantity: {item.quantidade}</p>
                    <p className="font-semibold text-white">{formatCurrency(item.valor_unitario)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="default" size="icon" className="h-8 w-8" onClick={(e) => decreaseQuantity(item.id, e)}>
                      -
                    </Button>
                    <span className="text-white">{item.quantidade}</span>
                    <Button variant="default" size="icon" className="h-8 w-8" onClick={(e) => increaseQuantity(item.id, e)}>
                      +
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <SheetFooter className="flex-col gap-4">
          <div className="space-y-2 w-full">
            <div className="flex justify-between text-sm text-zinc-400">
              <span>Subtotal:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {campanhaAplicavel && descontoAplicado > 0 && (
              <div className="flex justify-between text-sm text-white">
                <div className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  <span className="font-semibold">{campanhaAplicavel.nome}</span>
                </div>
                <span className="font-semibold">-{formatCurrency(descontoAplicado)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-white border-t border-zinc-800 pt-2">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          <Button
            className="w-full"
            disabled={cartItems.length === 0}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = "/store/checkout";
            }}>
            Proceed to Checkout
          </Button>
          <SheetClose asChild>
            <Button
              variant="secondary"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
              }}>
              Continue Shopping
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
});

CartSheet.displayName = "CartSheet";
