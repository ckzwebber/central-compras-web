import { Produto } from "./produto";

export interface Carrinho {
  produtos: (Produto & { quantidade: number })[];
  total: number;
}
