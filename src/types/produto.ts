export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  imagem_url: string;
  valor_unitario: number;
  quantidade_estoque: number;
  categoria: string;
  criado_em: Date;
  atualizado_em: Date;
}
