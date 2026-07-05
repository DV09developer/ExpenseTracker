"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight, BarChart3, ShieldCheck, Zap, Sparkles } from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 md:py-20 text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 animate-pulse">
        <Sparkles size={12} />
        <span>Simplify Your Financial Life</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight">
        Take Control of Your <br />
        <span className="bg-gradient-to-r from-cyan-400 via-teal-200 to-indigo-400 bg-clip-text text-transparent">
          Wealth Journey
        </span>
      </h1>

      {/* Hero Subtitle */}
      <p className="mt-6 text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed">
        WealthFlow helps you track your income, expenses, and monthly budgets with beautifully designed real-time dashboard analytics. Built to keep your personal data secure.
      </p>

      {/* Call to Action Buttons */}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {user ? (
          <Link
            href="/User"
            className="flex items-center gap-2 text-base font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white px-8 py-3.5 rounded-2xl transition shadow-xl shadow-indigo-500/20"
          >
            <span>Go to Dashboard</span>
            <ArrowRight size={18} />
          </Link>
        ) : (
          <>
            <Link
              href="/Login"
              className="flex items-center gap-2 text-base font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white px-8 py-3.5 rounded-2xl transition shadow-xl shadow-indigo-500/20"
            >
              <span>Get Started Free</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/Login"
              className="text-base font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 py-3.5 rounded-2xl transition"
            >
              Sign In
            </Link>
          </>
        )}
      </div>

      {/* Features Grid */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/5 shadow-md">
          <div className="bg-cyan-500/10 text-cyan-400 p-3 rounded-2xl w-fit mb-6">
            <BarChart3 size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Beautiful Analytics</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Visualize income-to-expense ratios and trends over time with dynamic monthly charts and category breakdowns.
          </p>
        </div>

        <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/5 shadow-md">
          <div className="bg-indigo-500/10 text-indigo-400 p-3 rounded-2xl w-fit mb-6">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Secure & Private</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Protected by secure JWT and HTTP-only cookie-based authentication schemas. Your transactional data is kept completely private.
          </p>
        </div>

        <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/5 shadow-md">
          <div className="bg-teal-500/10 text-teal-400 p-3 rounded-2xl w-fit mb-6">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Instant Tracking</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Record earnings and expenditures with single-click ease. Automatically update your real-time total net balance.
          </p>
        </div>
      </div>
    </div>
  );
}
