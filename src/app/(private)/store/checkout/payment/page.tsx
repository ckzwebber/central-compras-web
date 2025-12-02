"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import { SiWolframlanguage } from "react-icons/si";
import { FaPix } from "react-icons/fa6";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { OrderSummary } from "@/components/order-summary";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import useCart from "@/hooks/states/use-cart";
import useCheckout from "@/hooks/states/use-checkout";
import { pedidosService } from "@/lib/pedidos";
import type { CreatePedidoDto } from "@/types/pedido";

type PaymentMethod = "pix" | "card";

export default function PaymentPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { checkoutData, clearCheckoutData } = useCheckout();
  const cartItems = cart?.produtos ?? [];
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const subtotal = useMemo(() => cartItems.reduce((total, item) => total + item.valor_unitario * item.quantidade, 0), [cartItems]);

  const shippingCost = checkoutData?.shippingMethod === "standard" ? 39.99 : 24.99;
  const total = subtotal + shippingCost;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validar se há itens no carrinho
      if (cartItems.length === 0) {
        throw new Error("Carrinho vazio");
      }

      // Agrupar produtos por fornecedor
      const produtosPorFornecedor = cartItems.reduce((acc, item) => {
        const fornecedor_id = item.fornecedor_id;
        if (!acc[fornecedor_id]) {
          acc[fornecedor_id] = [];
        }
        acc[fornecedor_id].push({
          produto_id: item.id,
          quantidade: item.quantidade,
          valor_unitario: item.valor_unitario,
        });
        return acc;
      }, {} as Record<string, { produto_id: string; quantidade: number; valor_unitario: number }[]>);

      // Criar um pedido para cada fornecedor
      const pedidosCriados = [];
      for (const [fornecedor_id, produtos] of Object.entries(produtosPorFornecedor)) {
        const pedidoData: CreatePedidoDto = {
          loja_id: fornecedor_id,
          descricao: `Pedido via checkout - ${produtos.length} produto(s)`,
          forma_pagamento: selectedPayment === "pix" ? "pix" : "cartao_credito",
          prazo_dias: 7, // Prazo padrão de 7 dias
          produtos: produtos,
        };

        const pedido = await pedidosService.create(pedidoData);
        pedidosCriados.push(pedido);
      }

      // Limpar carrinho e dados do checkout após sucesso
      clearCart();
      clearCheckoutData();
      setSuccess(true);

      // Redirecionar para página de sucesso após 2 segundos
      setTimeout(() => {
        router.push("/store/orders");
      }, 2000);
    } catch (err: any) {
      console.error("❌ Erro ao criar pedido:", err);
      setError(err.message || "Erro ao processar pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Redirect if no checkout data
  if (!checkoutData) {
    router.push("/store/checkout");
    return null;
  }

  const shippingMethodText = checkoutData.shippingMethod === "standard" ? "Standard (2-4 business days)" : "Economy (7-10 business days)";

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
                  <BreadcrumbLink href="/store/checkout" className="text-zinc-200 transition hover:text-white">
                    Information
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-zinc-200" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/store/checkout/shipping" className="text-zinc-200 transition hover:text-white">
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
            {/* Mensagens de Erro e Sucesso */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-500 bg-green-500/10 text-green-500">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>Pedido criado com sucesso! Redirecionando...</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Contact Information Display */}
              <section className="rounded-xl bg-zinc-950/80 p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-zinc-400">Contact</h3>
                  <Link href="/store/checkout" className="text-sm font-medium text-zinc-500 hover:underline">
                    Change
                  </Link>
                </div>
                <p className="text-sm text-zinc-200">{checkoutData.email}</p>
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
                  {checkoutData.firstName} {checkoutData.lastName}, {checkoutData.address}
                  {checkoutData.apartment && `, ${checkoutData.apartment}`}, {checkoutData.city}, {checkoutData.state} {checkoutData.postalCode}, {checkoutData.country}
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
                <p className="text-sm text-zinc-200">{shippingMethodText}</p>
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
                <Button asChild variant="link" className="group gap-2 px-0 text-sm text-zinc-300 hover:text-white" disabled={loading || success}>
                  <Link href="/checkout/shipping">
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    Return to shipping
                  </Link>
                </Button>
                <Button type="submit" className="w-full sm:w-auto" disabled={loading || success || cartItems.length === 0}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Order completed
                    </>
                  ) : selectedPayment === "pix" ? (
                    "Generate PIX Code"
                  ) : (
                    "Complete order"
                  )}
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
