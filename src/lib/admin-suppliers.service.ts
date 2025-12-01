import { api } from "@/config/axios.config";

export interface Supplier {
  id: string;
  nome_fantasia?: string;
  razao_social?: string;
  cnpj: string;
  descricao?: string;
  usuario_id?: string;
  endereco_id?: string;
  criado_em: string;
  atualizado_em?: string;
  deletado_em?: string;
}

export interface CreateSupplierData {
  nome_fantasia?: string;
  razao_social?: string;
  cnpj: string;
  descricao?: string;
  usuario_id?: string;
  endereco_id?: string;
}

export interface UpdateSupplierData {
  nome_fantasia?: string;
  razao_social?: string;
  cnpj?: string;
  descricao?: string;
}

export const adminSuppliersService = {
  /**
   * Get all suppliers
   */
  getAllSuppliers: async () => {
    const response = await api.get("/fornecedores");
    return response.data;
  },

  /**
   * Get supplier by ID
   */
  getSupplierById: async (supplierId: string) => {
    const response = await api.get(`/fornecedores/${supplierId}`);
    return response.data;
  },

  /**
   * Create new supplier
   */
  createSupplier: async (data: CreateSupplierData) => {
    const response = await api.post("/fornecedores", data);
    return response.data;
  },

  /**
   * Update supplier
   */
  updateSupplier: async (supplierId: string, data: UpdateSupplierData) => {
    const response = await api.patch(`/fornecedores/${supplierId}`, data);
    return response.data;
  },

  /**
   * Delete supplier
   */
  deleteSupplier: async (supplierId: string) => {
    const response = await api.delete(`/fornecedores/${supplierId}`);
    return response.data;
  },
};
