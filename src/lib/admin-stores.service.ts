import { api } from "@/config/axios.config";

export interface Store {
  id: string;
  nome: string;
  cnpj: string;
  usuario_id: string;
  endereco_id: string | null;
  criado_em: string;
  atualizado_em: string;
}

export interface CreateStoreData {
  nome: string;
  cnpj: string;
  usuario_id: string;
  endereco_id?: string | null;
}

export interface UpdateStoreData {
  nome?: string;
  cnpj?: string;
  endereco_id?: string | null;
}

export const adminStoresService = {
  /**
   * Get all stores
   */
  getAllStores: async () => {
    const response = await api.get("/lojas");
    return response.data;
  },

  /**
   * Get store by ID
   */
  getStoreById: async (storeId: string) => {
    const response = await api.get(`/lojas/${storeId}`);
    return response.data;
  },

  /**
   * Get stores by user ID
   */
  getStoresByUserId: async (userId: string) => {
    const response = await api.get(`/lojas/usuario/${userId}`);
    return response.data;
  },

  /**
   * Create new store
   */
  createStore: async (data: CreateStoreData) => {
    const response = await api.post("/lojas", data);
    return response.data;
  },

  /**
   * Update store
   */
  updateStore: async (storeId: string, data: UpdateStoreData) => {
    const response = await api.patch(`/lojas/${storeId}`, data);
    return response.data;
  },

  /**
   * Delete store
   */
  deleteStore: async (storeId: string) => {
    const response = await api.delete(`/lojas/${storeId}`);
    return response.data;
  },
};
