"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User as UserIcon, LayoutDashboard, Wallet, Compass } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center shadow-lg rounded-b-2xl">
      {/* Brand Logo */}
      <Link href={user ? "/User" : "/"} className="flex items-center gap-2 text-xl font-bold tracking-tight text-white hover:opacity-90 transition">
        <div className="bg-gradient-to-tr from-indigo-500 to-cyan-400 p-2 rounded-xl text-white shadow-md shadow-indigo-500/20">
          <Wallet size={20} />
        </div>
        <span>Wealth<span className="text-cyan-400">Flow</span></span>
      </Link>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-8">
        <Link 
          href={user ? "/User" : "/"} 
          className={`text-sm font-medium transition ${
            pathname === "/" || pathname === "/User" ? "text-cyan-400 font-semibold" : "text-gray-300 hover:text-white"
          }`}
        >
          {user ? "Dashboard" : "Home"}
        </Link>
        <Link 
          href="#" 
          className="text-sm font-medium text-gray-400 cursor-not-allowed hover:text-gray-400 transition"
        >
          Analytics
        </Link>
        <Link 
          href="#" 
          className="text-sm font-medium text-gray-400 cursor-not-allowed hover:text-gray-400 transition"
        >
          Budgets
        </Link>
      </nav>

      {/* Action Buttons / User Status */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <UserIcon size={14} className="text-cyan-400" />
              <span className="text-xs font-semibold text-gray-200">{user.username || user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-bold bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-3.5 py-1.5 rounded-full transition cursor-pointer"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="text-sm font-semibold text-gray-300 hover:text-white px-4 py-2 transition"
            >
              Sign In
            </Link>
            <Link 
              href="/Sign-up" 
              className="text-sm font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white px-4.5 py-2 rounded-xl transition shadow-lg shadow-indigo-500/25"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
