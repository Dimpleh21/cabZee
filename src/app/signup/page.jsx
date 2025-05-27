"use client";
import { GlowingEffect } from "@/app/components/ui/glowing-effect";
import { HoverBorderGradient } from "@/app/components/ui/border-gradient";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SignUp() {
  const router = useRouter();
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("User registered successfully");
        setname("");
        setEmail("");
        setPassword("");
        router.push("/login");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-black text-white items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        {/* Glowing effect wrapper */}
        <GlowingEffect
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          className="absolute inset-0 rounded-2xl pointer-events-none"
        />
        {/* Login Card */}
        <div className="relative z-10 border border-gray-500/50 bg-zinc-900/70 rounded-2xl p-10 flex flex-col items-center justify-center shadow-xl backdrop-blur-md">
          <h1 className="text-4xl font-semibold mb-10 tracking-tight">
            SignUp
          </h1>
          <form
            className="flex flex-col items-center w-full"
            onSubmit={handleSignup}
          >
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-400 bg-transparent p-2 mb-4 w-4/5 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              onChange={(e) => setname(e.target.value)}
              value={name}
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-400 bg-transparent p-2 mb-4 w-4/5 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-400 bg-transparent p-2 mb-4 w-4/5 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {/* Gradient Hover Button */}
            <HoverBorderGradient
              containerClassName="rounded-full mt-2"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center justify-center space-x-2 w-32 py-2 font-medium cursor-pointer"
              type="submit"
            >
              <span>SignUp</span>
            </HoverBorderGradient>
          </form>
        </div>
      </div>
      <div className="mt-4 text-center">
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
