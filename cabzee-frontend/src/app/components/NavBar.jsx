"use client";

import { useEffect, useState } from "react";
import Leaf from "../../../public/cute_leaf.png";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // Check if user is logged in
    if (storedUser) {
      setAuthenticated(true);

      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.id) {
          setUserId(parsedUser.id);
        }
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }

      // Reload ONCE after login
      const hasReloaded = sessionStorage.getItem("hasReloaded");
      if (!hasReloaded) {
        sessionStorage.setItem("hasReloaded", "true");
        window.location.reload();
      }
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="pl-6 pr-4 pt-4 pb-3 text-xl flex justify-end gap-4 bg-black text-white">
        <Link href="/login">
          <button className="px-4 py-2 hover:text-lg cursor-pointer border rounded-full">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="px-4 py-2 border rounded-full hover:text-lg cursor-pointer">
            Signup
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pl-6 pr-4 pt-4 text-xl flex gap-[500px] items-center bg-black text-white">
      <div>
        <Link href="/">CabZee</Link>
      </div>
      <div className="flex gap-6 items-center">
        <Link href="/" className="p-4 text-lg">
          Home
        </Link>
        <Link
          href={userId ? `/your-rides?id=${userId}` : "/your-rides"}
          className="p-4 text-lg"
        >
          Your Rides
        </Link>
        <Link href="/publish" className="p-4 text-lg">
          Publish
        </Link>
        <button
          className="px-4 py-2 text-lg text-white border rounded-full cursor-pointer"
          onClick={() => {
            localStorage.removeItem("user");
            sessionStorage.removeItem("hasReloaded"); // Reset for next login
            setAuthenticated(false);
          }}
        >
          Logout
        </button>
        <div className="h-12 w-12 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 shadow-md flex items-center justify-center">
          <div className="space-y-1">
            <div className="w-5 h-0.5 bg-white" />
            <div className="w-5 h-0.5 bg-white" />
            <div className="w-5 h-0.5 bg-white" />
          </div>
        </div>
        <Image src={Leaf} height={12} width={50} alt="leaf icon" />
      </div>
    </div>
  );
}
