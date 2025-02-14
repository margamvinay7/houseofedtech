"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useHideNavbar } from "@/hooks/useHideNavbar";
import { useGetUser } from "@/hooks/useGetUser";
import { UserData } from "@/types";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const hideNavbar = useHideNavbar();
  const user: Partial<UserData> | null = useGetUser();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClickOutside]);

  if (hideNavbar) return null;

  // Define navLinks with proper TypeScript handling
  const navLinks: { href: string; label: string }[] = [
    { href: "/", label: "Home" },
    { href: "/createPost", label: "Create Post" },
    { href: "/logout", label: "Logout" },
  ];

  if (user?.id) {
    navLinks.push({ href: `/profile/${user.id}`, label: "Profile" });
  }

  return (
    <nav className="bg-[rgb(58,36,74)] text-white relative">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold">
          House Of Edtech
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`hover:text-gray-400 transition ${
                  pathname === href ? "underline underline-offset-4" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-[rgb(85,41,94)] text-center absolute w-full left-0 top-[100%] py-4"
        >
          <ul className="space-y-4">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block hover:text-gray-400 ${
                    pathname === href ? "underline underline-offset-4" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
