"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/app/context/LangContext";

const CONTENT = {
  mk: {
    eyebrow: "СТРАНИЦАТА НЕ Е ПРОНАЈДЕНА",
    title: "404",
    description:
      "Страницата што ја барате не постои или е преместена.",
    home: "Назад на почетна",
    contact: "Контактирај нè",
  },
  en: {
    eyebrow: "PAGE NOT FOUND",
    title: "404",
    description:
      "The page you are looking for does not exist or has been moved.",
    home: "Back to home",
    contact: "Contact us",
  },
} as const;

export default function NotFound() {
  const { lang } = useLang();
  const content = CONTENT[lang];

  return (
    <main className="flex min-h-screen items-center justify-center px-4 pb-16 pt-28 text-center sm:px-6">
      <motion.div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/35 px-6 py-16 shadow-2xl shadow-black/20 backdrop-blur-sm sm:px-12 sm:py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_70%)]"
          aria-hidden
        />
        <p className="relative text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-500">
          {content.eyebrow}
        </p>
        <h1 className="relative mt-5 text-7xl font-extralight tracking-wider text-white sm:text-8xl">
          {content.title}
        </h1>
        <p className="relative mx-auto mt-5 max-w-md text-sm leading-6 text-zinc-400 sm:text-base">
          {content.description}
        </p>
        <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-11 min-w-48 items-center justify-center rounded-full bg-white px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-950 transition-all hover:-translate-y-0.5 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {content.home}
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-11 min-w-48 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            {content.contact}
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
