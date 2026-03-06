"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Lang = "mk" | "en";

const HERO_CONTENT: Record<
  Lang,
  { label: string; title: string; tagline: string }
> = {
  mk: {
    label: "КАТАЛОГ",
    title: "ДЕКОРАТИВНИ ГИПСЕНИ ЦИГЛИ",
    tagline: "ЗМАГА ДЕКОРАТИВНИ ЦИГЛИ",
  },
  en: {
    label: "Catalog",
    title: "DECORATIVE GYPSUM BRICKS",
    tagline: "ZMAGA DECORATIVE BRICKS",
  },
};

export default function Hero() {
  const [lang, setLang] = useState<Lang>("mk");
  const content = HERO_CONTENT[lang];

  return (
    <motion.header
      className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-900/80 via-transparent to-transparent px-6 pt-28 pb-14 text-center md:min-h-[75vh] md:py-36"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Top bar slides down from above */}
      <motion.div
        className="absolute inset-x-6 top-7 z-10 flex items-center justify-between md:inset-x-10"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center transition-opacity duration-300 hover:opacity-100 opacity-80">
          <Image
            src="/images/zmaga logo.webp"
            alt="Zmaga logo"
            width={120}
            height={32}
            className="h-auto w-9 rounded-lg object-contain drop-shadow-sm sm:w-10 md:w-12"
            priority
          />
        </div>
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
            className="min-h-[28px] min-w-[28px] rounded px-1.5 py-1 text-[9px] uppercase tracking-[0.15em] text-zinc-600 transition-all duration-200 hover:text-zinc-300 focus:outline-none data-[active=true]:text-zinc-200"
            data-active={lang === "en"}
          >
            EN
          </button>
        </nav>
      </motion.div>

      {/* Text block — scroll reveal + language switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={lang}
          className="max-w-2xl space-y-6 lg:max-w-3xl"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          viewport={{ once: false, margin: "-8%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div
              className="h-px w-10 bg-zinc-600"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: false, margin: "-8%" }}
              transition={{ duration: 1.0, delay: 0.25, ease: "easeOut" }}
              style={{ originX: 0.5 }}
            />
            <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-zinc-500">
              {content.label}
            </p>
          </div>

          <h1 className="text-3xl font-extralight leading-tight tracking-[0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {content.title}
          </h1>

          <div className="flex flex-col items-center gap-5">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 sm:text-base">
              {content.tagline}
            </p>
            <motion.div
              className="h-px w-10 bg-zinc-700"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: false, margin: "-8%" }}
              transition={{ duration: 1.0, delay: 0.35, ease: "easeOut" }}
              style={{ originX: 0.5 }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.header>
  );
}
