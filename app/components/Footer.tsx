"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLang } from "@/app/context/LangContext";
import type { Lang } from "@/app/context/LangContext";

const TAGLINE: Record<Lang, string> = {
  mk: "Декоративни гипсени цигли",
  en: "Decorative gypsum bricks",
};

const FOOTER_LINKS: Record<Lang, { label: string; href: string }[]> = {
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

const COPYRIGHT: Record<Lang, string> = {
  mk: "© 2026 Zmaga Dekorativni Cigli. Сите права задржани.",
  en: "© 2026 Zmaga Dekorativni Cigli. All rights reserved.",
};

export default function Footer() {
  const { lang } = useLang();
  const links = FOOTER_LINKS[lang];
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/#catalog" ? pathname === "/" : pathname === href;

  return (
    <motion.footer
      className="relative overflow-hidden px-4 py-14 sm:px-6 md:py-16 lg:px-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Subtle gradient — matches body, no black */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "linear-gradient(to top, rgba(39,39,42,0.6) 0%, transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-7xl">
        {/* Top accent — warm gradient with glow */}
        <div
          className="h-px w-full"
          aria-hidden
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(161,98,7,0.2) 20%, rgba(217,119,6,0.5) 50%, rgba(161,98,7,0.2) 80%, transparent 100%)",
            boxShadow: "0 0 12px rgba(217,119,6,0.15)",
          }}
        />

        <motion.div
          className="flex flex-col items-center gap-12 pt-12 md:flex-row md:items-center md:justify-center md:gap-10 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
            hidden: {},
          }}
        >
          {/* Logo */}
          <motion.div variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 8 } }}>
          <Link
            href="/"
            className="flex shrink-0 items-center rounded-xl opacity-80 transition-all duration-300 hover:scale-[1.02] hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Zmaga Cigli – Почетна"
          >
            <Image
              src="/images/zmaga logo.webp"
              alt="Zmaga"
              width={100}
              height={28}
              className="h-auto w-14 rounded-xl object-contain md:w-16"
            />
          </Link>
          </motion.div>

          {/* Desktop: horizontal layout */}
          <motion.div
            className="flex w-full flex-col items-center gap-6 md:w-auto md:flex-row md:items-center md:justify-center md:gap-8 lg:gap-10"
            variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 8 } }}
          >
            {/* Nav links — desktop: first */}
            <nav className="flex items-center gap-6 md:gap-8" aria-label="Footer navigation">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="relative inline-block rounded px-1 py-2 text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-500 transition-all duration-300 hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-amber-400/90 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Divider — desktop only */}
            <div className="hidden h-8 w-px bg-gradient-to-b from-transparent via-zinc-600/50 to-transparent md:block" aria-hidden />

            {/* Social media icons */}
            <div className="flex items-center justify-center gap-2 md:gap-2.5">
              <a
                href="https://www.facebook.com/profile.php?id=100080947414300"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-zinc-400 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-400 hover:scale-105 hover:shadow-[0_0_24px_rgba(217,119,6,0.12)]"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/zmagadekocigli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-zinc-400 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-400 hover:scale-105 hover:shadow-[0_0_24px_rgba(217,119,6,0.12)]"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>

            {/* Divider — desktop only */}
            <div className="hidden h-8 w-px bg-gradient-to-b from-transparent via-zinc-600/50 to-transparent md:block" aria-hidden />

            {/* Phone and Email — from contact page */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-500">
              <a href="tel:+38970842079" className="flex items-center gap-1.5 rounded-lg px-2 py-1 transition-all duration-200 hover:bg-white/5 hover:text-zinc-200">
                <svg className="h-3.5 w-3.5 shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +389 70 842 079
              </a>
              <span className="text-zinc-600" aria-hidden>·</span>
              <a href="mailto:zmaga.dooel@yahoo.com" className="flex items-center gap-1.5 rounded-lg px-2 py-1 transition-all duration-200 hover:bg-white/5 hover:text-zinc-200">
                <svg className="h-3.5 w-3.5 shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                zmaga.dooel@yahoo.com
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-4 border-t border-zinc-800/50 pt-8 md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            {COPYRIGHT[lang]}
          </p>
          <p className="text-[10px] tracking-wide text-zinc-500/90">
            {TAGLINE[lang]}
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
