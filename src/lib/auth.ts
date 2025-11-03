import type { LoginRequest, LoginResponse, ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse, User } from "@/types/auth";

// TODO: Substituir pela URL real do backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

class AuthService {
  private tokenKey = "auth_token";
  private userKey = "user_data";

  /**
   * Login do usuário
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      // TODO: Substituir por chamada real ao backend
      // const response = await fetch(`${API_BASE_URL}/auth/login`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(credentials),
      // });

      // if (!response.ok) {
      //   throw new Error("Invalid credentials");
      // }

      // const data: LoginResponse = await response.json();

      // Mock temporário
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: "1",
        nome: "Test User",
        email: credentials.email,
        role: credentials.email.includes("admin") ? "admin" : credentials.email.includes("supplier") ? "supplier" : "store",
        status: "active",
      };

      const data: LoginResponse = {
        token: "mock-jwt-token-" + Date.now(),
        user: mockUser,
      };

      // Armazenar token e dados do usuário
      this.setToken(data.token);
      this.setUser(data.user);

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid email or password");
    }
  }

  /**
   * Recuperação de senha
   */
  async forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    try {
      // TODO: Substituir por chamada real ao backend
      // const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(request),
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to send recovery email");
      // }

      // const data: ForgotPasswordResponse = await response.json();

      // Mock temporário
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const data: ForgotPasswordResponse = {
        message: "Password recovery email sent successfully",
        success: true,
      };

      return data;
    } catch (error) {
      console.error("Forgot password error:", error);
      throw new Error("Failed to send recovery email");
    }
  }

  /**
   * Reset de senha
   */
  async resetPassword(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    try {
      // TODO: Substituir por chamada real ao backend
      // const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(request),
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to reset password");
      // }

      // const data: ResetPasswordResponse = await response.json();

      // Mock temporário
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const data: ResetPasswordResponse = {
        message: "Password reset successfully",
        success: true,
      };

      return data;
    } catch (error) {
      console.error("Reset password error:", error);
      throw new Error("Failed to reset password");
    }
  }

  /**
   * Logout do usuário
   */
  logout(): void {
    this.removeToken();
    this.removeUser();
  }

  /**
   * Verifica se usuário está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Obtém o token armazenado
   */
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Armazena o token
   */
  setToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Remove o token
   */
  removeToken(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Obtém os dados do usuário armazenados
   */
  getUser(): User | null {
    if (typeof window === "undefined") return null;
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Armazena os dados do usuário
   */
  setUser(user: User): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  /**
   * Remove os dados do usuário
   */
  removeUser(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.userKey);
  }

  /**
   * Obtém headers com autenticação
   */
  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }
}

export const authService = new AuthService();
