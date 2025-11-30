import { api } from "@/config/axios.config";

export interface Fornecedor {
  id: string;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
}

export const fornecedoresService = {
  /**
   * Busca um fornecedor específico por ID
   */
  getById: async (id: string) => {
    const response = await api.get(`/fornecedores/${id}`);
    return response.data;
  },
};
