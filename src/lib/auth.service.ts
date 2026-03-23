"use client";

import type { LoginRequest, LoginResponse, ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse, User } from "@/types/auth";
import { api } from "@/config/axios.config";

class AuthService {
  private userKey = "user_data";

  private normalizeUser(payloadUser: User & { id?: string }): User {
    return {
      ...payloadUser,
      sub: payloadUser.sub || payloadUser.id || "",
    };
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>("/usuarios/login", credentials);

      if (!response.status || response.status !== 200) {
        throw new Error("Invalid credentials");
      }

      const data: LoginResponse = response.data;

      if (!data.data?.user) {
        throw new Error("Invalid login response");
      }

      const payloadUser = data.data.user as unknown as User & { id?: string };
      const normalizedUser = this.normalizeUser(payloadUser);

      this.setUser(normalizedUser);

      return data;
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  }

  async forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const data: ForgotPasswordResponse = {
        message: "Password recovery email sent successfully",
        success: true,
      };

      return data;
    } catch (error) {
      throw new Error("Failed to send recovery email");
    }
  }

  async resetPassword(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const data: ResetPasswordResponse = {
        message: "Password reset successfully",
        success: true,
      };

      return data;
    } catch (error) {
      throw new Error("Failed to reset password");
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post("/usuarios/logout");
    } catch (_error) {
      // Ignore API logout errors and clear local session state anyway.
    }

    this.removeUser();
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  getUser(): User | null {
    if (typeof window === "undefined") return null;
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  async syncUserFromSession(): Promise<User | null> {
    try {
      const response = await api.get("/usuarios/me", {
        headers: {
          "x-skip-auth-redirect": "1",
        },
      });
      const sessionUser = response?.data?.data;

      if (!sessionUser) {
        this.removeUser();
        return null;
      }

      const normalizedUser = this.normalizeUser(sessionUser);
      this.setUser(normalizedUser);
      return normalizedUser;
    } catch (_error) {
      this.removeUser();
      return null;
    }
  }

  setUser(user: User): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  removeUser(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.userKey);
  }
}

export const authService = new AuthService();
