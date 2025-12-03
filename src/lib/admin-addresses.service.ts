import { api } from "@/config/axios.config";
import type { Endereco, CreateEnderecoData, UpdateEnderecoData } from "@/types/endereco";

export const adminAddressesService = {
  getAllAddresses: async (): Promise<Endereco[]> => {
    const response = await api.get("/enderecos");
    return response.data;
  },

  getAddressById: async (addressId: string): Promise<Endereco> => {
    const response = await api.get(`/enderecos/${addressId}`);
    return response.data;
  },

  createAddress: async (data: CreateEnderecoData): Promise<Endereco> => {
    const response = await api.post("/enderecos", data);
    return response.data.data;
  },

  updateAddress: async (addressId: string, data: UpdateEnderecoData): Promise<Endereco> => {
    const response = await api.patch(`/enderecos/${addressId}`, data);
    return response.data;
  },

  deleteAddress: async (addressId: string): Promise<void> => {
    await api.delete(`/enderecos/${addressId}`);
  },
};
