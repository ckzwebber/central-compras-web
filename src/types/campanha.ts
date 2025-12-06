export interface Campanha {
  id: string;
  nome: string;
  descricao: string | null;
  valor_min: number;
  quantidade_min: number;
  desconto_porcentagem: number;
  status: "ativo" | "inativo";
  fornecedor_id: string;
  criado_em: Date;
  atualizado_em: Date;
}

export interface CampanhaAplicada {
  id: string;
  nome: string;
  desconto_porcentagem: number;
}

export interface CondicaoComercial {
  id: string;
  uf: string;
  cashback_porcentagem: number | null;
  prazo_extendido_dias: number | null;
  variacao_unitario: number | null;
  fornecedor_id: string;
  criado_em: Date;
  atualizado_em: Date;
}

export interface CondicaoComercialAplicada {
  uf: string;
  cashback_porcentagem: number | null;
  prazo_extendido_dias: number | null;
}
