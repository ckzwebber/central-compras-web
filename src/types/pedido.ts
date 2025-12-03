export interface PedidoProduto {
  id: string;
  pedido_id: string;
  produto_id: string;
  quantidade: number;
  valor_unitario: string;
  criado_em: string;
  atualizado_em: string;
  deletado_em: string | null;
  produto_nome: string;
  produto_categoria: string;
}

export interface Pedido {
  id: string;
  valor_total: string;
  descricao: string | null;
  usuario_id: string;
  loja_id: string;
  fornecedor_id: string;
  status: "pendente" | "processando" | "enviado" | "entregue" | "cancelado";
  forma_pagamento: "cartao" | "pix";
  prazo_dias: number;
  criado_em: string;
  enviado_em: string | null;
  entregue_em: string | null;
  deletado_em: string | null;
  loja?: {
    id: string;
    nome: string;
    cnpj: string;
    usuario_id: string;
    endereco_id: string;
  };
  fornecedor?: {
    id: string;
    nome: string;
  };
  itens?: PedidoProduto[];
}

export interface PedidoResponse {
  success: boolean;
  message: string;
  data: Pedido;
}

export interface PedidosResponse {
  success: boolean;
  message: string;
  data: Pedido[];
}

export interface CreatePedidoDto {
  fornecedor_id: string;
  descricao?: string;
  forma_pagamento: "cartao" | "pix";
  prazo_dias: number;
  status?: "pendente" | "enviado" | "entregue" | "cancelado";
  produtos: {
    produto_id: string;
    quantidade: number;
    valor_unitario: number;
  }[];
}

export interface UpdatePedidoDto {
  descricao?: string;
  status?: "pendente" | "processando" | "enviado" | "entregue" | "cancelado";
  forma_pagamento?: "cartao" | "pix";
  prazo_dias?: number;
}

export type PedidoStatus = "pending" | "processing" | "shipped" | "delivered";

export interface PedidoFrontend {
  id: string;
  fornecedor: {
    id: string;
    nome: string;
  };
  valorTotal: number;
  status: PedidoStatus;
  dataCriacao: Date;
  produtos: {
    id: string;
    nome: string;
    quantidade: number;
    valorUnitario: number;
    subtotal: number;
  }[];
  cashback?: number;
  prazoEntrega?: number;
}
