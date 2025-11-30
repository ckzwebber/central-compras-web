import { api } from "@/config/axios.config";

export interface UpdateUserData {
  nome?: string;
  sobrenome?: string;
  email?: string;
  cpf?: string;
  telefone?: string;
}

export interface UpdatePasswordData {
  senhaAtual: string;
  novaSenha: string;
  confirmarNovaSenha: string;
}

export interface UpdateStoreData {
  nome?: string;
  cnpj?: string;
}

export const userService = {
  /**
   * Get user data by ID
   */
  getUser: async (userId: string) => {
    const response = await api.get(`/usuarios/${userId}`);
    return response.data;
  },

  /**
   * Update user data
   */
  updateUser: async (userId: string, data: UpdateUserData) => {
    const response = await api.patch(`/usuarios/${userId}`, data);
    return response.data;
  },

  /**
   * Update user password
   */
  updatePassword: async (userId: string, data: UpdatePasswordData) => {
    const response = await api.put(`/usuarios/${userId}/senha`, data);
    return response.data;
  },

  /**
   * Get user's store data
   */
  getMyStore: async () => {
    const response = await api.get("/lojas/minhas/lojas");
    return response.data;
  },

  /**
   * Update store data
   */
  updateStore: async (storeId: string, data: UpdateStoreData) => {
    const response = await api.patch(`/lojas/${storeId}`, data);
    return response.data;
  },
};
