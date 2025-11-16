import type {
  LoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  User,
} from "@/types/auth";
import { api } from "@/config/axios.config";

class AuthService {
  private tokenKey = "auth_token";
  private userKey = "user_data";

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>(
        "/usuarios/login",
        credentials,
      );

      if (!response.status || response.status !== 200) {
        throw new Error("Invalid credentials");
      }

      const data: LoginResponse = response.data;

      this.setToken(data.token);
      this.setUser(data.user);

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid email or password");
    }
  }

  async forgotPassword(
    request: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> {
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

  async resetPassword(
    request: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> {
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

  logout(): void {
    this.removeToken();
    this.removeUser();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.tokenKey);
  }

  getUser(): User | null {
    if (typeof window === "undefined") return null;
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  setUser(user: User): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  removeUser(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.userKey);
  }

  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }
}

export const authService = new AuthService();
