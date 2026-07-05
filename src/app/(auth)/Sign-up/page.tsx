"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/app/Components/logo";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export default function SignUpPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register({
        username: username.toLowerCase().trim(),
        email: email.trim(),
        password,
        firstname: firstname.trim(),
        lastname: lastname.trim(),
      });
      router.push("/User");
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Registration failed. Please check inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl glass-card p-8 md:p-10 shadow-2xl border border-white/5 flex flex-col items-center">
        <div className="mb-6 text-center flex flex-col items-center">
          <Logo />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Sign up to start tracking your expenses
          </p>
        </div>

        {error && (
          <div className="w-full mb-6 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl animate-fade-in">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1.5 text-xs font-semibold text-gray-300">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block mb-1.5 text-xs font-semibold text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold text-gray-300">
              Username *
            </label>
            <input
              type="text"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold text-gray-300">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold text-gray-300">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 pr-10 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 py-3 font-bold text-white transition shadow-lg shadow-indigo-500/25 disabled:opacity-50 mt-4 cursor-pointer"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?
          <Link href="/login" className="ml-1 font-bold text-cyan-400 hover:text-cyan-300 transition">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}