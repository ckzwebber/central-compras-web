export interface Loja {
  id: string;
  nome: string;
  cnpj: string;
  usuario_id: string;
  endereco_id: string | null;
  criado_em: Date;
  atualizado_em: Date;
}

export interface LojaResponse {
  success: boolean;
  message: string;
  data: Loja;
}

export interface LojasResponse {
  success: boolean;
  message: string;
  data: Loja[];
}

export interface CreateLojaDto {
  nome: string;
  cnpj: string;
  usuario_id: string;
  endereco_id?: string;
}

export interface UpdateLojaDto {
  nome?: string;
  cnpj?: string;
  usuario_id?: string;
  endereco_id?: string;
}
