"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/app/Components/logo";

export default function OTPVerify() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEmail(localStorage.getItem("email"));
    }
  }, []);

  const handleVerify = () => {
    setMessage("OTP verification is currently handled via credentials registration.");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl glass-card p-8 md:p-10 shadow-2xl border border-white/5 flex flex-col items-center">
        <Logo />
        <h2 className="text-2xl font-extrabold text-white mt-6 mb-2">Enter OTP</h2>
        <p className="text-sm text-gray-400 mb-6 text-center">OTP sent to: <span className="text-cyan-400 font-semibold">{email}</span></p>

        <input
          type="text"
          placeholder="Enter OTP code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none transition mb-4 text-center tracking-widest font-mono text-lg"
        />
        <button 
          onClick={handleVerify}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 py-3 font-bold text-white transition shadow-lg shadow-indigo-500/25 mb-4 cursor-pointer"
        >
          Verify OTP
        </button>

        {message && <p className="text-xs text-cyan-400 text-center font-medium">{message}</p>}
      </div>
    </div>
  );
}
