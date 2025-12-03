import { api } from "@/config/axios.config";
import type { UpdateUserData, UpdatePasswordData, UpdateStoreData } from "@/types/user";

export const userService = {
  getUser: async (userId: string) => {
    const response = await api.get(`/usuarios/${userId}`);
    return response.data;
  },

  updateUser: async (userId: string, data: UpdateUserData) => {
    const response = await api.patch(`/usuarios/${userId}`, data);
    return response.data;
  },

  updatePassword: async (userId: string, data: UpdatePasswordData) => {
    const response = await api.put(`/usuarios/${userId}/senha`, data);
    return response.data;
  },

  getMyStore: async () => {
    const response = await api.get("/lojas/minhas/lojas");
    return response.data;
  },

  updateStore: async (storeId: string, data: UpdateStoreData) => {
    const response = await api.patch(`/lojas/${storeId}`, data);
    return response.data;
  },
};
