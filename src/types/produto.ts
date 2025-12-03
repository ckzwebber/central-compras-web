export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  imagem_url: string | null;
  valor_unitario: number;
  quantidade_estoque: number;
  fornecedor_id: string;
  categoria: string;
  criado_em: Date;
  atualizado_em: Date;
}

export interface ProdutosResponse {
  success: boolean;
  message: string;
  data: Produto[];
}

export interface CreateProdutoData {
  nome: string;
  descricao: string;
  imagem_url?: string | null;
  valor_unitario: number;
  quantidade_estoque: number;
  fornecedor_id: string;
  categoria: string;
}

export interface UpdateProdutoData {
  nome?: string;
  descricao?: string;
  imagem_url?: string | null;
  valor_unitario?: number;
  quantidade_estoque?: number;
  fornecedor_id?: string;
  categoria?: string;
}
