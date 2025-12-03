export interface Fornecedor {
  id: string;
  nome_fantasia?: string;
  razao_social?: string;
  cnpj: string;
  descricao?: string;
  usuario_id?: string;
  criado_em: string;
  atualizado_em?: string;
  deletado_em?: string;
}

export interface CreateFornecedorData {
  nome_fantasia?: string;
  razao_social?: string;
  cnpj: string;
  descricao?: string;
  usuario_id?: string;
}

export interface UpdateFornecedorData {
  nome_fantasia?: string;
  razao_social?: string;
  cnpj?: string;
  descricao?: string;
}
