export type UserRole = "admin" | "fornecedor" | "loja" | "usuario";
export type UserStatus = "active" | "inactive";

export interface DefaultResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface User {
  sub: string;
  nome: string;
  sobrenome: string;
  email: string;
  funcao: UserRole;
  status: UserStatus;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse
  extends DefaultResponse<{
    token: string;
    user: User;
  }> {}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
