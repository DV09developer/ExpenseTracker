import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import HeaderWrapper from "../Components/HeaderWrapper";
import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense Tracker - Premium Wealth Management",
  description: "A premium dashboard to manage and analyze your income and expenses seamlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-100 min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <HeaderWrapper />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
