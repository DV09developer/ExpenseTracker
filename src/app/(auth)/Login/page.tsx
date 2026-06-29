"use client"
import Image from "next/image";
import LoginForm from "../../Components/Loginform";
import Link from "next/link";
import Logo from "@/app/Components/logo";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
export default () => {
    const { login } = useAuth();

    const router = useRouter();

    const handleLogin = async (
        email: string,
        password: string
    ) => {
        try {
            await login({
                email,
                password,
            });

            // router.push("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md rounded-2xl bg-gray-900 p-8 shadow-xl">

                <div className="mb-8 text-cente flex flex-col items-center">
                    <Logo />

                    <h1 className="mt-4 text-3xl font-bold text-white">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Sign in to continue to
                        FinanceTracker
                    </p>
                </div>

                <LoginForm
                    onSubmit={handleLogin}
                />

                <p className="mt-6 text-center text-gray-400">
                    Don't have an account?
                    <Link
                        href="/Sign-up"
                        className="ml-1 text-blue-400"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    );
}