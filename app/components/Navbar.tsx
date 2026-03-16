"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/app/context/LangContext";
import type { Lang } from "@/app/context/LangContext";

type NavLink = { label: string; href: string };

const NAV_LINKS: Record<Lang, NavLink[]> = {
  mk: [
    { label: "Каталог", href: "/#catalog" },
    { label: "За нас", href: "/about" },
    { label: "Контакт", href: "/contact" },
  ],
  en: [
    { label: "Catalog", href: "/#catalog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Navbar() {
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const links = NAV_LINKS[lang];

  function isActive(href: string) {
    if (href === "/#catalog") return pathname === "/";
    return pathname === href;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 min-w-0 border-b border-zinc-800/30 bg-zinc-900/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 md:px-10">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center opacity-80 transition-opacity duration-300 hover:opacity-100"
          aria-label="Zmaga Cigli – Почетна"
        >
          <Image
            src="/images/zmaga logo.webp"
            alt="Zmaga logo"
            width={120}
            height={32}
            className="h-auto w-9 rounded-lg object-contain drop-shadow-sm sm:w-10 md:w-12"
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[9px] uppercase tracking-[0.2em] transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-zinc-200"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: language toggle + hamburger */}
        <div className="flex items-center gap-3">

          {/* Language toggle */}
          <nav
            className="flex items-center gap-0.5 rounded-md bg-black/35 px-0.5 py-0.5 shadow-sm shadow-black/20 backdrop-blur-sm"
            aria-label="Language"
          >
            <button
              type="button"
              onClick={() => setLang("mk")}
              className="min-h-[20px] min-w-[20px] rounded px-1.5 py-1 text-[9px] uppercase tracking-[0.15em] text-zinc-600 transition-all duration-200 hover:text-zinc-300 focus:outline-none data-[active=true]:text-zinc-200"
              data-active={lang === "mk"}
            >
              MK
            </button>
            <span className="select-none text-[9px] text-zinc-700" aria-hidden>·</span>
            <button
              type="button"
              onClick={() => setLang("en")}
              className="min-h-[20px] min-w-[20px] rounded px-1.5 py-1 text-[9px] uppercase tracking-[0.15em] text-zinc-600 transition-all duration-200 hover:text-zinc-300 focus:outline-none data-[active=true]:text-zinc-200"
              data-active={lang === "en"}
            >
              EN
            </button>
          </nav>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-zinc-500 transition-colors hover:text-zinc-300 focus:outline-none md:hidden"
            aria-label={menuOpen ? "Затвори мени" : "Отвори мени"}
            aria-expanded={menuOpen}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              aria-hidden
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-zinc-800/30 bg-zinc-900/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col px-4 py-5 sm:px-6" aria-label="Mobile navigation">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`border-b border-zinc-800/40 py-3.5 text-[10px] uppercase tracking-[0.2em] transition-colors duration-200 last:border-0 ${
                    isActive(link.href)
                      ? "text-zinc-200"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
