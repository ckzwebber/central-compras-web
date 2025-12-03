export interface SupplierProfile {
  id: string;
  nome_fantasia?: string;
  razao_social?: string;
  cnpj: string;
  descricao?: string;
  usuario_id?: string;
  criado_em: string;
  atualizado_em?: string;
}

export interface UpdateSupplierProfileData {
  nome_fantasia?: string;
  razao_social?: string;
  descricao?: string;
}

export interface SupplierStatistics {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  monthlyRevenue: number;
  activeCampaigns?: number;
}

export interface SupplierProduct {
  id: string;
  nome: string;
  descricao?: string;
  imagem_url?: string;
  valor_unitario: number;
  quantidade_estoque: number;
  categoria: string;
  criado_em: string;
  atualizado_em?: string;
}

export interface CreateSupplierProductData {
  nome: string;
  descricao?: string;
  imagem_url?: string;
  valor_unitario: number;
  quantidade_estoque: number;
  categoria: string;
}

export interface UpdateSupplierProductData {
  nome?: string;
  descricao?: string;
  imagem_url?: string;
  valor_unitario?: number;
  quantidade_estoque?: number;
  categoria?: string;
}

export interface SupplierOrder {
  id: string;
  loja_id: string;
  loja_nome?: string;
  valor_total: number;
  status: "pendente" | "processando" | "enviado" | "entregue";
  forma_pagamento: string;
  prazo_dias: number;
  criado_em: string;
  enviado_em?: string;
  entregue_em?: string;
}

export interface SupplierCampaign {
  id: string;
  nome: string;
  descricao?: string;
  valor_min?: number;
  quantidade_min?: number;
  desconto_porcentagem: number;
  status: "ativo" | "inativo";
  criado_em: string;
  atualizado_em?: string;
}

export interface CreateSupplierCampaignData {
  nome: string;
  descricao?: string;
  valor_min?: number;
  quantidade_min?: number;
  desconto_porcentagem: number;
}

export interface UpdateSupplierCampaignData {
  nome?: string;
  descricao?: string;
  valor_min?: number;
  quantidade_min?: number;
  desconto_porcentagem?: number;
  status?: "ativo" | "inativo";
}

export interface SupplierTerm {
  id: string;
  uf: string;
  cashback_porcentagem: number;
  prazo_extendido_dias: number;
  variacao_unitario: number;
  criado_em: string;
  atualizado_em?: string;
}

export interface CreateSupplierTermData {
  uf: string;
  cashback_porcentagem: number;
  prazo_extendido_dias: number;
  variacao_unitario: number;
}

export interface UpdateSupplierTermData {
  cashback_porcentagem?: number;
  prazo_extendido_dias?: number;
  variacao_unitario?: number;
}
