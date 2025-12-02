"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface OrderSummaryItem {
  id: string;
  nome: string;
  descricao: string;
  imagem_url: string | null;
  quantidade: number;
  valor_unitario: number;
}

interface OrderSummaryProps {
  items: OrderSummaryItem[];
  subtotal: number;
  shippingCost?: number | null;
  shippingLabel?: string;
  taxesCalculated?: boolean;
  taxesAmount?: number;
  total: number;
}

export function OrderSummary({ items, subtotal, shippingCost = null, shippingLabel = "Calculated at next step", taxesCalculated = false, taxesAmount, total }: OrderSummaryProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <aside className="space-y-5">
      <Card className="border-0 bg-zinc-950/80 py-5">
        <CardHeader className="px-5">
          <CardTitle className="text-lg font-semibold text-white">Order summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 px-5">
          {items.length === 0 ? (
            <div className="rounded-lg border border-dashed border-zinc-800 bg-zinc-900/50 p-5 text-sm text-zinc-400">Your cart is empty. Add products to proceed with the checkout.</div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="relative h-20 w-20">
                    <div className="h-full w-full overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
                      <Image src={item.imagem_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop"} alt={item.nome} fill className="object-cover" sizes="80px" />
                    </div>
                    <span className="absolute text-white -top-2 -right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 text-xs">{item.quantidade}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-white">{item.nome}</p>
                    <p className="line-clamp-2 text-xs text-zinc-400">{item.descricao}</p>
                  </div>
                  <p className="text-sm font-medium text-white">{formatCurrency(item.valor_unitario * item.quantidade)}</p>
                </div>
              ))}
            </div>
          )}

          <Separator className="bg-zinc-800" />

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between text-zinc-300">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-zinc-300">
              <span>Shipping</span>
              {shippingCost !== null ? <span>{formatCurrency(shippingCost)}</span> : <span className="text-xs text-zinc-500">{shippingLabel}</span>}
            </div>
            <div className="flex items-center justify-between text-zinc-300">
              <span>Taxes</span>
              {taxesCalculated && taxesAmount !== undefined ? <span>{formatCurrency(taxesAmount)}</span> : <span className="text-xs text-zinc-500">Calculated at next step</span>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-zinc-800 px-5 pt-5">
          <div className="flex w-full items-center justify-between text-base font-semibold text-white">
            <span>Total</span>
            <div className="flex flex-col items-end leading-tight">
              <span className="text-xs text-zinc-400">BRL</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </CardFooter>
      </Card>

      <div className="rounded-xl bg-zinc-950/80 px-5 py-4 text-sm text-zinc-400">
        <p className="font-medium text-white">Need help?</p>
        <p className="mt-2">
          Contact our support team{" "}
          <Link href="/contact" className="hover:text-white hover:underline">
            here
          </Link>
          .
        </p>
      </div>
    </aside>
  );
}
