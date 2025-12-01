import { api } from "@/config/axios.config";

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

export interface SupplierOrder {
  id: string;
  loja_id: string;
  loja_nome?: string;
  valor_total: number;
  status: "pendente" | "processando" | "enviado" | "entregue" | "cancelado";
  forma_pagamento: string;
  prazo_dias: number;
  criado_em: string;
  enviado_em?: string;
  entregue_em?: string;
}

export interface UpdateSupplierProfileData {
  nome_fantasia?: string;
  razao_social?: string;
  descricao?: string;
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

export interface CreateCampaignData {
  nome: string;
  descricao?: string;
  valor_min?: number;
  quantidade_min?: number;
  desconto_porcentagem: number;
}

export interface UpdateCampaignData {
  nome?: string;
  descricao?: string;
  valor_min?: number;
  quantidade_min?: number;
  desconto_porcentagem?: number;
  status?: "ativo" | "inativo";
}

export interface SupplierTerm {
  id: string;
  estado: string;
  cashback_porcentagem: number;
  prazo_extendido_dias: number;
  variacao_unitario: number;
  criado_em: string;
  atualizado_em?: string;
}

export interface CreateTermData {
  estado: string;
  cashback_porcentagem: number;
  prazo_extendido_dias: number;
  variacao_unitario: number;
}

export interface UpdateTermData {
  cashback_porcentagem?: number;
  prazo_extendido_dias?: number;
  variacao_unitario?: number;
}

export interface CreateProductData {
  nome: string;
  descricao?: string;
  imagem_url?: string;
  valor_unitario: number;
  quantidade_estoque: number;
  categoria: string;
}

export interface UpdateProductData {
  nome?: string;
  descricao?: string;
  imagem_url?: string;
  valor_unitario?: number;
  quantidade_estoque?: number;
  categoria?: string;
}

export const supplierService = {
  /**
   * Get supplier profile (authenticated supplier)
   */
  getProfile: async (): Promise<SupplierProfile> => {
    const response = await api.get("/fornecedores/me/profile");
    return response.data.data;
  },

  /**
   * Update supplier profile
   */
  updateProfile: async (data: UpdateSupplierProfileData): Promise<SupplierProfile> => {
    const response = await api.patch("/fornecedores/me/profile", data);
    return response.data.data;
  },

  /**
   * Get supplier statistics for dashboard
   */
  getStatistics: async (): Promise<SupplierStatistics> => {
    const response = await api.get("/fornecedores/me/statistics");
    return response.data.data;
  },

  /**
   * Get all products from this supplier
   */
  getMyProducts: async (): Promise<{ data: SupplierProduct[] }> => {
    const response = await api.get("/fornecedores/me/produtos");
    return response.data;
  },

  /**
   * Create a new product for this supplier
   */
  createProduct: async (data: CreateProductData): Promise<SupplierProduct> => {
    const response = await api.post("/fornecedores/me/produtos", data);
    return response.data.data;
  },

  /**
   * Update a product owned by this supplier
   */
  updateProduct: async (productId: string, data: UpdateProductData): Promise<SupplierProduct> => {
    const response = await api.patch(`/fornecedores/me/produtos/${productId}`, data);
    return response.data.data;
  },

  /**
   * Delete a product owned by this supplier
   */
  deleteProduct: async (productId: string): Promise<void> => {
    await api.delete(`/fornecedores/me/produtos/${productId}`);
  },

  /**
   * Get all orders made to this supplier
   */
  getMyOrders: async (): Promise<{ data: SupplierOrder[] }> => {
    const response = await api.get("/fornecedores/me/pedidos");
    return response.data;
  },

  /**
   * Get a specific order by ID
   */
  getOrderById: async (orderId: string): Promise<SupplierOrder> => {
    const response = await api.get(`/fornecedores/me/pedidos/${orderId}`);
    return response.data.data;
  },

  /**
   * Update order status
   */
  updateOrderStatus: async (orderId: string, status: string): Promise<SupplierOrder> => {
    const response = await api.patch(`/fornecedores/me/pedidos/${orderId}/status`, { status });
    return response.data.data;
  },

  /**
   * Get all campaigns for the supplier
   */
  getCampaigns: async (): Promise<{ data: SupplierCampaign[] }> => {
    const response = await api.get("/campanhas");
    return response.data;
  },

  /**
   * Create a new campaign
   */
  createCampaign: async (data: CreateCampaignData): Promise<SupplierCampaign> => {
    const response = await api.post("/campanhas", data);
    return response.data.data;
  },

  /**
   * Update a campaign
   */
  updateCampaign: async (id: string, data: UpdateCampaignData): Promise<SupplierCampaign> => {
    const response = await api.patch(`/campanhas/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a campaign
   */
  deleteCampaign: async (id: string): Promise<void> => {
    await api.delete(`/campanhas/${id}`);
  },

  /**
   * Get all commercial terms for the supplier
   */
  getTerms: async (): Promise<{ data: SupplierTerm[] }> => {
    const response = await api.get("/condicoes-comerciais");
    return response.data;
  },

  /**
   * Create a new commercial term
   */
  createTerm: async (data: CreateTermData): Promise<SupplierTerm> => {
    const response = await api.post("/condicoes-comerciais", data);
    return response.data.data;
  },

  /**
   * Update a commercial term
   */
  updateTerm: async (id: string, data: UpdateTermData): Promise<SupplierTerm> => {
    const response = await api.patch(`/condicoes-comerciais/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a commercial term
   */
  deleteTerm: async (id: string): Promise<void> => {
    await api.delete(`/condicoes-comerciais/${id}`);
  },
};
