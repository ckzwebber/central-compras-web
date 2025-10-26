import { Carrinho } from "@/types/carrinho";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartState = {
  cart: Carrinho | null;
  setCart: (cart: Carrinho) => void;
  clearCart: () => void;
  updateCart: (updates: Partial<Carrinho>) => void;
  isEmpty: () => boolean;
};

const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      setCart: (cart: Carrinho) => set({ cart }),
      clearCart: () => set({ cart: null }),
      updateCart: (updates: Partial<Carrinho>) =>
        set((state) => ({
          cart: state.cart ? { ...state.cart, ...updates } : null,
        })),
      isEmpty: () => {
        const cart = get().cart;
        return !cart || cart.produtos.length === 0;
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCart;
