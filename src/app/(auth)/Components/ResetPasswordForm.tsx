"use client";
const PASS_LENGTH = 8;
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import axios from "axios";

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();
    const { email } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (loading) return;
        setErrorMessage(null);
        if (!newPassword.trim()) {
            setErrorMessage("Please enter a new password.");
            return;
        }

        if (newPassword.length !== PASS_LENGTH) {
            setErrorMessage(`New password must be ${PASS_LENGTH} characters long.`);
            return;
        }
        setLoading(true);
        try {
            const verifyotp = await authService.resetPassword(email, token, newPassword);
            console.log(verifyotp);
            router.push(`/reset-password?token=${verifyotp.data}`);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setErrorMessage(
                    err.response?.data?.message ??
                    "Invalid OTP."
                );
            } else {
                setErrorMessage("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
        {errorMessage && (
                    <div className="w-full mb-6 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
                        <AlertCircle size={16} />
                        <span>{errorMessage}</span>
                    </div>
                )}

                <div className="w-full space-y-5">
                    {/* <Loginform onSubmit={handleLogin} /> */}
                    <div>
                        <label htmlFor="newPassword" className="block mb-2 text-sm text-gray-300">
                            New Password
                        </label>

                        <input
                            id="newPassword"
                            type="password"
                            autoFocus
                            placeholder="••••••••"
                            inputMode="text"
                            pattern=".{8,}"
                            autoComplete="new-password"
                            maxLength={PASS_LENGTH}
                            value={newPassword}
                            onChange={(e) => {
                                const value = e.target.value;
                                setNewPassword(value);
                            }
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
                            ? "Updating Password..."
                            : "Reset Password"}
                    </button>
                </div>
                </>
    )
}
