import { api } from "@/config/axios.config";

export interface Address {
  id: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  cep: string;
  complemento: string | null;
  criado_em: string;
  atualizado_em: string;
}

export interface CreateAddressData {
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  cep: string;
  complemento?: string | null;
}

export interface UpdateAddressData {
  estado?: string;
  cidade?: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  cep?: string;
  complemento?: string | null;
}

export const adminAddressesService = {
  /**
   * Get all addresses
   */
  getAllAddresses: async (): Promise<Address[]> => {
    const response = await api.get("/enderecos");
    return response.data;
  },

  /**
   * Get address by ID
   */
  getAddressById: async (addressId: string): Promise<Address> => {
    const response = await api.get(`/enderecos/${addressId}`);
    return response.data;
  },

  /**
   * Create new address
   */
  createAddress: async (data: CreateAddressData): Promise<Address> => {
    const response = await api.post("/enderecos", data);
    return response.data.data;
  },

  /**
   * Update address
   */
  updateAddress: async (addressId: string, data: UpdateAddressData): Promise<Address> => {
    const response = await api.patch(`/enderecos/${addressId}`, data);
    return response.data;
  },

  /**
   * Delete address (soft delete)
   */
  deleteAddress: async (addressId: string): Promise<void> => {
    await api.delete(`/enderecos/${addressId}`);
  },
};
