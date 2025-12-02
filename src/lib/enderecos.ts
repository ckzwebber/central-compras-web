import { api } from "@/config/axios.config";

export interface Endereco {
  id: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento: string | null;
  cep: string;
  criado_em: Date;
  atualizado_em: Date;
}

export interface EnderecoResponse {
  success: boolean;
  message: string;
  data: Endereco;
}

class EnderecosService {
  async getById(id: string): Promise<Endereco> {
    const response = await api.get<EnderecoResponse>(`/enderecos/${id}`);
    return response.data.data;
  }
}

export const enderecosService = new EnderecosService();
