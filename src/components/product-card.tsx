import { Produto } from "@/types/produto";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";

export const ProductCard = (produto: Produto) => {
  return (
    <Card className="overflow-hidden border transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full bg-zinc-100">
          <Image src={produto.imagem_url} alt={produto.nome} fill className="object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2">{produto.nome}</h3>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="text-xl font-bold">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(produto.valor_unitario)}
        </p>
      </CardFooter>
    </Card>
  );
};
