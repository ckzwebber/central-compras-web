import { api } from "@/config/axios.config";
import type { Produto, CreateProdutoData, UpdateProdutoData } from "@/types/produto";

export const adminProductsService = {
  getAllProducts: async () => {
    const response = await api.get("/produtos");
    return response.data;
  },

  getProductById: async (productId: string) => {
    const response = await api.get(`/produtos/id/${productId}`);
    return response.data;
  },

  createProduct: async (data: CreateProdutoData) => {
    const response = await api.post("/produtos", data);
    return response.data;
  },

  updateProduct: async (productId: string, data: UpdateProdutoData) => {
    const response = await api.patch(`/produtos/${productId}`, data);
    return response.data;
  },

  deleteProduct: async (productId: string) => {
    const response = await api.delete(`/produtos/${productId}`);
    return response.data;
  },
};
