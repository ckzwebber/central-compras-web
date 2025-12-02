import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CheckoutData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  phone?: string;
  country: string;
  shippingMethod?: "economy" | "standard";
}

interface CheckoutStore {
  checkoutData: CheckoutData | null;
  setCheckoutData: (data: CheckoutData) => void;
  clearCheckoutData: () => void;
}

const useCheckout = create<CheckoutStore>()(
  persist(
    (set) => ({
      checkoutData: null,
      setCheckoutData: (data) => set({ checkoutData: data }),
      clearCheckoutData: () => set({ checkoutData: null }),
    }),
    {
      name: "checkout-storage",
    }
  )
);

export default useCheckout;
