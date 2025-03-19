"use client"; // Ensures it runs only on the client

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Install lucide-react for icons

const PasswordInput = (props: { onSubmit: (password: string) => void; }) => {
  const [password, setPassword] = useState(""); // Controlled input
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="lg:w-1/4 md:w-3/5 w-full flex flex-col items-center p-4 bg-gray-900 rounded-b-2xl">
      <label htmlFor="password" className="text-lg font-semibold mb-2">
        🔒 Enter Password:
      </label>
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 rounded-md  border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 bg-gray-900 text-white focus:border-blue-500"
          placeholder="Enter your password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2 text-gray-400 hover:text-white"
        >
          {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
        </button>
      </div>
      <div className="h-8 mb-3">
        {password.length > 0 && password.length < 6 && (
          <p className="text-red-500 mt-2">⚠️ Password must be at least 6 characters long</p>
          // ./pocketbase serve
        )}
      </div>
      <button className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-md font-semibold"  onClick={() => props.onSubmit(password)}>
        Set Password
      </button>
    </div>
  );
};


export default PasswordInput;

