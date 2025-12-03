import { api } from "@/config/axios.config";
import type { Fornecedor, CreateFornecedorData, UpdateFornecedorData } from "@/types/fornecedor";

export const adminSuppliersService = {
  getAllSuppliers: async () => {
    const response = await api.get("/fornecedores");
    return response.data;
  },

  getSupplierById: async (supplierId: string) => {
    const response = await api.get(`/fornecedores/${supplierId}`);
    return response.data;
  },

  createSupplier: async (data: CreateFornecedorData) => {
    const response = await api.post("/fornecedores", data);
    return response.data;
  },

  updateSupplier: async (supplierId: string, data: UpdateFornecedorData) => {
    const response = await api.patch(`/fornecedores/${supplierId}`, data);
    return response.data;
  },

  deleteSupplier: async (supplierId: string) => {
    const response = await api.delete(`/fornecedores/${supplierId}`);
    return response.data;
  },
};
