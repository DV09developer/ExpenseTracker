import { api } from "@/lib/api";

export const authService = {
  login: (data: {
    email: string;
    password: string;
  }) =>
    api.post("/api/users/login", data),

  register: (data: {
    username: string;
    email: string;
    password: string;
    fullName?: string;
  }) =>
    api.post("/api/users/register", data),

  logout: () =>
    api.post("/api/users/logout"),

  currentUser: () =>
    api.get("/api/users/profile"),
};