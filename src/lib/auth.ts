"use client";

import type { LoginRequest, LoginResponse, ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse, User } from "@/types/auth";
import { api } from "@/config/axios.config";
import { jwtDecode } from "jwt-decode";

class AuthService {
  private tokenKey = "auth_token";
  private userKey = "user_data";

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      console.log("🔵 Login iniciado...");
      const response = await api.post<LoginResponse>("/usuarios/login", credentials);

      console.log("🔵 Resposta da API:", response.status);

      if (!response.status || response.status !== 200) {
        throw new Error("Invalid credentials");
      }

      const data: LoginResponse = response.data;
      console.log("🔵 Dados recebidos:", data);

      const token = data.data.token;
      console.log("🔵 Token extraído, salvando...");

      this.setToken(token);
      this.setCookie(token);
      console.log("🔵 Token e cookie salvos");

      const user = jwtDecode<User>(token);
      console.log("🔵 User decodificado:", user);

      this.setUser(user);
      console.log("🔵 Login completo!");

      return data;
    } catch (error) {
      console.error("❌ Login error:", error);
      throw new Error("Invalid email or password");
    }
  }

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

  logout(): void {
    this.removeToken();
    this.removeUser();
    this.removeCookie();
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

  setCookie(token: string): void {
    if (typeof document === "undefined") return;
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);
    document.cookie = `${this.tokenKey}=${token}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
  }

  removeCookie(): void {
    if (typeof document === "undefined") return;
    document.cookie = `${this.tokenKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  getCookie(): string | null {
    if (typeof document === "undefined") return null;
    const name = this.tokenKey + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }
}

export const authService = new AuthService();
