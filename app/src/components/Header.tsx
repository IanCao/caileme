"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const navItems = [
  { label: "首页", href: "/" },
  { label: "权益工具", href: "/tools" },
  { label: "维权百科", href: "/guides" },
  { label: "AI模拟", href: "/ai-simulation" },
  { label: "牛马保护站", href: "/community" },
  { label: "我的收藏", href: "/bookmarks" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/50">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo size={28} />
          <span className="text-xl font-bold tracking-tight">裁了么<span className="text-sm font-normal text-gray-400 ml-1">牛马保护站</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/tools/severance"
            className="bg-black text-white text-sm px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            计算赔偿
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1">
            <span
              className={`h-0.5 bg-black transition-transform duration-300 ${
                mobileOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`h-0.5 bg-black transition-opacity duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 bg-black transition-transform duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-gray-200/50"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base text-gray-700 hover:text-black"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/tools/severance"
                className="bg-black text-white text-center py-3 rounded-full mt-2"
                onClick={() => setMobileOpen(false)}
              >
                计算赔偿
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
