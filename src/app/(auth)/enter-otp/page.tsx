"use client";
const OTP_LENGTH = 6;
// import Link from "next/link";
import Logo from "@/app/(auth)/Components/logo";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { authService } from "@/services/auth.service";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const { email } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (loading) return;    
        setErrorMessage(null);
        if (!otp.trim()) {
            setErrorMessage("Please enter the OTP.");
            return;
        }

        if (otp.length !== OTP_LENGTH) {
            setErrorMessage(`OTP must be ${OTP_LENGTH} digits.`);
            return;
        }
        setLoading(true);
        try {
            const verifyotp = await authService.verifyOTP(email, otp);
            console.log(verifyotp);
            router.push("/reset-password");
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
        <div className="min-h-[85vh] flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-3xl glass-card p-8 md:p-10 shadow-2xl border border-white/5 flex flex-col items-center">
                <div className="mb-8 text-center flex flex-col items-center">
                    <Logo />
                    <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white">
                        Enter OTP
                    </h1>
                    <p className="mt-2 text-sm text-gray-400">
                        OTP will expire in 10 minutes.
                    </p>
                </div>

                {errorMessage && (
                    <div className="w-full mb-6 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
                        <AlertCircle size={16} />
                        <span>{errorMessage}</span>
                    </div>
                )}

                <div className="w-full space-y-5">
                    {/* <Loginform onSubmit={handleLogin} /> */}
                    <div>
                        <label htmlFor="otp" className="block mb-2 text-sm text-gray-300">
                            OTP
                        </label>

                        <input
                            id="otp"
                            type="text"
                            autoFocus
                            placeholder="xxxxxx"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            autoComplete="one-time-code"
                            maxLength={OTP_LENGTH}
                            value={otp}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                setOtp(value)
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
                            ? "Verifying OTP..."
                            : "Verify OTP"}
                    </button>
                </div>

            </div>
        </div>
    );
}