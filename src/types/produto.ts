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

// Tipo para resposta da API (padrão DefaultResponseDto do backend)
export interface ProdutosResponse {
  success: boolean;
  message: string;
  data: Produto[];
}
