// src/providers/AuthProvider.tsx

"use client";

import {
  useEffect,
  useState,
} from "react";

import { AuthContext } from "@/context/AuthContext";
import { authService } from "@/services/auth.service";
import {
  LoginPayload,
  RegisterPayload,
} from "@/types/auth";
import { User } from "@/types/user";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const refreshUser = async () => {
    try {
      const response =
        await authService.currentUser();

      setUser(response.data.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    payload: LoginPayload
  ) => {
    await authService.login(payload);

    await refreshUser();
  };

  const register = async (
    payload: RegisterPayload
  ) => {
    await authService.register(payload);

    await refreshUser();
  };

  const logout = async () => {
    await authService.logout();

    setUser(null);
  };

//   useEffect(() => {
//   const initializeAuth = async () => {
//     try {
//       const response =
//         await authService.currentUser();

//       setUser(response.data.data);
//     } catch {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   initializeAuth();
// }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}