// components/LayoutWrapper.jsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; // adjust path to your actual Navbar

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // List of routes where you want to hide the navbar
  const hideNavbarRoutes = ["/publish"];

  const shouldShowNavbar = !hideNavbarRoutes.includes(pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {children}
    </>
  );
}
