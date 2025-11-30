"use client";

import { FormEvent, useMemo, useState } from "react";

import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";
import { SiWolframlanguage } from "react-icons/si";
import { FaPix } from "react-icons/fa6";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { OrderSummary } from "@/components/order-summary";
import useCart from "@/hooks/states/use-cart";

type PaymentMethod = "pix" | "card";

export default function PaymentPage() {
  const { cart } = useCart();
  const cartItems = cart?.produtos ?? [];
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("card");

  const subtotal = useMemo(() => cartItems.reduce((total, item) => total + item.valor_unitario * item.quantidade, 0), [cartItems]);

  // Mock shipping cost - In real app, this would come from previous step
  const shippingCost = 24.99;
  const total = subtotal + shippingCost;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Integrate with payment gateway (Stripe, etc.)
  };

  // Mock data - In real app, this would come from the previous steps or state management
  const userContact = "you@example.com";
  const shippingAddress = {
    name: "Maria Silva",
    address: "Rua Exemplo, 123",
    city: "São Paulo",
    state: "SP",
    postalCode: "00000-000",
    country: "Brazil",
  };
  const shippingMethod = "Economy (7-10 business days)";

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
                  <BreadcrumbLink href="/checkout/shipping" className="text-zinc-200 transition hover:text-white">
                    Shipping
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-zinc-200" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-white">Payment</BreadcrumbPage>
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
                  <Link href="/checkout/shipping" className="text-sm font-medium text-zinc-500 hover:underline">
                    Change
                  </Link>
                </div>
                <p className="text-sm text-zinc-200">
                  {shippingAddress.name}, {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
              </section>

              {/* Shipping Method Display */}
              <section className="rounded-xl bg-zinc-950/80 p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-zinc-400">Shipping method</h3>
                  <Link href="/checkout/shipping" className="text-sm font-medium text-zinc-500 hover:underline">
                    Change
                  </Link>
                </div>
                <p className="text-sm text-zinc-200">{shippingMethod}</p>
              </section>

              {/* Payment Method Selection */}
              <section className="rounded-xl bg-zinc-950/80 p-5 shadow-sm">
                <h2 className="mb-5 text-lg font-semibold">Payment method</h2>

                <div className="space-y-3">
                  {/* Credit Card Payment */}
                  <div
                    onClick={() => setSelectedPayment("card")}
                    className={`cursor-pointer rounded-lg border p-4 transition ${selectedPayment === "card" ? "border-white bg-zinc-900/50" : "border-zinc-800 hover:border-zinc-700"}`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center">
                        <div className={`h-4 w-4 rounded-full border-2 transition ${selectedPayment === "card" ? "border-white bg-white" : "border-zinc-600"}`}>
                          {selectedPayment === "card" && (
                            <div className="h-full w-full rounded-full bg-white p-0.5">
                              <div className="h-full w-full rounded-full bg-zinc-950"></div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-1 items-center gap-2">
                        <CreditCard className="h-5 w-5 text-zinc-400" />
                        <p className="font-medium text-white">Credit Card</p>
                      </div>
                    </div>
                  </div>

                  {/* PIX Payment */}
                  <div
                    onClick={() => setSelectedPayment("pix")}
                    className={`cursor-pointer rounded-lg border p-4 transition ${selectedPayment === "pix" ? "border-white bg-zinc-900/50" : "border-zinc-800 hover:border-zinc-700"}`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center">
                        <div className={`h-4 w-4 rounded-full border-2 transition ${selectedPayment === "pix" ? "border-white bg-white" : "border-zinc-600"}`}>
                          {selectedPayment === "pix" && (
                            <div className="h-full w-full rounded-full bg-white p-0.5">
                              <div className="h-full w-full rounded-full bg-zinc-950"></div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-1 items-center gap-2">
                        <FaPix className="h-5 w-5 text-[#00bfa6]" />
                        <p className="font-medium text-white">PIX</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Details Form */}
                <div className="mt-6">
                  {selectedPayment === "card" ? (
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card number</Label>
                        <Input className="border-zinc-800" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required maxLength={19} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder name</Label>
                        <Input className="border-zinc-800" id="cardName" name="cardName" placeholder="MARIA SILVA" required />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry">Expiry date</Label>
                          <Input className="border-zinc-800" id="cardExpiry" name="cardExpiry" placeholder="MM/YY" required maxLength={5} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardCvc">Security code (CVV)</Label>
                          <Input className="border-zinc-800" id="cardCvc" name="cardCvc" placeholder="123" required maxLength={4} type="password" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardCpf">CPF</Label>
                        <Input className="border-zinc-800" id="cardCpf" name="cardCpf" placeholder="000.000.000-00" required />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
                        <div className="mb-3 flex items-center gap-2">
                          <FaPix className="h-5 w-5 text-[#00bfa6]" />
                          <p className="font-medium text-white">PIX Payment</p>
                        </div>
                        <p className="text-sm text-zinc-400">
                          After confirming your order, you will receive a QR Code and a PIX copy-paste code to complete your payment. The order will be processed as soon as the payment is confirmed.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pixCpf">CPF</Label>
                        <Input className="border-zinc-800" id="pixCpf" name="pixCpf" placeholder="000.000.000-00" required />
                      </div>

                      <div className="rounded-lg border border-dashed border-zinc-700 bg-zinc-900/30 p-4">
                        <p className="text-xs text-zinc-500">💡 PIX payments are typically processed within seconds. You&apos;ll receive your order confirmation immediately after payment.</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button asChild variant="link" className="group gap-2 px-0 text-sm text-zinc-300 hover:text-white">
                  <Link href="/checkout/shipping">
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    Return to shipping
                  </Link>
                </Button>
                <Button type="submit" className="w-full sm:w-auto">
                  {selectedPayment === "pix" ? "Generate PIX Code" : "Complete order"}
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
