import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const requestUrl = String(error.config?.url || "");
      const skipAuthRedirect = String(error.config?.headers?.["x-skip-auth-redirect"] || "") === "1";
      const isSessionProbe = requestUrl.includes("/usuarios/me");

      if (typeof window !== "undefined") {
        localStorage.removeItem("user_data");
        if (!skipAuthRedirect && !isSessionProbe && !window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  },
);
