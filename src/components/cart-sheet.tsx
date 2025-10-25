"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";

export function CartSheet() {
  const [cartItems, setCartItems] = useState([
    { id: "1", name: "Coquinha", price: 4.99, quantity: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGEKk1DaaAsuqNnnM9yrZ_6OK6I7CiM1EFEg&s" },
    { id: "2", name: "Coxinha", price: 6.99, quantity: 2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEJYnk19-jrGFPClIRsq16Ni2KtX-xgqkJkA&s" },
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const increaseQuantity = (id: string) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id || item.quantity > 1).map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item)));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" size="icon" className="relative bg-black border-zinc-700 border hover:transform hover:scale-105 transition-transform ">
          <ShoppingCart className="h-6 w-6" />
          {cartItems.length > 0 && <span className="absolute bg-primary -top-2 -right-2 h-5 w-5 rounded-full text-xs text-primary-foreground flex items-center justify-center">{cartItems.length}</span>}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-zinc-950 text-white">
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
                  <img src={item.image} alt={item.name} className="h-20 w-20 rounded object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-sm text-zinc-400">Quantity: {item.quantity}</p>
                    <p className="font-semibold text-white">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="default" size="icon" className="h-8 w-8" onClick={() => decreaseQuantity(item.id)}>
                      -
                    </Button>
                    <span className="text-white">{item.quantity}</span>
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
