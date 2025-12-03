import { api } from "@/config/axios.config";

export const fornecedoresService = {
  getById: async (id: string) => {
    const response = await api.get(`/fornecedores/${id}`);
    return response.data;
  },
};
