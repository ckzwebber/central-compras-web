import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Produto } from "@/types/produto";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { LiaCartPlusSolid } from "react-icons/lia";
import useCart from "@/hooks/states/use-cart";
import { CartSheet } from "./cart-sheet";

type ProductCardProps = {
  produto: Produto;
};

export const ProductCard = ({ produto }: ProductCardProps) => {
  const { cart, updateCart } = useCart();
  const cartRef = useRef<{ open: () => void }>(null);

  const addToCart = (produto: Produto) => {
    if (produto) {
      if (cart?.produtos.find((item) => item.id === produto.id)) {
        updateCart({
          produtos: cart.produtos.map((item) => (item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item)),
          total: cart.total + produto.valor_unitario,
        });
        cartRef.current?.open();
        return;
      }

      updateCart({
        produtos: cart?.produtos ? [...cart.produtos, { ...produto, quantidade: 1 }] : [{ ...produto, quantidade: 1 }],
        total: cart?.total ? cart.total + produto.valor_unitario : produto.valor_unitario,
      });
    }

    cartRef.current?.open();
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(produto);
  };

  return (
    <Link href={`/product/${produto.id}`}>
      <Card className="bg-zinc-950 overflow-hidden border border-zinc-800 transition-all duration-200 hover:scale-101 hover:shadow-lg hover:border-zinc-500">
        <CardHeader className="p-0">
          <div className="relative aspect-square w-full bg-zinc-950">
            <Image src={produto.imagem_url} alt={produto.nome} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          <h3 className="line-clamp-2 text-lg font-semibold text-white">{produto.nome}</h3>
          <p className="line-clamp-3 text-sm  text-zinc-500">{produto.descricao}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <p className="text-xl font-bold text-white">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(produto.valor_unitario)}
          </p>
          <Button size="sm" onClick={handleAddToCart}>
            <LiaCartPlusSolid />
          </Button>
        </CardFooter>
      </Card>
      <div className="hidden">
        <CartSheet ref={cartRef} />
      </div>
    </Link>
  );
};
