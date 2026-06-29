// src/types/auth.ts

import { User } from "./user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;

  login: (payload: LoginPayload) => Promise<void>;

  register: (
    payload: RegisterPayload
  ) => Promise<void>;

  logout: () => Promise<void>;

  refreshUser: () => Promise<void>;
}