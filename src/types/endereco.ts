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

export interface CreateEnderecoData {
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  cep: string;
  complemento?: string | null;
}

export interface UpdateEnderecoData {
  estado?: string;
  cidade?: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  cep?: string;
  complemento?: string | null;
}
