"use client"
import { Dispatch, SetStateAction, useState } from "react";
export default function loginform(props: { onSubmit: (email: string) => void; }
    // {onSubmit: (email: string) => void;}
) {
        const [email, setEmail] = useState("");

    return (
        <div>
            <input
                type="email"
                id="email"
                placeholder="name@work-email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-3 rounded-md bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Continue with Email Button */}
            <button className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-md font-semibold" onClick={() => props.onSubmit(email)}>
                Continue with email
            </button>

            
        </div>
    );
};
