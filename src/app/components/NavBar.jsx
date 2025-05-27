"use client";
import { useEffect, useState } from "react";
import Leaf from "../../../public/cute_leaf.png";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored user from localStorage:", storedUser); // 🐛 DEBUG

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.id) {
          setUserId(parsedUser.id);
          console.log("Parsed userId:", parsedUser.id); // 🐛 DEBUG
        }
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }
  }, []);

  return (
    <div className="pl-6 pr-4 pt-4 text-xl flex gap-[600px] items-center bg-black text-white">
      <div>
        <Link href="/">CabZee</Link>
      </div>
      <div className="flex gap-6">
        <div className="p-4 flex items-center justify-center text-lg">
          <Link href="/">Home</Link>
        </div>

        {/* 🛠 Your Rides Link */}
        <div className="p-4 flex items-center justify-center text-lg">
          <Link href={userId ? `/your-rides?id=${userId}` : "/your-rides"}>
            Your rides
          </Link>
        </div>

        <div className="p-4 flex items-center justify-center text-lg">
          <Link href="/publish">Publish</Link>
        </div>

        <div className="h-12 w-12 p-4 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 shadow-md flex items-center justify-center">
          <div className="space-y-1">
            <div className="w-5 h-0.5 bg-white" />
            <div className="w-5 h-0.5 bg-white" />
            <div className="w-5 h-0.5 bg-white" />
          </div>
        </div>

        <div>
          <Image src={Leaf} height={12} width={50} alt="leaf icon" />
        </div>
      </div>
    </div>
  );
}
