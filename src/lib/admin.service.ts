import { api } from "@/config/axios.config";

export interface User {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string | null;
  funcao: "loja" | "fornecedor" | "admin";
  email_verificado: boolean;
  endereco_id: string | null;
  criado_em: string;
  atualizado_em: string;
}

export interface CreateUserData {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  confirmedPassword: string;
  funcao: "loja" | "fornecedor" | "admin";
  telefone?: string | null;
  endereco_id?: string | null;
}

export interface UpdateUserData {
  nome?: string;
  sobrenome?: string;
  email?: string;
  funcao?: "loja" | "fornecedor" | "admin";
  telefone?: string | null;
  endereco_id?: string | null;
}

export const adminService = {
  /**
   * Get all users (admin only)
   */
  getAllUsers: async () => {
    const response = await api.get("/usuarios");
    return response.data;
  },

  /**
   * Get user by ID
   */
  getUserById: async (userId: string) => {
    const response = await api.get(`/usuarios/${userId}`);
    return response.data;
  },

  /**
   * Create new user (admin only)
   */
  createUser: async (data: CreateUserData) => {
    const response = await api.post("/usuarios/cadastro", data);
    return response.data;
  },

  /**
   * Update user (admin only)
   */
  updateUser: async (userId: string, data: UpdateUserData) => {
    const response = await api.patch(`/usuarios/${userId}`, data);
    return response.data;
  },

  /**
   * Delete user (admin only)
   */
  deleteUser: async (userId: string) => {
    const response = await api.delete(`/usuarios/${userId}`);
    return response.data;
  },

  /**
   * Get dashboard statistics
   */
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
