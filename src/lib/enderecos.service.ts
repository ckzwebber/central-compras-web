import { api } from "@/config/axios.config";
import type { Endereco, EnderecoResponse } from "@/types/endereco";

class EnderecosService {
  async getById(id: string): Promise<Endereco> {
    const response = await api.get<EnderecoResponse>(`/enderecos/${id}`);
    return response.data.data;
  }
}

export const enderecosService = new EnderecosService();
