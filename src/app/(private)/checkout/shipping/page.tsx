"use client";

import { FormEvent, useMemo, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiWolframlanguage } from "react-icons/si";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrderSummary } from "@/components/order-summary";
import useCart from "@/hooks/states/use-cart";

type ShippingMethod = "economy" | "standard";

export default function ShippingPage() {
  const router = useRouter();
  const { cart } = useCart();
  const cartItems = cart?.produtos ?? [];
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod>("economy");

  const subtotal = useMemo(() => cartItems.reduce((total, item) => total + item.valor_unitario * item.quantidade, 0), [cartItems]);

  const shippingCost = selectedShipping === "economy" ? 24.99 : 39.99;
  const total = subtotal + shippingCost;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Save shipping method to state/context
    router.push("/checkout/payment");
  };

  // Mock data - In real app, this would come from the previous step or state management
  const userContact = "you@example.com";
  const shippingAddress = {
    name: "Maria Silva",
    address: "Rua Exemplo, 123",
    city: "São Paulo",
    state: "SP",
    postalCode: "00000-000",
    country: "Brazil",
  };

  return (
    <main className="bg-zinc-950 text-zinc-100">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-xl border border-transparent px-6 py-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-800 bg-black transition-transform hover:scale-105">
              <SiWolframlanguage size={26} className="text-white" />
            </Link>

            <Breadcrumb>
              <BreadcrumbList className="flex flex-wrap gap-2 text-sm text-zinc-100/90">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-zinc-200 transition hover:text-white">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-zinc-200" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/checkout" className="text-zinc-200 transition hover:text-white">
                    Information
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-zinc-200" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-white">Shipping</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-zinc-200" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-zinc-200">Payment</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_auto_minmax(320px,1fr)] lg:items-start">
          <section className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Contact Information Display */}
              <section className="rounded-xl bg-zinc-950/80 p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-zinc-400">Contact</h3>
                  <Link href="/checkout" className="text-sm font-medium text-zinc-500 hover:underline">
                    Change
                  </Link>
                </div>
                <p className="text-sm text-zinc-200">{userContact}</p>
              </section>

              {/* Shipping Address Display */}
              <section className="rounded-xl bg-zinc-950/80 p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-zinc-400">Ship to</h3>
                  <Link href="/checkout" className="text-sm font-medium text-zinc-500 hover:underline">
                    Change
                  </Link>
                </div>
                <p className="text-sm text-zinc-200">
                  {shippingAddress.name}, {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
              </section>

              {/* Shipping Method Selection */}
              <section className="rounded-xl bg-zinc-950/80 p-5 shadow-sm">
                <h2 className="mb-5 text-lg font-semibold">Shipping method</h2>

                <div className="space-y-3">
                  {/* Economy Shipping */}
                  <div
                    onClick={() => setSelectedShipping("economy")}
                    className={`cursor-pointer rounded-lg border p-4 transition ${selectedShipping === "economy" ? "border-white bg-zinc-900/50" : "border-zinc-800 hover:border-zinc-700"}`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center">
                        <div className={`h-4 w-4 rounded-full border-2 transition ${selectedShipping === "economy" ? "border-white bg-white" : "border-zinc-600"}`}>
                          {selectedShipping === "economy" && (
                            <div className="h-full w-full rounded-full bg-white p-0.5">
                              <div className="h-full w-full rounded-full bg-zinc-950"></div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-medium text-white">Economy</p>
                          <p className="text-sm text-zinc-400">7-10 business days</p>
                        </div>
                        <p className="mt-1 text-sm font-medium text-white sm:mt-0">{formatCurrency(24.99)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Standard Shipping */}
                  <div
                    onClick={() => setSelectedShipping("standard")}
                    className={`cursor-pointer rounded-lg border p-4 transition ${selectedShipping === "standard" ? "border-white bg-zinc-900/50" : "border-zinc-800 hover:border-zinc-700"}`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center">
                        <div className={`h-4 w-4 rounded-full border-2 transition ${selectedShipping === "standard" ? "border-white bg-white" : "border-zinc-600"}`}>
                          {selectedShipping === "standard" && (
                            <div className="h-full w-full rounded-full bg-white p-0.5">
                              <div className="h-full w-full rounded-full bg-zinc-950"></div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-medium text-white">Standard</p>
                          <p className="text-sm text-zinc-400">2-4 business days</p>
                        </div>
                        <p className="mt-1 text-sm font-medium text-white sm:mt-0">{formatCurrency(39.99)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button asChild variant="link" className="group gap-2 px-0 text-sm text-zinc-300 hover:text-white">
                  <Link href="/checkout">
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    Return to information
                  </Link>
                </Button>
                <Button type="submit" className="w-full sm:w-auto">
                  Continue to payment
                </Button>
              </div>
            </form>
          </section>

          <Separator orientation="vertical" decorative className="hidden h-full w-px justify-self-center self-stretch bg-zinc-800/80 lg:block" />

          <OrderSummary items={cartItems} subtotal={subtotal} shippingCost={shippingCost} total={total} />
        </div>
      </div>
    </main>
  );
}
