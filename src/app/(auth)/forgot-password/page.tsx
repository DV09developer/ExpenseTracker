"use client";

import Link from "next/link";
import Logo from "@/app/(auth)/Components/logo";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const {email, setEmail} = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError(null);
        setLoading(true);
        try {
            await authService.forgotPassword(email);
            router.push("/enter-otp");
        } catch (err: any) {
            console.error(err);
            setError(err?.response?.data?.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-3xl glass-card p-8 md:p-10 shadow-2xl border border-white/5 flex flex-col items-center">
                <div className="mb-8 text-center flex flex-col items-center">
                    <Logo />
                    <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white">
                        Forgot Your Password?
                    </h1>
                    <p className="mt-2 text-sm text-gray-400">
                        Please enter your email address to receive a password reset link.
                    </p>
                </div>

                {error && (
                    <div className="w-full mb-6 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                <div className="w-full space-y-5">
                    {/* <Loginform onSubmit={handleLogin} /> */}
                    <div>
                        <label className="block mb-2 text-sm text-gray-300">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                        onClick={handleSubmit}
                    >
                        {loading
                            ? "Sending Reset Link..."
                            : "Send Reset Link"}
                    </button>
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