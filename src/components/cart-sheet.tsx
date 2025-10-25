"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export function CartSheet() {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      nome: "Product 1",
      descricao: "Detailed description of Product 1",
      valor_unitario: 10.0,
      imagem_url: "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=2048&q=75",
      quantidade_estoque: 100,
      categoria: "Category 1",
      criado_em: new Date("2024-01-08T10:00:00Z"),
      atualizado_em: new Date("2024-06-12T12:00:00Z"),
      quantidade: 2,
    },
    {
      id: "2",
      nome: "Product 2",
      descricao: "Detailed description of Product 2",
      valor_unitario: 20.0,
      imagem_url: "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fbag-1-dark.png%3Fv%3D1689796304&w=2048&q=75",
      quantidade_estoque: 200,
      categoria: "Category 2",
      criado_em: new Date("2024-02-18T10:00:00Z"),
      atualizado_em: new Date("2024-07-21T12:00:00Z"),
      quantidade: 1,
    },
    {
      id: "3",
      nome: "Product 3",
      descricao: "Detailed description of Product 3",
      valor_unitario: 15.5,
      imagem_url: "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fhoodie-1.png%3Fv%3D1690003482&w=2048&q=75",
      quantidade_estoque: 80,
      categoria: "Category 1",
      criado_em: new Date("2024-03-10T10:00:00Z"),
      atualizado_em: new Date("2024-09-05T12:00:00Z"),
      quantidade: 3,
    },
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.valor_unitario * item.quantidade, 0);

  const increaseQuantity = (id: string) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item)));
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id || item.quantidade > 1).map((item) => (item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item)));
  };

  return (
    <Sheet>
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
                  <img src={item.imagem_url} alt={item.nome} className="h-20 w-20 rounded object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{item.nome}</h3>
                    <p className="text-sm text-zinc-400">Quantity: {item.quantidade}</p>
                    <p className="font-semibold text-white">${item.valor_unitario.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="default" size="icon" className="h-8 w-8" onClick={() => decreaseQuantity(item.id)}>
                      -
                    </Button>
                    <span className="text-white">{item.quantidade}</span>
                    <Button variant="default" size="icon" className="h-8 w-8" onClick={() => increaseQuantity(item.id)}>
                      +
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <SheetFooter className="flex-col gap-4">
          <div className="flex justify-between text-lg font-semibold text-white">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button className="w-full" disabled={cartItems.length === 0}>
            Checkout
          </Button>
          <SheetClose asChild>
            <Button variant="secondary" className="w-full">
              Continue Shopping
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
