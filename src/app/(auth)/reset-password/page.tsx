import Logo from "../Components/logo";
import ResetPasswordForm from "../Components/ResetPasswordForm";
import { Suspense } from "react";

export default function page() {
    
    return (
        <div className="min-h-[85vh] flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-3xl glass-card p-8 md:p-10 shadow-2xl border border-white/5 flex flex-col items-center">
                <div className="mb-8 text-center flex flex-col items-center">
                    <Logo />
                    <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white">
                        Enter New Password
                    </h1>
                    <p className="mt-2 text-sm text-gray-400">
                        Enter your new password to reset your account password.
                    </p>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
        </div>
    )
}
