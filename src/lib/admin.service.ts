import { api } from "@/config/axios.config";
import type { User, CreateUserData, UpdateAdminUserData } from "@/types/user";

export const adminService = {
  getAllUsers: async () => {
    const response = await api.get("/usuarios");
    return response.data;
  },

  getUserById: async (userId: string) => {
    const response = await api.get(`/usuarios/${userId}`);
    return response.data;
  },

  createUser: async (data: CreateUserData) => {
    const response = await api.post("/usuarios/cadastro", data);
    return response.data;
  },

  updateUser: async (userId: string, data: UpdateAdminUserData) => {
    const response = await api.patch(`/usuarios/${userId}`, data);
    return response.data;
  },

  deleteUser: async (userId: string) => {
    const response = await api.delete(`/usuarios/${userId}`);
    return response.data;
  },

  getStatistics: async () => {
    const [users, stores, suppliers, products] = await Promise.all([api.get("/usuarios"), api.get("/lojas"), api.get("/fornecedores"), api.get("/produtos")]);

    return {
      totalUsers: users.data.data?.length || 0,
      totalStores: stores.data.data?.length || 0,
      totalSuppliers: suppliers.data.data?.length || 0,
      totalProducts: products.data.data?.length || 0,
    };
  },
};
