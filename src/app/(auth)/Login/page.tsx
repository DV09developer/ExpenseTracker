"use client";

import Loginform from "../Components/Loginform";
import Link from "next/link";
import Logo from "@/app/(auth)/Components/logo";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    try {
      await login({ email, password });
      router.push("/overview");
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl glass-card p-8 md:p-10 shadow-2xl border border-white/5 flex flex-col items-center">
        <div className="mb-8 text-center flex flex-col items-center">
          <Logo />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to continue to WealthFlow
          </p>
        </div>

        {error && (
          <div className="w-full mb-6 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="w-full">
          <Loginform onSubmit={handleLogin} />
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?
          <Link href="/Sign-up" className="ml-1 font-bold text-cyan-400 hover:text-cyan-300 transition">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}