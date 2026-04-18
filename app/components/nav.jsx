"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav({ setOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Desktop nav item
  const navItem = (href, label) => (
    <Link
      href={href}
      className={`relative px-4 py-2 text-sm rounded-lg transition ${
        pathname === href
          ? "text-white"
          : "text-white/50 hover:text-white"
      }`}
    >
      {label}
      {pathname === href && (
        <span className="absolute left-1/2 -bottom-1 h-[2px] w-4/5 -translate-x-1/2 bg-white rounded-full" />
      )}
    </Link>
  );

  // Mobile nav item
  const mobileLink = (href, label) => (
    <Link
      href={href}
      onClick={() => setMenuOpen(false)}
      className={`block px-4 py-2 rounded-xl text-sm transition ${
        pathname === href
          ? "bg-white text-black"
          : "text-white/70 hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <>
      {/* NAVBAR */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between">

          {/* LOGO */}
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
            Laundry OS
          </h1>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">
            {navItem("/", "Orders")}
            {navItem("/dash", "Dashboard")}
            {navItem("/book", "Booking")}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">

            {/* MOBILE CREATE */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden px-3 py-1.5 text-sm rounded-lg bg-white text-black font-medium"
            >
              + Create
            </button>

            {/* DESKTOP CREATE */}
            <button
              onClick={() => setOpen(true)}
              className="hidden md:block px-4 py-2 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            >
              + Create
            </button>

            {/* MENU ICON */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">

          {/* Overlay */}
          <div
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
          />

          {/* Drawer */}
          <div
            className="absolute right-0 top-0 h-full w-72 
            bg-[#07070A]/95 backdrop-blur-2xl border-l border-white/10 
            p-6 flex flex-col 
            animate-[slideIn_.25s_ease-out]"
          >

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm tracking-wide text-white/40 uppercase">
                Menu
              </h2>

              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition"
              >
                ✕
              </button>
            </div>

            {/* Links */}
            <div className="space-y-1">
              {mobileLink("/", "Orders")}
              {mobileLink("/dash", "Dashboard")}
              {mobileLink("/book", "Booking")}
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-white/10" />

            {/* Create Button */}
            <button
              onClick={() => {
                setMenuOpen(false);
                setOpen(true);
              }}
              className="mt-auto w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition"
            >
              + Create Order
            </button>
          </div>

          {/* Animation */}
          <style jsx>{`
            @keyframes slideIn {
              from {
                transform: translateX(100%);
                opacity: 0.5;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}