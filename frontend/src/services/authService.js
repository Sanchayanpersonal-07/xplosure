import api from "./api";
import { TOKEN_KEY } from "../utils/constants";

export const authService = {
  signup: async (userData) => {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("/auth/user");
    return response.data;
  },

  logout: async () => {
    // ✅ FIX: Call backend logout API before clearing local storage
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error(
        "Backend logout failed, continuing with local cleanup:",
        error,
      );
    } finally {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  // ✅ NEW: Forgot password
  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  // ✅ NEW: Reset password with token from email link
  resetPassword: async (token, newPassword) => {
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  },
};
