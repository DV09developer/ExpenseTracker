"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { verifyOTPs } from "@/app/utils/verifyOTP";

export default function OTPVerify() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = localStorage.getItem("email");

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const verifyOTP = async () => {
    try{
        await verifyOTPs(email || '' , otp);
        router.push("/Password")
    }
    catch(err){
        console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-xl font-bold">Enter OTP</h2>
      <p>OTP sent to: {email}</p>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border p-2"
      />
      <button onClick={verifyOTP} className="bg-green-500 text-white p-2 rounded">
        Verify OTP
      </button>

      {message && <p className="text-sm">{message}</p>}
    </div>
  );
}
