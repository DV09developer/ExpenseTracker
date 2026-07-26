import { api } from "@/lib/api";
import { LoginPayload, RegisterPayload } from "@/types/auth";

export const authService = {
  login: (data: LoginPayload) =>
    api.post("/api/users/login", data),

  register: (data: RegisterPayload) =>
    api.post("/api/users/register", data),

  logout: () =>
    api.post("/api/users/logout"),

  currentUser: () =>
    api.get("/api/users/profile"),

  forgotPassword: (email: string) =>
    api.post("/api/users/forgot-password", { email }),

  verifyOTP: (otp: string) =>
    api.post("/api/users/verify-otp", { otp }),

  resetPassword: (token: string, newPassword: string) =>
    api.post(`/api/users/reset-password/${token}`, { newPassword }),
};