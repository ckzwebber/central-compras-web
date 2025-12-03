import { api } from "@/config/axios.config";
import type { Loja, CreateLojaDto, UpdateLojaDto } from "@/types/loja";

export const adminStoresService = {
  getAllStores: async () => {
    const response = await api.get("/lojas");
    return response.data;
  },

  getStoreById: async (storeId: string) => {
    const response = await api.get(`/lojas/${storeId}`);
    return response.data;
  },

  getStoresByUserId: async (userId: string) => {
    const response = await api.get(`/lojas/usuario/${userId}`);
    return response.data;
  },

  createStore: async (data: CreateLojaDto) => {
    const response = await api.post("/lojas", data);
    return response.data;
  },

  updateStore: async (storeId: string, data: UpdateLojaDto) => {
    const response = await api.patch(`/lojas/${storeId}`, data);
    return response.data;
  },

  deleteStore: async (storeId: string) => {
    const response = await api.delete(`/lojas/${storeId}`);
    return response.data;
  },
};
