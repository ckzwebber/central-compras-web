"use client";

import Image from "next/image";
import Link from "next/link";
import { Produto } from "@/types/produto";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { LiaCartPlusSolid } from "react-icons/lia";
import { Tag } from "lucide-react";
import useCart from "@/hooks/states/use-cart";
import { authService } from "@/lib/auth.service";
import { campanhasService } from "@/lib/campanhas.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Campanha } from "@/types/campanha";

type ProductCardProps = {
  produto: Produto;
};

export const ProductCard = ({ produto }: ProductCardProps) => {
  const { cart, updateCart } = useCart();
  const [userFunction, setUserFunction] = useState<string | undefined>(undefined);
  const [campanha, setCampanha] = useState<Campanha | null>(null);

  useEffect(() => {
    const user = authService.getUser();
    setUserFunction(user?.funcao);

    const loadCampanha = async () => {
      const campanhaAplicavel = await campanhasService.getMelhorCampanhaPorFornecedor(produto.fornecedor_id);
      setCampanha(campanhaAplicavel);
    };

    loadCampanha();
  }, [produto.fornecedor_id]);

  const imagemUrl = produto.imagem_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop";

  const addToCart = (produto: Produto) => {
    if (produto) {
      if (cart && cart.produtos.length > 0) {
        const primeiroFornecedor = cart.produtos[0].fornecedor_id;
        if (produto.fornecedor_id !== primeiroFornecedor) {
          toast.error("Fornecedor diferente", {
            description: "Você só pode adicionar produtos do mesmo fornecedor. Finalize a compra atual ou limpe o carrinho.",
          });
          return;
        }
      }

      if (cart?.produtos.find((item) => item.id === produto.id)) {
        updateCart({
          produtos: cart.produtos.map((item) => (item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item)),
          total: cart.total + produto.valor_unitario,
        });
      } else {
        updateCart({
          produtos: cart?.produtos ? [...cart.produtos, { ...produto, quantidade: 1 }] : [{ ...produto, quantidade: 1 }],
          total: cart?.total ? cart.total + produto.valor_unitario : produto.valor_unitario,
        });
      }

      if (typeof window !== "undefined" && (window as any).openCart) {
        (window as any).openCart();
      }
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(produto);
  };

  return (
    <Link href={`/product/${produto.id}`}>
      <Card className="group bg-zinc-950 overflow-hidden border border-zinc-800 transition-all duration-200 hover:scale-101 hover:shadow-lg hover:border-zinc-500">
        <CardHeader className="p-0">
          <div className="relative aspect-square w-full bg-zinc-950">
            <Image src={imagemUrl} alt={produto.nome} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            {campanha && (
              <div className="absolute left-2 top-2">
                <Badge className="bg-white text-black border-0 gap-1 font-bold">
                  <Tag className="h-3 w-3" />
                  {campanha.desconto_porcentagem}% OFF
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          <h3 className="line-clamp-2 text-lg font-semibold text-white">{produto.nome}</h3>
          <p className="line-clamp-3 text-sm  text-zinc-500">{produto.descricao}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="flex flex-col">
            {campanha && (
              <span className="text-xs text-zinc-500 line-through">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(produto.valor_unitario)}
              </span>
            )}
            <p className="text-xl font-bold text-white">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(campanha ? produto.valor_unitario * (1 - campanha.desconto_porcentagem / 100) : produto.valor_unitario)}
            </p>
          </div>
          {(!userFunction || userFunction === "loja" || userFunction === "usuario") && (
            <Button size="sm" onClick={handleAddToCart}>
              <LiaCartPlusSolid />
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};
