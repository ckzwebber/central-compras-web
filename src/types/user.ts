export interface User {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string | null;
  funcao: "loja" | "fornecedor" | "admin" | "usuario";
  email_verificado: boolean;
  endereco_id: string | null;
  criado_em: string;
  atualizado_em: string;
}

export interface UpdateUserData {
  nome?: string;
  sobrenome?: string;
  email?: string;
  cpf?: string;
  telefone?: string;
}

export interface UpdatePasswordData {
  senhaAtual: string;
  novaSenha: string;
  confirmarNovaSenha: string;
}

export interface UpdateStoreData {
  nome?: string;
  cnpj?: string;
}

export interface CreateUserData {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  confirmedPassword: string;
  funcao: "loja" | "fornecedor" | "admin" | "usuario";
  telefone?: string | null;
  endereco_id?: string | null;
}

export interface UpdateAdminUserData {
  nome?: string;
  sobrenome?: string;
  email?: string;
  funcao?: "loja" | "fornecedor" | "admin" | "usuario";
  telefone?: string | null;
  endereco_id?: string | null;
}
