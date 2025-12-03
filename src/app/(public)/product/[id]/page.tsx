"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Loader2, AlertCircle } from "lucide-react";
import { LiaCartPlusSolid } from "react-icons/lia";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useCart from "@/hooks/states/use-cart";
import { Produto } from "@/types/produto";
import { produtosService } from "@/lib/produtos.service";
import { fornecedoresService } from "@/lib/fornecedores.service";
import { useParams } from "next/navigation";
import { Fornecedor } from "@/types/fornecedor";
import { authService } from "@/lib/auth.service";

export default function ProductPage() {
  const { cart, updateCart } = useCart();
  const [product, setProduct] = useState<Produto | null>(null);
  const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userFunction, setUserFunction] = useState<string | undefined>(undefined);

  const { id } = useParams();

  useEffect(() => {
    const user = authService.getUser();
    setUserFunction(user?.funcao);

    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        if (id) {
          const data = await produtosService.getById(id.toString());
          setProduct(data);

          if (data.fornecedor_id) {
            try {
              const fornecedorResponse = await fornecedoresService.getById(data.fornecedor_id);
              if (fornecedorResponse.success && fornecedorResponse.data) {
                setFornecedor(fornecedorResponse.data);
              }
            } catch (err) {}
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar produto");
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const handleQuantityChange = (delta: number) => {
    if (!product) return;
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.quantidade_estoque) {
      setQuantity(newQuantity);
    }
  };

  const addToCart = () => {
    if (product) {
      if (cart && cart.produtos.length > 0) {
        const primeiroFornecedor = cart.produtos[0].fornecedor_id;
        if (product.fornecedor_id !== primeiroFornecedor) {
          alert("Você só pode adicionar produtos do mesmo fornecedor ao carrinho. Por favor, finalize a compra atual ou limpe o carrinho.");
          return;
        }
      }

      const existingProduct = cart?.produtos.find((item) => item.id === product.id);

      if (existingProduct && cart) {
        updateCart({
          produtos: cart.produtos.map((item) => (item.id === product.id ? { ...item, quantidade: item.quantidade + quantity } : item)),
          total: cart.total + product.valor_unitario * quantity,
        });
      } else {
        updateCart({
          produtos: cart?.produtos ? [...cart.produtos, { ...product, quantidade: quantity }] : [{ ...product, quantidade: quantity }],
          total: cart?.total ? cart.total + product.valor_unitario * quantity : product.valor_unitario * quantity,
        });
      }

      if (typeof window !== "undefined" && (window as any).openCart) {
        (window as any).openCart();
      }

      setQuantity(1);
    }
  };

  const imagemUrl = product?.imagem_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop";
  const productImages = [imagemUrl, imagemUrl, imagemUrl];

  if (isLoading) {
    return (
      <main className="bg-zinc-950 text-zinc-100 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
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
          <Alert variant="destructive" className="border-red-900 bg-red-950/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || "Produto não encontrado"}</AlertDescription>
          </Alert>
        </div>
      </main>
    );
  }

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
                  <Image src={productImages[selectedImage]} alt={product.nome} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
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
                      <Image src={image} alt={`${product.nome} - Image ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 33vw, 15vw" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="inline-block rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs font-medium text-zinc-400">{product.categoria}</span>
              {fornecedor && (
                <span className="ml-2 inline-block text-xs text-zinc-500">
                  by <span className="font-medium text-zinc-400">{fornecedor.cnpj}</span>
                </span>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">{product.nome}</h1>
            </div>

            <div>
              <p className="text-3xl font-bold text-white">{formatCurrency(product.valor_unitario)}</p>
            </div>

            <Separator className="bg-zinc-800" />
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">Description</h2>
              <p className="text-sm leading-relaxed text-zinc-400">{product.descricao}</p>
            </div>

            <Separator className="bg-zinc-800" />

            <div>
              <p className="text-sm text-zinc-400">
                <span className="font-medium text-zinc-300">Availability:</span>{" "}
                {product.quantidade_estoque > 0 ? <span className="text-green-400">In stock ({product.quantidade_estoque} units)</span> : <span className="text-red-400">Out of stock</span>}
              </p>
            </div>

            {(!userFunction || userFunction === "loja" || userFunction === "usuario") && (
              <>
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
                        disabled={quantity >= product.quantidade_estoque}
                        className="h-10 px-3 text-zinc-400 hover:text-white disabled:opacity-50">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-zinc-500">{product.quantidade_estoque} available</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button onClick={addToCart} disabled={product.quantidade_estoque === 0} className="w-full gap-2 py-6 text-base font-semibold" size="lg">
                    <LiaCartPlusSolid className="h-5 w-5" />
                    Add to cart
                  </Button>

                  {quantity > 1 && <p className="text-center text-sm text-zinc-400">Total: {formatCurrency(product.valor_unitario * quantity)}</p>}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
