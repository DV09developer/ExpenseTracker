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
  // State to hold the current user and loading status
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to refresh the current user data
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

  // Function to handle user login
  const login = async (
    payload: LoginPayload
  ) => {
    await authService.login(payload);

    await refreshUser();
  };

  // Function to handle user registration
  const register = async (
    payload: RegisterPayload
  ) => {
    await authService.register(payload);

    await refreshUser();
  };

  // Function to handle user logout
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