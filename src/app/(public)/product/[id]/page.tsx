"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { LiaCartPlusSolid } from "react-icons/lia";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartSheet } from "@/components/cart-sheet";
import useCart from "@/hooks/states/use-cart";
import { Produto } from "@/types/produto";

const MOCK_PRODUCT: Produto = {
  id: "1",
  nome: "Product 1",
  descricao: "Detailed description of Product 1. This is a high-quality product made with premium materials. Perfect for everyday use and built to last. Features include durability, comfort, and style.",
  valor_unitario: 10.0,
  imagem_url: "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=2048&q=75",
  quantidade_estoque: 10,
  categoria: "Category 1",
  criado_em: new Date("2024-01-08T10:00:00Z"),
  atualizado_em: new Date("2024-06-12T12:00:00Z"),
};

export default function ProductPage() {
  const { cart, updateCart } = useCart();
  const cartRef = useRef<{ open: () => void }>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = [MOCK_PRODUCT.imagem_url, MOCK_PRODUCT.imagem_url, MOCK_PRODUCT.imagem_url];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= MOCK_PRODUCT.quantidade_estoque) {
      setQuantity(newQuantity);
    }
  };

  const addToCart = () => {
    if (MOCK_PRODUCT) {
      const existingProduct = cart?.produtos.find((item) => item.id === MOCK_PRODUCT.id);

      if (existingProduct && cart) {
        updateCart({
          produtos: cart.produtos.map((item) => (item.id === MOCK_PRODUCT.id ? { ...item, quantidade: item.quantidade + quantity } : item)),
          total: cart.total + MOCK_PRODUCT.valor_unitario * quantity,
        });
      } else {
        updateCart({
          produtos: cart?.produtos ? [...cart.produtos, { ...MOCK_PRODUCT, quantidade: quantity }] : [{ ...MOCK_PRODUCT, quantidade: quantity }],
          total: cart?.total ? cart.total + MOCK_PRODUCT.valor_unitario * quantity : MOCK_PRODUCT.valor_unitario * quantity,
        });
      }

      cartRef.current?.open();
      setQuantity(1);
    }
  };

  return (
    <main className="bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button asChild variant="link" className="group gap-2 px-0 text-sm text-zinc-300 hover:text-white">
            <Link href="/">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to catalog
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <Card className="overflow-hidden border-zinc-800 bg-zinc-950">
              <CardContent className="p-0">
                <div className="relative aspect-square w-full bg-zinc-950">
                  <Image src={productImages[selectedImage]} alt={MOCK_PRODUCT.nome} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              {productImages.map((image, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer overflow-hidden border transition-all duration-200 bg-zinc-950 hover:border-zinc-500 ${selectedImage === index ? "border-white ring-2 ring-white/20" : "border-zinc-800"}`}
                  onClick={() => setSelectedImage(index)}>
                  <CardContent className="p-0">
                    <div className="relative aspect-square w-full bg-zinc-950">
                      <Image src={image} alt={`${MOCK_PRODUCT.nome} - Image ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 33vw, 15vw" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="inline-block rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs font-medium text-zinc-400">{MOCK_PRODUCT.categoria}</span>
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">{MOCK_PRODUCT.nome}</h1>
            </div>

            <div>
              <p className="text-3xl font-bold text-white">{formatCurrency(MOCK_PRODUCT.valor_unitario)}</p>
            </div>

            <Separator className="bg-zinc-800" />
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">Description</h2>
              <p className="text-sm leading-relaxed text-zinc-400">{MOCK_PRODUCT.descricao}</p>
            </div>

            <Separator className="bg-zinc-800" />

            <div>
              <p className="text-sm text-zinc-400">
                <span className="font-medium text-zinc-300">Availability:</span>{" "}
                {MOCK_PRODUCT.quantidade_estoque > 0 ? <span className="text-green-400">In stock ({MOCK_PRODUCT.quantidade_estoque} units)</span> : <span className="text-red-400">Out of stock</span>}
              </p>
            </div>

            <div className="">
              <Label className="text-sm font-medium text-zinc-300">Quantity</Label>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-900/50 mt-2">
                  <Button type="button" variant="default" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className="h-10 px-3 text-zinc-400 hover:text-white disabled:opacity-50">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-sm font-medium text-white">{quantity}</span>
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= MOCK_PRODUCT.quantidade_estoque}
                    className="h-10 px-3 text-zinc-400 hover:text-white disabled:opacity-50">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-zinc-500">{MOCK_PRODUCT.quantidade_estoque} available</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={addToCart} disabled={MOCK_PRODUCT.quantidade_estoque === 0} className="w-full gap-2 py-6 text-base font-semibold" size="lg">
                <LiaCartPlusSolid className="h-5 w-5" />
                Add to cart
              </Button>

              {quantity > 1 && <p className="text-center text-sm text-zinc-400">Total: {formatCurrency(MOCK_PRODUCT.valor_unitario * quantity)}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden">
        <CartSheet ref={cartRef} />
      </div>
    </main>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
