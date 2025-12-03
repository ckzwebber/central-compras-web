import { api } from "@/config/axios.config";
import type {
  SupplierProfile,
  UpdateSupplierProfileData,
  SupplierStatistics,
  SupplierProduct,
  CreateSupplierProductData,
  UpdateSupplierProductData,
  SupplierOrder,
  SupplierCampaign,
  CreateSupplierCampaignData,
  UpdateSupplierCampaignData,
  SupplierTerm,
  CreateSupplierTermData,
  UpdateSupplierTermData,
} from "@/types/supplier";

export const supplierService = {
  getProfile: async (): Promise<SupplierProfile> => {
    const response = await api.get("/fornecedores/me/profile");
    return response.data.data;
  },

  updateProfile: async (data: UpdateSupplierProfileData): Promise<SupplierProfile> => {
    const response = await api.patch("/fornecedores/me/profile", data);
    return response.data.data;
  },

  getStatistics: async (): Promise<SupplierStatistics> => {
    const response = await api.get("/fornecedores/me/statistics");
    return response.data.data;
  },

  getMyProducts: async (): Promise<{ data: SupplierProduct[] }> => {
    const response = await api.get("/fornecedores/me/produtos");
    return response.data;
  },

  createProduct: async (data: CreateSupplierProductData): Promise<SupplierProduct> => {
    const response = await api.post("/fornecedores/me/produtos", data);
    return response.data.data;
  },

  updateProduct: async (productId: string, data: UpdateSupplierProductData): Promise<SupplierProduct> => {
    const response = await api.patch(`/fornecedores/me/produtos/${productId}`, data);
    return response.data.data;
  },

  deleteProduct: async (productId: string): Promise<void> => {
    await api.delete(`/fornecedores/me/produtos/${productId}`);
  },

  getMyOrders: async (): Promise<{ data: SupplierOrder[] }> => {
    const response = await api.get("/fornecedores/me/pedidos");
    return response.data;
  },

  getOrderById: async (orderId: string): Promise<SupplierOrder> => {
    const response = await api.get(`/fornecedores/me/pedidos/${orderId}`);
    return response.data.data;
  },

  updateOrderStatus: async (orderId: string, status: string): Promise<SupplierOrder> => {
    const response = await api.patch(`/fornecedores/me/pedidos/${orderId}/status`, { status });
    return response.data.data;
  },

  getCampaigns: async (): Promise<{ data: SupplierCampaign[] }> => {
    const response = await api.get("/campanhas");
    return response.data;
  },

  createCampaign: async (data: CreateSupplierCampaignData): Promise<SupplierCampaign> => {
    const response = await api.post("/campanhas", data);
    return response.data.data;
  },

  updateCampaign: async (id: string, data: UpdateSupplierCampaignData): Promise<SupplierCampaign> => {
    const response = await api.patch(`/campanhas/${id}`, data);
    return response.data.data;
  },

  deleteCampaign: async (id: string): Promise<void> => {
    await api.delete(`/campanhas/${id}`);
  },

  getTerms: async (): Promise<{ data: SupplierTerm[] }> => {
    const response = await api.get("/condicoes-comerciais");
    return response.data;
  },

  createTerm: async (data: CreateSupplierTermData): Promise<SupplierTerm> => {
    const response = await api.post("/condicoes-comerciais", data);
    return response.data.data;
  },

  updateTerm: async (id: string, data: UpdateSupplierTermData): Promise<SupplierTerm> => {
    const response = await api.patch(`/condicoes-comerciais/${id}`, data);
    return response.data.data;
  },

  deleteTerm: async (id: string): Promise<void> => {
    await api.delete(`/condicoes-comerciais/${id}`);
  },
};
