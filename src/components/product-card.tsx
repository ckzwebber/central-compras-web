import Image from "next/image";
import { Produto } from "@/types/produto";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { LiaCartPlusSolid } from "react-icons/lia";

type ProductCardProps = {
  produto: Produto;
};

export const ProductCard = ({ produto }: ProductCardProps) => {
  return (
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
        <Button size="sm">
          <LiaCartPlusSolid />
        </Button>
      </CardFooter>
    </Card>
  );
};
