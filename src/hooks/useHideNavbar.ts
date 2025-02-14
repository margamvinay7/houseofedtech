"use client";

import { usePathname } from "next/navigation";

export function useHideNavbar() {
  const pathname = usePathname();
  return pathname === "/login" || pathname === "/signup";
}
