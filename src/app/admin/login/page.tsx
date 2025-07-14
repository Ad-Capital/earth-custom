'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      window.location.href = "/admin"; // Redirect to the admin dashboard
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 w-[30vw] bg-white shadow-lg rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Admin Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 mb-6 w-full"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mb-14 w-full"
          />
          <div className="w-full flex items-center justify-center">
            <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-[30%]"
            >
                Login
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
