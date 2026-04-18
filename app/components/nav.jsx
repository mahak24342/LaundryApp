"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav({ setOpen = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Orders" },
    { href: "/dash", label: "Dashboard" },
    { href: "/orders", label: "Bookings" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 h-16 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="text-white font-bold text-lg tracking-wide">
            Laundry<span className="text-white/60">OS</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm transition ${
                  isActive(l.href)
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">

            {/* CREATE BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition"
            >
              + Create
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-white text-2xl px-2"
            >
              ☰
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">

          {/* BACKDROP */}
          <div
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/70"
          />

          {/* DRAWER */}
          <div className="absolute right-0 top-0 h-full w-72 bg-[#0B0B0F] border-l border-white/10 p-6 flex flex-col">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-white/50 text-xs uppercase tracking-widest">
                Menu
              </h2>

              <button
                onClick={() => setMenuOpen(false)}
                className="text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* LINKS */}
            <div className="flex flex-col gap-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm transition ${
                    isActive(l.href)
                      ? "bg-white text-black"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* FOOTER BUTTON */}
            <button
              onClick={() => {
                setMenuOpen(false);
                setOpen(true);
              }}
              className="mt-auto bg-white text-black py-3 rounded-xl font-medium hover:bg-white/90 transition"
            >
              + Create Order
            </button>

          </div>
        </div>
      )}
    </>
  );
}