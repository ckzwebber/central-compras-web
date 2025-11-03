"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useCart from "@/hooks/states/use-cart";
import { Minus, Plus, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StoreCartPage() {
  const router = useRouter();
  const { cart, setCart, clearCart } = useCart();
  const cartItems = cart?.produtos || [];
  const [showClearDialog, setShowClearDialog] = useState(false);

  const setCartItems = (itemsOrUpdater: any[] | ((items: any[]) => any[])) => {
    const currentItems = cart?.produtos || [];
    const newItems = typeof itemsOrUpdater === "function" ? (itemsOrUpdater as (items: any[]) => any[])(currentItems) : itemsOrUpdater;
    const total = newItems.reduce((sum, item) => sum + item.valor_unitario * item.quantidade, 0);
    setCart({ ...(cart || { produtos: [], total: 0 }), produtos: newItems, total });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const increaseQuantity = (id: string) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item)));
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id || item.quantidade > 1).map((item) => (item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item)));
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearDialog(false);
  };

  const total = cartItems.reduce((sum, item) => sum + item.valor_unitario * item.quantidade, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white">My Cart</h1>
          <p className="text-sm text-zinc-400">{cartItems.length === 0 ? "Your cart is empty" : `${itemCount} ${itemCount === 1 ? "item" : "items"} in your cart`}</p>
        </div>

        {cartItems.length === 0 ? (
          <Card className="border-zinc-800 bg-zinc-950/80">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <ShoppingCart className="mb-4 h-16 w-16 text-zinc-600" />
              <p className="mb-2 text-lg text-zinc-300">Your cart is empty</p>
              <p className="mb-6 text-sm text-zinc-500">Add some products to get started</p>
              <Link href="/store/products">
                <Button>
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            {/* Cart Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Items</h2>
                <Button variant="default" size="sm" onClick={() => setShowClearDialog(true)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Cart
                </Button>
              </div>

              {cartItems.map((item) => (
                <Card key={item.id} className="border-zinc-800 bg-zinc-950/80 transition hover:border-zinc-700">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                        <Image src={item.imagem_url} alt={item.nome} fill className="object-cover" sizes="96px" />
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-white">{item.nome}</h3>
                          <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{item.descricao}</p>
                        </div>
                        <div className="mt-2 flex items-center gap-4">
                          <span className="text-sm text-zinc-500">Unit price:</span>
                          <span className="font-semibold text-white">{formatCurrency(item.valor_unitario)}</span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end justify-between">
                        <div className="flex items-center gap-3">
                          <Button variant="default" size="icon" className="h-8 w-8 border-zinc-700" onClick={() => decreaseQuantity(item.id)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium text-white">{item.quantidade}</span>
                          <Button variant="default" size="icon" className="h-8 w-8 border-zinc-700" onClick={() => increaseQuantity(item.id)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-zinc-500">Subtotal</p>
                          <p className="text-lg font-bold text-white">{formatCurrency(item.valor_unitario * item.quantidade)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-32 h-fit">
              <Card className="border-zinc-800 bg-zinc-950/80">
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">Items ({itemCount})</span>
                      <span className="text-zinc-200">{formatCurrency(total)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">Shipping</span>
                      <span className="text-zinc-200">Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="border-t border-zinc-800 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-white">Total</span>
                      <span className="text-2xl font-bold text-white">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Link href="/store/products" className="w-full">
                    <Button variant="outline" className="w-full border-zinc-700">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {/* Clear Cart Confirmation Dialog */}
        <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
          <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-100">
            <DialogHeader>
              <DialogTitle className="text-white">Clear Cart</DialogTitle>
              <DialogDescription className="text-zinc-400">Are you sure you want to remove all items from your cart? This action cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="default" onClick={() => setShowClearDialog(false)} className="border-zinc-700 text-zinc-300 hover:text-white">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
